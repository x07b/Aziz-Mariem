"use client";
import { useEffect, useRef, useState } from "react";
import { eventConfig } from "@/config/event";
import { useInvitation } from "./InvitationLanguage";
import { Reveal } from "./Reveal";

export function ProposalFilm({ entered }: { entered: boolean }) {
  const { t } = useInvitation();
  const video = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
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
        return;
      }
      element.muted = true;
      try { await element.play(); } catch { /* Native controls allow a gesture retry. */ }
      if (request !== generation) return;
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
    };
  }, [entered, failed]);
  return <section className="proposal-section" aria-label={t.proposalLabel}>
    <Reveal>
      <div className="proposal-frame">
        <video ref={video} muted controls playsInline loop preload="none" poster={eventConfig.proposal.poster}
          aria-label={t.proposalLabel}
          onPlay={() => {
            if (!visible.current || document.hidden) video.current?.pause();
          }}
          onVolumeChange={event => { event.currentTarget.muted = true; }}
          onError={() => { setFailed(true); }}>
          <source src={eventConfig.proposal.src} type="video/mp4" onError={() => { setFailed(true); }}/>
        </video>
      </div>
      {failed && <p className="film-status" role="status">{t.filmUnavailable} <a href={eventConfig.proposal.src}>{t.openFilm}</a></p>}
      <p className="proposal-signature script">{t.forever}</p>
    </Reveal>
  </section>;
}
