import { test, expect, chromium, type Page } from "@playwright/test";
import { eventConfig, invitationCopy } from "../src/config/event";

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
    await expect(page.locator(".language-switch")).toHaveCount(0);
    await expect(page.locator(".music-button.is-cover")).toBeVisible();
    await expect(page.locator(".cover-wordmark")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: `test-results/cover-${width}.png` });
    await page.locator(".intro-open-button").click();
    await expect(page.locator(".intro")).toHaveCount(0);
    const sceneVideo = page.locator(".doorway-image video");
    await expect(sceneVideo).toHaveAttribute("src", "/videos/couple-walking-doors.mp4");
    await expect(sceneVideo).toHaveJSProperty("muted", true);
    await expect(sceneVideo).toHaveJSProperty("loop", true);
    await expect(sceneVideo).toHaveJSProperty("playbackRate", 0.65);
    await expect(sceneVideo).toHaveCSS("object-fit", "cover");
    await expect(page.locator(".doorway-image")).toHaveCSS("mask-image", /linear-gradient/);
    await expect(page.locator(".doorway-image")).toHaveCSS("border-radius", /48%/);
    for (const lang of ["ar", "fr"] as const) {
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator(".love-letter p")).toHaveText(invitationCopy[lang].loveLetter.split("\n\n"));
      await expect(page.locator(".celebration-note,.proposal-note,#proposal-heading")).toHaveCount(0);
      await expect(page.locator(".event-datetime .display-date")).toHaveText("24 octobre 2026");
      await expect(page.locator(".display-time")).toHaveText("20:00");
      await expect(page.locator(".event-details")).not.toContainText("Ras Ettabia");
      await expect(page.locator(".event-details")).toContainText("Bardo");
      await expect(page.locator(".event-detail:not(.event-datetime) .display-date")).toHaveText("Bardo");
      await expect(page.locator(".location-caption")).toHaveCount(0);
      await expect(page.locator(".map-link")).toHaveAttribute("href", eventConfig.event.locations[0].googleMapsUrl ?? "");
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
    await expect(page.locator(".language-switch")).toHaveCount(0);
    await expect(page.locator(".music-button.is-cover")).toBeVisible();
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    expect(errors).toEqual([]);
  });
}

test("cover track switches immediately, film stays muted, and voice message is removed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const music = page.locator("audio");
  await expect(music).toHaveCount(1);
  await expect(music).toHaveAttribute("src", eventConfig.music.coverSrc);
  await page.locator(".cover-eyebrow").click();
  await expect(music).toHaveJSProperty("paused", false);
  await page.locator(".music-button").click();
  await expect(music).toHaveJSProperty("paused", true);
  await expect(page.locator(".music-button")).toHaveAttribute("aria-pressed", "false");
  await page.locator(".cover-eyebrow").click();
  await expect(music).toHaveJSProperty("paused", true);
  await page.locator(".music-button").click();
  await expect(music).toHaveJSProperty("paused", false);
  await page.locator(".intro-open-button").click();
  await expect(music).toHaveAttribute("src", "/music/song.wav");
  await expect(music).toHaveJSProperty("paused", false);
  await expect(page.locator(".intro")).toHaveCount(0);
  await expect(page.locator(".mariem-gift,.monogram-trigger")).toHaveCount(0);
  const film = page.locator(".proposal-frame video");
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", false);
  await expect(film).toHaveJSProperty("muted", true);
  await expect(page.locator(".proposal-frame-art")).toBeVisible();
  await expect(page.locator(".proposal-playback")).toHaveCount(0);
  await expect(music).toHaveJSProperty("paused", false);
  await page.locator(".music-button").click();
  await expect(music).toHaveJSProperty("paused", true);
  await page.locator(".close-invitation").click();
  await expect(music).toHaveAttribute("src", eventConfig.music.coverSrc);
  await expect(music).toHaveJSProperty("paused", false);
  await page.locator(".intro-open-button").click();
  await expect(music).toHaveAttribute("src", "/music/song.wav");
  await expect(music).toHaveJSProperty("paused", false);
});

test("blocked cover autoplay retries on a touch without delaying opening", async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      if (this instanceof HTMLAudioElement && !navigator.userActivation.hasBeenActive)
        return Promise.reject(new DOMException("Gesture required", "NotAllowedError"));
      return play.call(this);
    };
  });
  await page.goto("/");
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await page.locator(".cover-eyebrow").click();
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  await page.locator(".intro-open-button").click();
  await expect(page.locator("audio")).toHaveAttribute("src", "/music/song.wav");
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
});

test("cover fills a changing mobile viewport and hides all invitation content", async ({ page }) => {
  await page.goto("/");
  for (const height of [650, 844, 932, 650]) {
    await page.setViewportSize({ width: 390, height });
    await expect(page.locator(".site-content")).toBeHidden();
    await expect.poll(() => page.locator(".cinematic-cover").evaluate(el => Math.round(el.getBoundingClientRect().height))).toBe(height);
    await page.mouse.wheel(0, 700);
    expect(await page.evaluate(() => scrollY)).toBe(0);
  }
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".site-content")).toBeVisible();
});

test("failed film leaves the music playing", async ({ page }) => {
  await page.route("**/videos/proposal.mp4", route => route.abort());
  await open(page);
  await page.locator(".proposal-frame").scrollIntoViewIfNeeded();
  await expect(page.locator(".film-status")).toBeVisible();
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
});

test("Golden Brown autoplays when browser policy permits sound", async () => {
  const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:3001");
    await expect(page.locator("audio")).toHaveAttribute("src", eventConfig.music.coverSrc);
    await expect(page.locator("audio")).toHaveJSProperty("paused", false);
    await expect.poll(() => page.locator("audio").evaluate((audio: HTMLAudioElement) => audio.currentTime)).toBeGreaterThan(0);
  } finally {
    await browser.close();
  }
});

test("petals return as a gentle decoration and stop when closing or reducing motion", async ({ page }) => {
  await open(page);
  await expect(page.locator(".opening-petal")).toHaveCount(14);
  await expect(page.locator(".ambient-petal")).toHaveCount(7, { timeout: 12000 });
  await expect(page.locator(".ambient-petals")).toHaveCSS("pointer-events", "none");
  await expect(page.locator(".ambient-petal").first()).toHaveCSS("animation-delay", "12s");
  await expect(page.locator(".ambient-petal").first()).toHaveCSS("animation-iteration-count", "infinite");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".ambient-petals,.opening-petals")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".ambient-petal")).toHaveCount(7);
  await page.locator(".close-invitation").click();
  await expect(page.locator(".ambient-petals,.opening-petals")).toHaveCount(0);
});
