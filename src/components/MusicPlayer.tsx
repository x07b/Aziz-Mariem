"use client";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { eventConfig } from "@/config/event";
export type MusicHandle = { play: () => void };
export const MusicPlayer = forwardRef<MusicHandle, { cover: boolean; onToggle?: (paused: boolean) => void }>(function MusicPlayer({ cover, onToggle }, ref) {
  const audio = useRef<HTMLAudioElement>(null);
  const animation = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const play = useCallback(() => {
    const element = audio.current;
    if (!element || !eventConfig.music.src || !eventConfig.music.enabled || !element.paused) return;
    cancelAnimationFrame(animation.current);
    element.muted = false;
    element.volume = 0;
    void element.play().then(() => {
      setMuted(false);
      setUnavailable(false);
      const start = performance.now();
      const fade = (time: number) => {
        const progress = Math.max(0, Math.min((time - start) / eventConfig.music.fadeDuration, 1));
        element.volume = progress * eventConfig.music.volume;
        if (progress < 1 && !element.paused) animation.current = requestAnimationFrame(fade);
      };
      animation.current = requestAnimationFrame(fade);
    }).catch(() => { /* Autoplay rejection remains silent; the envelope retries. */ });
  }, []);
  useImperativeHandle(ref, () => ({ play }), [play]);
  useEffect(() => { play(); return () => cancelAnimationFrame(animation.current); }, [play]);
  function toggle() {
    const element = audio.current;
    if (!element) return;
    if (element.paused) {
      setMuted(false);
      onToggle?.(false);
      play();
      return;
    }
    element.muted = !element.muted;
    setMuted(element.muted);
    onToggle?.(element.muted);
  }
  if (!eventConfig.music.enabled || !eventConfig.music.src) return null;
  return (
    <>
      <audio
        ref={audio}
        src={eventConfig.music.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setUnavailable(true); setPlaying(false); }}
      />
      <button
        className={`music-button ${playing ? "is-playing" : ""} ${cover ? "is-cover" : ""}`}
        onClick={toggle}
        type="button"
        disabled={unavailable}
        aria-label={unavailable ? "الموسيقى غير متاحة" : muted ? "إلغاء كتم الموسيقى" : playing ? "كتم الموسيقى" : "تشغيل الموسيقى"}
        aria-pressed={playing && !muted}
        title={unavailable ? "الموسيقى غير متاحة" : muted ? "إلغاء كتم الموسيقى" : playing ? "كتم الموسيقى" : "تشغيل الموسيقى"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M10 17V6l9-2v11M10 9l9-2" />
          <ellipse cx="7" cy="18" rx="3" ry="2" />
          <ellipse cx="16" cy="16" rx="3" ry="2" />
          {(muted || !playing) && <path d="m4 3 17 18" />}
        </svg>
      </button>
    </>
  );
});
