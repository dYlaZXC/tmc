import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/HomePage";
import { SITE } from "@/config/site";
import { LOCALES, getDictionary } from "@/i18n";

describe("HomePage", () => {
  it.each(LOCALES)("renders the %s page with its own texts", (locale) => {
    const t = getDictionary(locale);
    render(<HomePage locale={locale} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(t.heroTitle.lead);
    expect(within(h1).getByText(t.heroTitle.accent)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.contactsTitle })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.faqTitle })).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/<br>|<span>/);
  });

  it("publishes every configured phone in contacts and footer", () => {
    render(<HomePage locale="ru" />);
    for (const phone of SITE.phones) {
      const links = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === `tel:${phone.tel}`);
      expect(links).toHaveLength(2);
    }
    expect(screen.getByText(/Beeline: \+7 702 502 13 12/)).toBeInTheDocument();
  });

  it.each([
    ["ru", "Beeline — для абонентов Beeline"],
    ["kk", "Beeline — Beeline абоненттері үшін"],
    ["en", "Beeline — for Beeline subscribers"],
  ] as const)("translates the operator-only phone note on the %s page", (locale, label) => {
    render(<HomePage locale={locale} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("offers a skip link to the main content", () => {
    render(<HomePage locale="ru" />);
    const skip = screen.getByRole("link", { name: "Перейти к содержимому" });
    expect(skip).toHaveAttribute("href", "#top");
    expect(screen.getByRole("main")).toHaveAttribute("id", "top");
  });

  it("links every nav item to an existing section", () => {
    const { container } = render(<HomePage locale="en" />);
    const nav = screen.getByRole("navigation", { name: "Sections" });
    for (const link of within(nav).getAllByRole("link")) {
      const id = link.getAttribute("href")!.slice(1);
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
  });

  it("marks the current language in the switcher", () => {
    render(<HomePage locale="kk" />);
    const group = screen.getByRole("group", { name: getDictionary("kk").langAria });
    expect(within(group).getByText("ҚАЗ")).toHaveAttribute("aria-current", "page");
    expect(within(group).getByText("РУС")).toHaveAttribute("href", "/");
    expect(within(group).getByText("ENG")).toHaveAttribute("href", "/en/");
  });

  it("numbers goals and workflow steps 01..04", () => {
    const { container } = render(<HomePage locale="ru" />);
    const goalIndexes = [...container.querySelectorAll(".goal-index")].map((el) => el.textContent);
    expect(goalIndexes).toEqual(["01", "02", "03", "04"]);
    expect(container.querySelectorAll("ol.workflow > li")).toHaveLength(4);
  });
});
