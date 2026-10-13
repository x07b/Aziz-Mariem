import { test, expect } from "@playwright/test";
import { eventConfig, invitationCopy } from "../src/config/event";

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`gown story preserves content and fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Isolate layout checks from third-party map availability.
    await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await expect(page.locator(".cover-wordmark")).toContainText("Fête de fiançailles");
    await expect(page.locator(".cover-film")).toHaveAttribute("src", "/videos/cover.mp4");
    await expect(page.locator(".cover-film")).toHaveJSProperty("paused", true);
    await page.screenshot({ path: `test-results/cover-${width}.png` });
    await page.locator(".intro-open-button").click();
    await expect(page.locator(".intro")).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(page.locator("#announcement-heading")).toHaveText(invitationCopy.fr.announcement);
    await expect(page.locator(".quran-verse")).toHaveText(eventConfig.storytelling.verse);
    await expect(page.locator(".quran-verse")).toHaveAttribute("lang", "ar");
    await expect(page.locator(".invitation-arabic")).toHaveCount(0);
    await expect(page.locator(".invitation-introduction")).toHaveText(invitationCopy.fr.introduction);
    await expect(page.locator(".gown-content > section")).toHaveCount(5);
    for (const selector of [".event-details", ".timeline-section", ".countdown", ".site-footer"]) {
      await expect(page.locator(`.gown-content > ${selector}`)).toHaveCSS("background-color", "rgba(242, 239, 228, 0)");
    }
    await expect(page.locator(".doorway-photo")).toHaveJSProperty("complete", true);
    expect(await page.locator(".doorway-photo").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    const verse = await page.locator(".scene-blessing").boundingBox();
    const scene = await page.locator(".gown-scene").boundingBox();
    expect(verse!.y + verse!.height).toBeLessThan(scene!.y + scene!.height * .21);
    for (const section of await page.locator(".gown-content > section").all()) {
      await section.scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    await expect(page.locator(".event-details")).toContainText("24 octobre 2026");
    await expect(page.locator(".event-details")).toContainText("El Omran, Jbal Lahmar");
    await expect(page.getByRole("timer")).not.toContainText("—");
    await page.locator(".language-switch").click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#announcement-heading")).toHaveText(invitationCopy.en.announcement);
    await expect(page.locator(".story-invitation")).toHaveText(invitationCopy.en.invitation);
    await expect(page.locator(".quran-verse")).toHaveText(eventConfig.storytelling.verse);
    await expect(page.locator(".announcement")).not.toContainText("✨");
    await expect(page.locator(".announcement")).toHaveCSS("font-weight", "700");
    await expect(page.locator(".event-details")).toContainText("24 October 2026");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(await page.locator(".gown-content").innerText()).not.toMatch(/[\u0600-\u06ff]/);
    const languageBox = await page.locator(".language-switch").boundingBox();
    const musicBox = await page.locator(".music-button").boundingBox();
    expect(languageBox!.y + languageBox!.height).toBeLessThan(musicBox!.y);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `test-results/gown-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("motion, audio, navigation and closing still work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".cover-film")).toHaveJSProperty("paused", false);
  await expect(page.locator(".music-button")).toHaveCount(1);
  await expect(page.locator(".cover-film-toggle")).toHaveCount(0);
  await expect(page.locator(".music-button")).toHaveAttribute("aria-pressed", "true");
  await page.locator(".music-button").click();
  await expect(page.locator(".cover-film")).toHaveJSProperty("paused", true);
  await page.locator(".music-button").click();
  await expect(page.locator(".cover-film")).toHaveJSProperty("paused", false);
  await page.locator(".intro-open-button").press("Enter");
  await expect(page.locator(".intro-open-button")).toHaveAttribute("aria-disabled", "true");
  await expect(page.locator(".intro")).toHaveCount(0, { timeout: 8000 });
  await expect(page.locator(".music-button")).toHaveAttribute("aria-pressed", "true");
  await page.locator(".music-button").click();
  await expect(page.locator("audio")).toHaveJSProperty("muted", true);
  await page.locator(".music-button").click();
  await expect(page.locator("audio")).toHaveJSProperty("muted", false);
  await expect(page.locator(".letter-content a")).toHaveCount(0);
  await page.locator("#details").scrollIntoViewIfNeeded();
  await expect(page.locator(".event-map iframe")).toHaveAttribute("src", eventConfig.event.locations[0].mapEmbedUrl!);
  await page.locator(".close-invitation").click();
  await expect(page.locator(".intro")).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
});

test("language switching preserves the open invitation, audio and remembered preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator(".language-switch").click();
  await expect(page.locator(".intro-open-button")).toHaveText(/Open the invitation/);
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".intro")).toHaveCount(0);
  await page.locator("#details").scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  await page.locator(".language-switch").click();
  await expect(page.locator("#details-heading")).toHaveText("Les détails");
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(before * .8);
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  await expect(page.locator(".fabric-canvas")).toHaveCSS("transform", "none");
  await page.locator(".language-switch").click();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".intro-open-button")).toHaveText(/Open the invitation/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
