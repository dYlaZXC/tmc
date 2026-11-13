import { describe, expect, it } from "vitest";
import { SITE } from "@/config/site";

describe("site config", () => {
  it("publishes at least one phone", () => {
    expect(SITE.phones.length).toBeGreaterThan(0);
  });

  it.each(SITE.phones.map((p) => [p.id, p] as const))(
    "%s has a valid E.164 tel matching its display number",
    (_id, phone) => {
      expect(phone.tel).toMatch(/^\+7\d{10}$/);
      expect(phone.display.replace(/\s/g, "")).toBe(phone.tel);
    },
  );

  it("has unique phone ids", () => {
    const ids = SITE.phones.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses https for every non-empty social link and the site url", () => {
    expect(SITE.url).toMatch(/^https:\/\/[^/]+$/);
    for (const url of Object.values(SITE.social)) {
      if (url) expect(url).toMatch(/^https:\/\//);
    }
  });
});
