"use client";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { eventConfig } from "@/config/event";
import { useInvitation } from "./InvitationLanguage";

export type MusicHandle = { play: () => void; suspend: () => Promise<void>; resume: () => void };

/** One audio element; guest preference survives temporary film and visibility pauses. */
export const MusicPlayer = forwardRef<MusicHandle, { cover: boolean; onToggle?: (paused: boolean) => void }>(
  function MusicPlayer({ cover, onToggle }, ref) {
    const audio = useRef<HTMLAudioElement>(null);
    const wanted = useRef(true);
    const started = useRef(false);
    const suspended = useRef(false);
    const version = useRef(0);
    const animation = useRef(0);
    const finishFade = useRef<(() => void) | null>(null);
    const [playing, setPlaying] = useState(false);
    const [filmActive, setFilmActive] = useState(false);
    const [unavailable, setUnavailable] = useState(false);
    const { t } = useInvitation();
    const invalidate = useCallback(() => { ++version.current; }, []);
    const cancelFade = useCallback(() => {
      cancelAnimationFrame(animation.current);
      finishFade.current?.();
      finishFade.current = null;
    }, []);
    const fade = useCallback((target: number, duration: number) => {
      cancelFade();
      const element = audio.current;
      if (!element) return Promise.resolve();
      const from = element.volume;
      const start = performance.now();
      return new Promise<void>(resolve => {
        finishFade.current = resolve;
        const frame = (time: number) => {
          const progress = Math.max(0, Math.min((time - start) / duration, 1));
          // iOS may ignore volume changes; pause still guarantees exclusive audio.
          element.volume = from + (target - from) * progress;
          if (progress < 1) animation.current = requestAnimationFrame(frame);
          else { finishFade.current = null; resolve(); }
        };
        animation.current = requestAnimationFrame(frame);
      });
    }, [cancelFade]);
    const resume = useCallback(() => {
      suspended.current = false;
      setFilmActive(false);
      const element = audio.current;
      if (!element || !started.current || !wanted.current || document.hidden) return;
      const request = ++version.current;
      cancelFade();
      element.volume = 0;
      void element.play().then(() => {
        if (request !== version.current || suspended.current || !wanted.current || document.hidden) return;
        void fade(eventConfig.music.volume, 850);
      }).catch(() => { /* The music button allows a gesture retry. */ });
    }, [cancelFade, fade]);
    const suspend = useCallback(async () => {
      suspended.current = true;
      setFilmActive(true);
      ++version.current;
      cancelFade();
      audio.current?.pause();
    }, [cancelFade]);
    const play = useCallback(() => {
      started.current = true;
      if (!suspended.current) resume();
    }, [resume]);
    useImperativeHandle(ref, () => ({ play, suspend, resume }), [play, suspend, resume]);
    useEffect(() => {
      const element = audio.current;
      const visibility = () => {
        if (document.hidden) {
          ++version.current;
          cancelFade();
          element?.pause();
        } else if (!suspended.current) resume();
      };
      document.addEventListener("visibilitychange", visibility);
      return () => {
        invalidate();
        cancelFade();
        element?.pause();
        document.removeEventListener("visibilitychange", visibility);
      };
    }, [cancelFade, resume, invalidate]);
    function toggle() {
      if (playing) {
        wanted.current = false;
        ++version.current;
        cancelFade();
        audio.current?.pause();
        onToggle?.(true);
      } else {
        wanted.current = true;
        started.current = true;
        onToggle?.(false);
        resume();
      }
    }
    if (!eventConfig.music.enabled || !eventConfig.music.src) return null;
    const label = unavailable ? t.musicUnavailable : filmActive ? t.voicePause : playing ? t.musicMute : t.musicPlay;
    return <>
      <audio ref={audio} src={eventConfig.music.src} loop preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setUnavailable(true); setPlaying(false); }}/>
      {!cover && <button className={`music-button ${playing ? "is-playing" : ""} ${cover ? "is-cover" : ""}`}
        onClick={toggle} type="button" disabled={unavailable || filmActive}
        aria-label={label} aria-pressed={playing && !filmActive} title={label}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M10 17V6l9-2v11M10 9l9-2"/>
          <ellipse cx="7" cy="18" rx="3" ry="2"/><ellipse cx="16" cy="16" rx="3" ry="2"/>
          {!playing && <path d="m4 3 17 18"/>}
        </svg>
      </button>}
    </>;
  }
);
