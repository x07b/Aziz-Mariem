import { test, expect, type Page } from "@playwright/test";
import { invitationCopy } from "../src/config/event";

async function open(page: Page) {
  await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
  await page.goto("/");
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".intro")).toHaveCount(0);
}

for (const width of [320, 390, 768, 1440]) {
  test(`cover and bilingual invitation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(() => localStorage.setItem("invitation-language", "en"));
    await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator(".cover-film")).toHaveJSProperty("paused", false);
    await expect(page.locator(".cover-film")).toHaveJSProperty("muted", true);
    await expect(page.locator(".cover-eyebrow")).toHaveText(invitationCopy.fr.coverSubtitle);
    await expect(page.locator(".music-button,.language-switch")).toHaveCount(0);
    await expect(page.locator(".cover-wordmark")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: `test-results/cover-${width}.png` });
    await page.locator(".intro-open-button").click();
    await expect(page.locator(".intro")).toHaveCount(0);
    for (const lang of ["ar", "fr"] as const) {
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator(".love-letter p")).toHaveText(invitationCopy[lang].loveLetter.split("\n\n"));
      await expect(page.locator(".celebration-note,.proposal-note,#proposal-heading")).toHaveCount(0);
      await expect(page.locator(".display-date")).toHaveText("24 octobre 2026");
      await expect(page.locator(".display-time")).toHaveText("20:00");
      await expect(page.locator(".event-details")).toContainText("Ras Ettabia");
      await expect(page.locator("#countdown-heading")).toHaveText("Together, very soon.");
      for (const section of await page.locator(".gown-content > section").all()) {
        await section.scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await page.screenshot({ path: `test-results/${lang}-${width}.png`, fullPage: true });
      await page.locator(".language-switch").click();
    }
    await page.locator(".close-invitation").click();
    await expect(page.locator(".intro")).toBeVisible();
    await expect(page.locator(".music-button,.language-switch")).toHaveCount(0);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    expect(errors).toEqual([]);
  });
}

test("only the hidden voice message interrupts music", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  const music = page.locator("audio").first();
  const film = page.locator(".proposal-frame video");
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", false);
  await expect(film).toHaveJSProperty("muted", true);
  await expect(music).toHaveJSProperty("paused", false);
  await expect(page.locator(".mariem-gift")).toHaveCount(0);
  await page.locator(".monogram-trigger").click();
  const voice = page.locator(".mariem-gift audio");
  await expect(voice).toHaveJSProperty("paused", true);
  await expect(music).toHaveJSProperty("paused", false);
  await page.locator(".voice-play-button").click();
  await expect(voice).toHaveJSProperty("paused", false);
  await expect(music).toHaveJSProperty("paused", true);
  await film.scrollIntoViewIfNeeded();
  await expect(music).toHaveJSProperty("paused", true);
  await page.locator(".voice-play-button").click();
  await expect(music).toHaveJSProperty("paused", false);
  await page.locator(".voice-play-button").click();
  await page.locator(".voice-close-button").click();
  await expect(music).toHaveJSProperty("paused", false);
  await expect(page.locator(".mariem-gift")).toHaveCount(0);
  await page.locator(".music-button").click();
  await film.scrollIntoViewIfNeeded();
  await expect(music).toHaveJSProperty("paused", true);
  await page.locator(".music-button").click();
  await page.locator(".monogram-trigger").click();
  await page.locator(".voice-play-button").click();
  await expect(music).toHaveJSProperty("paused", true);
  await page.locator(".close-invitation").click();
  await expect(page.locator(".intro")).toBeVisible();
  await expect(music).toHaveJSProperty("paused", false);
});

test("failed film leaves the music playing", async ({ page }) => {
  await page.route("**/videos/proposal.mp4", route => route.abort());
  await open(page);
  await page.locator(".proposal-frame").scrollIntoViewIfNeeded();
  await expect(page.locator(".film-status")).toBeVisible();
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
});
