import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SocialLink } from "@/components/layout/SocialLink";

describe("SocialLink", () => {
  afterEach(() => vi.restoreAllMocks());

  it("opens a confirmed https link in a new tab safely", () => {
    render(
      <SocialLink url="https://wa.me/77005501312" soonMessage="soon" className="social">
        WhatsApp
      </SocialLink>,
    );
    const link = screen.getByRole("link", { name: "WhatsApp" });
    expect(link).toHaveAttribute("href", "https://wa.me/77005501312");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("social");
    expect(link).not.toHaveClass("is-disabled");
  });

  it.each([
    ["empty", ""],
    ["non-https", "javascript:alert(1)"],
    ["malformed", "not a url"],
  ])("shows a disabled link that explains itself when the url is %s", async (_case, url) => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <SocialLink url={url} soonMessage="Будет добавлено позже">
        Instagram
      </SocialLink>,
    );
    const link = screen.getByRole("link", { name: "Instagram" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveClass("is-disabled");

    await userEvent.click(link);
    expect(alertSpy).toHaveBeenCalledWith("Будет добавлено позже");
  });
});
