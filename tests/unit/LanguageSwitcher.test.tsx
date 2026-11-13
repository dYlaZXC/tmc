import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { navigateTo } from "@/lib/navigation";

vi.mock("@/lib/navigation", () => ({ navigateTo: vi.fn() }));

describe("LanguageSwitcher", () => {
  afterEach(() => {
    vi.mocked(navigateTo).mockReset();
    window.location.hash = "";
  });

  it("renders one link per locale with the current one active", () => {
    render(<LanguageSwitcher current="en" ariaLabel="Site language" />);
    expect(screen.getByRole("group", { name: "Site language" })).toBeInTheDocument();
    expect(screen.getByText("ENG")).toHaveClass("active");
    expect(screen.getByText("ҚАЗ")).toHaveAttribute("hreflang", "kk");
    expect(screen.getByText("ҚАЗ")).not.toHaveClass("active");
  });

  it("keeps the current section when switching language", () => {
    window.location.hash = "#faq";
    render(<LanguageSwitcher current="ru" ariaLabel="Язык" />);
    fireEvent.click(screen.getByText("ҚАЗ"));
    expect(navigateTo).toHaveBeenCalledWith("/kk/#faq");
  });

  it("navigates without a hash when none is set", () => {
    render(<LanguageSwitcher current="kk" ariaLabel="Язык" />);
    fireEvent.click(screen.getByText("РУС"));
    expect(navigateTo).toHaveBeenCalledWith("/");
  });

  it("leaves modifier clicks to the browser and ignores the current language", () => {
    // Record whether the component intercepted the click, then stop jsdom from navigating.
    const intercepted: boolean[] = [];
    const record = (event: Event) => {
      intercepted.push(event.defaultPrevented);
      event.preventDefault();
    };
    window.addEventListener("click", record);
    render(<LanguageSwitcher current="ru" ariaLabel="Язык" />);
    fireEvent.click(screen.getByText("ENG"), { ctrlKey: true });
    fireEvent.click(screen.getByText("РУС"));
    window.removeEventListener("click", record);

    // ctrl+click -> browser (new tab); click on the active language -> no reload.
    expect(intercepted).toEqual([false, true]);
    expect(navigateTo).not.toHaveBeenCalled();
  });
});
