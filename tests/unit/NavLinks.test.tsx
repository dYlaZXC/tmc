import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NavLinks } from "@/components/layout/NavLinks";

const ITEMS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

function addSection(id: string, offsetTop: number) {
  const el = document.createElement("section");
  el.id = id;
  Object.defineProperty(el, "offsetTop", { value: offsetTop });
  document.body.appendChild(el);
}

function scrollTo(y: number) {
  act(() => {
    Object.defineProperty(window, "scrollY", { value: y, configurable: true });
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("NavLinks", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.style.removeProperty("--scroll-pad");
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  });

  it("highlights the section under the sticky header while scrolling", () => {
    document.documentElement.style.setProperty("--scroll-pad", "100px");
    addSection("about", 1000);
    addSection("faq", 3000);
    render(<NavLinks items={ITEMS} ariaLabel="Sections" />);

    expect(screen.getByText("Home")).toHaveClass("is-active");

    scrollTo(950);
    expect(screen.getByText("About")).toHaveClass("is-active");
    expect(screen.getByText("About")).toHaveAttribute("aria-current", "location");
    expect(screen.getByText("Home")).not.toHaveClass("is-active");

    scrollTo(2950);
    expect(screen.getByText("FAQ")).toHaveClass("is-active");

    scrollTo(0);
    expect(screen.getByText("Home")).toHaveClass("is-active");
  });

  it("picks the section nearest the header even when menu order differs from page order", () => {
    // On the real page "contacts" is near the top but last in the menu.
    document.documentElement.style.setProperty("--scroll-pad", "100px");
    addSection("about", 1000);
    addSection("faq", 3000);
    addSection("contacts", 500);
    const items = [...ITEMS, { id: "contacts", label: "Contacts" }];
    render(<NavLinks items={items} ariaLabel="Sections" />);

    scrollTo(500);
    expect(screen.getByText("Contacts")).toHaveClass("is-active");

    scrollTo(2950);
    expect(screen.getByText("FAQ")).toHaveClass("is-active");
    expect(screen.getByText("Contacts")).not.toHaveClass("is-active");
  });

  it("links each item to its section anchor", () => {
    render(<NavLinks items={ITEMS} ariaLabel="Sections" />);
    expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toHaveAttribute("href", "#faq");
  });
});
