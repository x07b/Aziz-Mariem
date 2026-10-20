"use client";
import { useEffect, useRef, useState } from "react";
import { eventConfig } from "@/config/event";
import { useInvitation } from "./InvitationLanguage";
import { Reveal } from "./Reveal";

export function ProposalFilm({ entered, beforePlay, onLeave }: {
  entered: boolean; beforePlay: () => Promise<void>; onLeave: () => void;
}) {
  const { t } = useInvitation();
  const video = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const [needsSound, setNeedsSound] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element || !entered || failed) return;
    let generation = 0;
    let disposed = false;
    const eligible = () => !disposed && visible.current && !document.hidden;
    const sync = async () => {
      const request = ++generation;
      if (!eligible()) {
        element.pause();
        onLeave();
        return;
      }
      await beforePlay();
      if (request !== generation || !eligible()) return;
      element.muted = false;
      try {
        await element.play();
        if (request === generation && eligible()) setNeedsSound(false);
      } catch {
        if (request !== generation || !eligible()) return;
        element.muted = true;
        setNeedsSound(true);
        try { await element.play(); } catch { /* Keep music paused until the visitor taps the sound control or leaves. */ }
      }
      if (!eligible()) element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting && entry.intersectionRatio >= .55;
      if (next !== visible.current) { visible.current = next; void sync(); }
    }, { threshold: [0, .55] });
    const visibility = () => { void sync(); };
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      ++generation;
      visible.current = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      element.pause();
      onLeave();
    };
  }, [entered, failed, beforePlay, onLeave]);
  function enableSound() {
    const element = video.current;
    if (!element || !visible.current || document.hidden) return;
    // Direct gesture preserves Safari's user activation for unmuting.
    element.muted = false;
    void element.play().then(() => setNeedsSound(false)).catch(() => {
      element.muted = true;
      setNeedsSound(true);
    });
  }
  return <section className="proposal-section" aria-labelledby="proposal-heading">
    <Reveal>
      <p className="meta">{t.proposalLabel}</p>
      <h2 id="proposal-heading">{t.proposalTitle}</h2>
      <p className="proposal-note">{t.proposalNote}</p>
      <div className="proposal-frame">
        <video ref={video} controls playsInline loop preload="none" poster={eventConfig.proposal.poster}
          aria-label={t.proposalLabel}
          onPlay={() => {
            if (!visible.current || document.hidden) video.current?.pause();
            else void beforePlay();
          }}
          onVolumeChange={() => setNeedsSound(!!video.current?.muted)}
          onError={() => { setFailed(true); onLeave(); }}>
          <source src={eventConfig.proposal.src} type="video/mp4" onError={() => { setFailed(true); onLeave(); }}/>
        </video>
      </div>
      {needsSound && !failed && <button className="film-sound" onClick={enableSound} type="button">{t.enableSound}<span aria-hidden="true"> ♪</span></button>}
      {failed && <p className="film-status" role="status">{t.filmUnavailable} <a href={eventConfig.proposal.src}>{t.openFilm}</a></p>}
      <p className="proposal-signature script">{t.forever}</p>
    </Reveal>
  </section>;
}
