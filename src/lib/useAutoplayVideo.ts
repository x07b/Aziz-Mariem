"use client";
import { useEffect, useRef } from "react";

/** Retry muted inline playback when media becomes ready or the browser resumes. */
export function useAutoplayVideo(active: boolean, playbackRate = 1) {
  const video = useRef<HTMLVideoElement>(null);
  const playbackRateRef = useRef(playbackRate);
  useEffect(() => {
    playbackRateRef.current = playbackRate;
    if (video.current) video.current.playbackRate = playbackRate;
  }, [playbackRate]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!active) { element.pause(); return; }
    let disposed = false;
    const play = () => {
      if (disposed || document.hidden || !element.paused) return;
      element.muted = true;
      element.defaultMuted = true;
      element.playsInline = true;
      element.playbackRate = playbackRateRef.current;
      void element.play().catch(() => { /* Retry on readiness, visibility, or a user gesture. */ });
    };
    const visibility = () => { if (document.hidden) element.pause(); else play(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
    });
    observer.observe(element);
    element.addEventListener("loadeddata", play);
    element.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("pointerup", play);
    document.addEventListener("touchend", play);
    window.addEventListener("pageshow", play);
    play();
    return () => {
      disposed = true;
      observer.disconnect();
      element.removeEventListener("loadeddata", play);
      element.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("pointerup", play);
      document.removeEventListener("touchend", play);
      window.removeEventListener("pageshow", play);
      element.pause();
    };
  }, [active]);
  return video;
}
