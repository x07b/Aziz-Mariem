"use client";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { eventConfig, invitationCopy } from "@/config/event";
import { useInvitation } from "./InvitationLanguage";

export type MusicHandle = { play: () => void; playCover: () => void };

/** Reuse one audio element so the two tracks can never overlap. */
export const MusicPlayer = forwardRef<MusicHandle, { cover: boolean }>(
  function MusicPlayer({ cover }, ref) {
    const audio = useRef<HTMLAudioElement>(null);
    const track = useRef<"cover" | "invitation">("cover");
    const wanted = useRef(true);
    const [playing, setPlaying] = useState(false);
    const [unavailable, setUnavailable] = useState(false);
    const { t } = useInvitation();

    const resume = useCallback(() => {
      const element = audio.current;
      if (!element || !wanted.current || document.hidden) return;
      element.volume = eventConfig.music.volume;
      void element.play().catch(() => { /* Retry from a visitor gesture when autoplay is blocked. */ });
    }, []);

    const selectTrack = useCallback((next: "cover" | "invitation") => {
      const element = audio.current;
      if (!element) return;
      element.pause();
      track.current = next;
      element.src = next === "cover" ? eventConfig.music.coverSrc : eventConfig.music.src;
      element.load();
      wanted.current = true;
      setUnavailable(false);
      // Called directly in the opening/closing click to preserve mobile user activation.
      resume();
    }, [resume]);

    useImperativeHandle(ref, () => ({
      play: () => selectTrack("invitation"),
      playCover: () => selectTrack("cover"),
    }), [selectTrack]);

    useEffect(() => {
      const element = audio.current;
      resume();
      const gesture = (event: Event) => {
        if (track.current !== "cover" || !element?.paused) return;
        if (event.target instanceof Element && event.target.closest(".intro-open-button,.music-button")) return;
        resume();
      };
      const visibility = () => {
        if (document.hidden) element?.pause();
        else resume();
      };
      document.addEventListener("click", gesture);
      document.addEventListener("touchend", gesture);
      document.addEventListener("keydown", gesture);
      document.addEventListener("visibilitychange", visibility);
      return () => {
        element?.pause();
        document.removeEventListener("click", gesture);
        document.removeEventListener("touchend", gesture);
        document.removeEventListener("keydown", gesture);
        document.removeEventListener("visibilitychange", visibility);
      };
    }, [resume]);

    function toggle() {
      if (!audio.current?.paused) {
        wanted.current = false;
        audio.current?.pause();
      } else {
        wanted.current = true;
        resume();
      }
    }
    if (!eventConfig.music.enabled) return null;
    const labels = cover ? invitationCopy.fr : t;
    const label = unavailable ? labels.musicUnavailable : playing ? labels.musicMute : labels.musicPlay;
    return <>
      <audio ref={audio} src={eventConfig.music.coverSrc} loop preload="auto"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setUnavailable(true); setPlaying(false); }}/>
      <button className={`music-button ${cover ? "is-cover" : ""} ${playing ? "is-playing" : ""}`} lang={cover ? "fr" : undefined}
        onClick={toggle} type="button" disabled={unavailable}
        aria-label={label} aria-pressed={playing} title={label}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M10 17V6l9-2v11M10 9l9-2"/>
          <ellipse cx="7" cy="18" rx="3" ry="2"/><ellipse cx="16" cy="16" rx="3" ry="2"/>
          {!playing && <path d="m4 3 17 18"/>}
        </svg>
      </button>
    </>;
  }
);
