import { test, expect, type Page } from "@playwright/test";
import { eventConfig, invitationCopy } from "../src/config/event";

async function openInvitation(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
  await page.goto("/");
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".intro")).toHaveCount(0);
}

for (const width of [320, 375, 390, 430, 768, 1440]) {
  test(`editorial invitation in three languages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error" && /hydration|hydrated/i.test(message.text())) errors.push(message.text()); });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
    await page.goto("/");
    await expect(page.locator(".cover-film")).toHaveAttribute("src", eventConfig.introVideoSrc!);
    await expect(page.locator(".cover-film")).toHaveCSS("opacity", "1");
    await expect(page.locator(".cover-wordmark")).toHaveCSS("opacity", "1");
    await expect(page.locator(".cover-wordmark h1")).toHaveCSS("font-family", /Italianno/);
    await expect(page.locator("audio")).toHaveJSProperty("paused", true);
    await expect(page.locator(".language-switch")).toHaveCount(1);
    await expect(page.locator(".control-tooltip")).toHaveCSS("opacity", "0");
    await page.screenshot({ path: `test-results/cover-${width}.png` });
    await page.locator(".intro-open-button").click();
    await expect(page.locator(".intro")).toHaveCount(0);
    await expect(page.locator("audio")).toHaveJSProperty("paused", false);
    await expect(page.locator(".timeline-section,.cover-date")).toHaveCount(0);
    for (const lang of ["fr", "ar", "en"] as const) {
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("html")).toHaveAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      await expect(page.locator(".letter-heading")).toHaveCount(0);
      await expect(page.locator(".love-letter p")).toHaveText(invitationCopy[lang].loveLetter.split("\n\n"));
      await expect(page.locator(".quran-verse")).toHaveText(eventConfig.storytelling.verse);
      await expect(page.locator(".memory-heart")).toHaveCount(2);
      await expect(page.locator(".event-map iframe")).toHaveAttribute("src", eventConfig.event.locations[0].mapEmbedUrl!);
      await expect(page.locator(".map-link")).toHaveAttribute("href", eventConfig.event.locations[0].googleMapsUrl!);
      for (const section of await page.locator(".gown-content > section").all()) {
        await section.scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await page.screenshot({ path: `test-results/${lang}-${width}.png`, fullPage: true });
      await page.locator(".language-switch").click();
    }
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await page.locator(".language-switch").click();
    await page.locator(".close-invitation").click();
    await expect(page.locator(".intro")).toBeVisible();
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    expect(errors).toEqual([]);
  });
}

test("film owns audio only in view, resumes, and preserves the guest's music preference", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openInvitation(page);
  const film = page.locator(".proposal-frame video");
  const music = page.locator("audio");
  await expect(film).toHaveJSProperty("paused", true);
  await expect(film).toHaveJSProperty("loop", true);
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", false);
  await expect(music).toHaveJSProperty("paused", true);
  await expect(film).toHaveJSProperty("muted", false);
  await expect(page.locator(".music-button")).toBeDisabled();
  await expect.poll(() => film.evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.2);
  await page.locator(".love-letter").scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", true);
  const position = await film.evaluate((video: HTMLVideoElement) => video.currentTime);
  await expect(music).toHaveJSProperty("paused", false);
  await expect.poll(() => music.evaluate((audio: HTMLAudioElement) => audio.volume)).toBeGreaterThan(.5);
  await page.locator(".music-button").click();
  await expect(music).toHaveJSProperty("paused", true);
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", false);
  expect(await film.evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThanOrEqual(position);
  await page.locator(".love-letter").scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", true);
  await expect(music).toHaveJSProperty("paused", true);
});

test("blocked unmuted autoplay offers a working sound gesture", async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    let blocked = false;
    HTMLMediaElement.prototype.play = function () {
      if (this instanceof HTMLVideoElement && this.closest(".proposal-frame") && !this.muted && !blocked) {
        blocked = true;
        return Promise.reject(new DOMException("Autoplay blocked", "NotAllowedError"));
      }
      return play.call(this);
    };
  });
  await openInvitation(page);
  const film = page.locator(".proposal-frame video");
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", false);
  await expect(film).toHaveJSProperty("muted", true);
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await page.locator(".film-sound").click();
  await expect(film).toHaveJSProperty("muted", false);
  await expect(page.locator(".film-sound")).toHaveCount(0);
});

test("failed video releases music and exposes a translated fallback", async ({ page }) => {
  await page.route("**/videos/proposal.mp4", route => route.abort());
  await openInvitation(page);
  await page.locator(".proposal-frame").scrollIntoViewIfNeeded();
  await expect(page.locator(".film-status")).toBeVisible();
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  await expect(page.locator(".music-button")).toBeEnabled();
  await page.locator(".language-switch").click();
  await expect(page.locator(".film-status")).toContainText(invitationCopy.ar.filmUnavailable);
});

test("rapid scrolling cancels pending playback; hiding the page stops film audio", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openInvitation(page);
  const film = page.locator(".proposal-frame video");
  await film.scrollIntoViewIfNeeded();
  await page.locator(".love-letter").scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", true);
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty("paused", false);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(film).toHaveJSProperty("paused", true);
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(film).toHaveJSProperty("paused", false);
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
});

test("a browser blocking both autoplay attempts can be recovered with a tap", async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    let attempts = 0;
    HTMLMediaElement.prototype.play = function () {
      if (this instanceof HTMLVideoElement && this.closest(".proposal-frame") && attempts++ < 2) {
        return Promise.reject(new DOMException("Gesture required", "NotAllowedError"));
      }
      return play.call(this);
    };
  });
  await openInvitation(page);
  const film = page.locator(".proposal-frame video");
  await film.scrollIntoViewIfNeeded();
  await expect(page.locator(".film-sound")).toBeVisible();
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await page.locator(".film-sound").click();
  await expect(film).toHaveJSProperty("paused", false);
  await expect(film).toHaveJSProperty("muted", false);
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
});

test("normal motion and continuous monitoring find no competing audible media", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
  await page.goto("/");
  await expect(page.locator(".cover-film")).toHaveJSProperty("paused", false);
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".intro")).toHaveCount(0);
  await page.evaluate(() => {
    const win = window as typeof window & { overlaps: number; monitor: number };
    win.overlaps = 0;
    win.monitor = window.setInterval(() => {
      const audio = document.querySelector("audio")!;
      const film = document.querySelector<HTMLVideoElement>(".proposal-frame video")!;
      if (!audio.paused && audio.volume > .01 && !film.paused && !film.muted) win.overlaps++;
    }, 16);
  });
  await page.locator(".proposal-frame video").scrollIntoViewIfNeeded();
  await expect(page.locator(".proposal-frame video")).toHaveJSProperty("paused", false);
  await page.locator(".love-letter").scrollIntoViewIfNeeded();
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  const overlaps = await page.evaluate(() => {
    const win = window as typeof window & { overlaps: number; monitor: number };
    clearInterval(win.monitor);
    return win.overlaps;
  });
  expect(overlaps).toBe(0);
});

test("final date hierarchy and one-time petals preserve interaction", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.route("https://www.google.com/maps/**", route => route.fulfill({ body: "Map preview" }));
  await page.goto("/");
  await expect(page.locator(".opening-petals")).toHaveCount(0);
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".opening-petal")).toHaveCount(14);
  await expect(page.locator(".opening-petals")).toHaveCSS("pointer-events", "none");
  await expect(page.locator(".intro")).toHaveCount(0);
  await expect.poll(() => page.locator(".opening-petal").first().evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0);
  await page.screenshot({ path: "test-results/opening-petals-375.png" });
  await page.locator(".language-switch").click();
  await expect(page.locator(".opening-petal")).toHaveCount(14);
  await page.locator(".event-datetime").scrollIntoViewIfNeeded();
  await expect(page.locator(".display-date")).toHaveAttribute("datetime", eventConfig.event.date!);
  await expect(page.locator(".display-time")).toHaveText("20:00");
  const sizes = await page.locator(".event-datetime").evaluate(el => ({
    date: parseFloat(getComputedStyle(el.querySelector(".display-date")!).fontSize),
    label: parseFloat(getComputedStyle(el.querySelector(".meta")!).fontSize),
  }));
  expect(sizes.date).toBeGreaterThan(sizes.label * 2);
  await expect(page.locator(".event-details")).toContainText("رأس الطابية");
  await expect(page.locator(".opening-petals")).toHaveCount(0, { timeout: 11000 });
  await page.locator(".close-invitation").click();
  await page.locator(".intro-open-button").click();
  await expect(page.locator(".intro")).toHaveCount(0);
  await expect(page.locator(".opening-petals")).toHaveCount(0);
});

test("reduced-motion visitors receive no petals", async ({ page }) => {
  await openInvitation(page);
  await expect(page.locator(".opening-petals")).toHaveCount(0);
});

test("Mariem's voice message is available before closing and pauses the music", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openInvitation(page);
  const monogram = page.locator(".monogram-trigger");
  await expect(monogram).toBeVisible();
  await expect(monogram).toHaveAttribute("aria-label", invitationCopy.fr.voiceOpen);
  await expect(monogram).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".mariem-gift")).toHaveCount(0);
  await monogram.click();
  await expect(monogram).toHaveCount(0);
  await expect(page.locator(".mariem-gift")).toBeVisible();
  await expect(page.locator(".journey-title")).toHaveCSS("font-size", "28px");
  await expect(page.locator(".mariem-heart .editorial-photo")).toHaveCSS("object-fit", "contain");
  await expect(page.locator(".mariem-heart .editorial-photo")).toHaveCSS("transform", "none");
  const message = page.locator(".mariem-gift audio");
  await expect(page.locator("#mariem-gift-heading")).toHaveText(invitationCopy.fr.mariemGift);
  await expect(message).toHaveAttribute("src", "/audio/for-mariem.wav");
  await expect(message).not.toHaveAttribute("controls");
  await expect(page.locator(".voice-message-note")).toHaveText(invitationCopy.fr.mariemGiftNote);
  await expect(page.locator(".voice-play-button")).toHaveAttribute("aria-label", invitationCopy.fr.voicePlay);
  await expect(message).toHaveJSProperty("paused", true);
  await expect(page.locator(".voice-message-time").last()).not.toHaveText("--:--");
  await expect(page.locator(".voice-message-seek")).toBeEnabled();
  await page.locator(".voice-play-button").click();
  await expect(message).toHaveJSProperty("paused", false);
  await page.locator(".voice-play-button").click();
  await expect(message).toHaveJSProperty("paused", true);
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  const messageElement = await message.elementHandle();
  await page.locator(".voice-close-button").click();
  await expect.poll(() => messageElement!.evaluate(element => (element as HTMLAudioElement).paused)).toBe(true);
  await expect(page.locator(".mariem-gift")).toHaveCount(0);
  await expect(monogram).toBeVisible();
  await page.locator(".close-invitation").click();
  await expect(page.locator(".mariem-gift")).toHaveCount(0);
});
