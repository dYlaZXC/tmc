import { expect, test, type Page } from "@playwright/test";

const PAGES = [
  { path: "/", lang: "ru", h1: "Консультация врача" },
  { path: "/kk/", lang: "kk", h1: "Дәрігер кеңесі" },
  { path: "/en/", lang: "en", h1: "Doctor consultation" },
] as const;

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

for (const { path, lang, h1 } of PAGES) {
  test(`${path} renders in ${lang} without errors`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(h1);
    await expect(page.locator(".num")).toHaveCount(3);
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

test("switching language keeps the current section", async ({ page }) => {
  await page.goto("/#faq");
  await page.getByRole("link", { name: "ҚАЗ" }).click();
  await expect(page).toHaveURL(/\/kk\/#faq$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "kk");
  await expect(page.locator("#faq h2")).toBeInViewport();
});

test("FAQ opens one answer at a time", async ({ page }) => {
  await page.goto("/en/");
  const questions = page.locator(".faq-q");
  await questions.nth(0).click();
  await expect(questions.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".faq-a").nth(0)).toBeVisible();
  await questions.nth(1).click();
  await expect(page.locator(".faq-a").nth(0)).toBeHidden();
  await expect(page.locator(".faq-a").nth(1)).toBeVisible();
});

test("section anchors land below the sticky header", async ({ page, isMobile }) => {
  test.skip(isMobile, "nav links scroll horizontally on mobile; covered on desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".navlinks a[href='#work']").click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator(".navlinks a[href='#work']")).toHaveClass(/is-active/);
  const headerBottom = await page.locator(".header").evaluate((el) => el.getBoundingClientRect().bottom);
  const headingTop = await page.locator("#work h2").evaluate((el) => el.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
  // ...and not pushed far down either (the old site doubled the offset).
  expect(headingTop - headerBottom).toBeLessThan(120);
});

test("phone links dial the configured numbers", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator(".num").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
  expect(hrefs).toEqual(["tel:+77015021312", "tel:+77005501312", "tel:+77025021312"]);
});

test("Instagram is shown as not yet available", async ({ page }) => {
  await page.goto("/");
  const ig = page.locator(".header .social").first();
  await expect(ig).toHaveAttribute("aria-disabled", "true");
  let message = "";
  page.once("dialog", async (dialog) => {
    message = dialog.message();
    await dialog.dismiss();
  });
  // aria-disabled makes Playwright treat it as not clickable; users can still click it.
  await ig.click({ force: true });
  await expect.poll(() => message).toContain("Instagram");
  await expect(page).toHaveURL(/\/$/);
});

test("page has no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("unknown URLs get the 404 page", async ({ page }) => {
  const response = await page.goto("/does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Страница не найдена" })).toBeVisible();
});

test("SEO files are published", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://tmc24.kz/kk/");
  expect((await request.get("/robots.txt")).ok()).toBe(true);
});
