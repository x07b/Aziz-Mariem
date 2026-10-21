"use client";
import { useState } from "react";
import Image from "next/image";
import { useAutoplayVideo } from "@/lib/useAutoplayVideo";
import { eventConfig } from "@/config/event";
import { useInvitation } from "./InvitationLanguage";
import { Reveal } from "./Reveal";

export function ProposalFilm({ entered }: { entered: boolean }) {
  const { t } = useInvitation();
  const [failed, setFailed] = useState(false);
  const video = useAutoplayVideo(entered && !failed);
  return <section className="proposal-section" aria-label={t.proposalLabel}>
    <Reveal>
      <div className="proposal-frame proposal-frame-antique">
        <video ref={video} autoPlay={entered} muted playsInline loop preload="auto"
          aria-label={t.proposalLabel}
          onVolumeChange={event => { event.currentTarget.muted = true; }}
          onError={() => { setFailed(true); }}>
          <source src={eventConfig.proposal.src} type="video/mp4" onError={() => { setFailed(true); }}/>
        </video>
        <Image className="proposal-frame-art" src="/images/proposal-antique-frame.png" alt="" fill sizes="(max-width: 767px) 90vw, 430px"/>
      </div>
      {failed && <p className="film-status" role="status">{t.filmUnavailable} <a href={eventConfig.proposal.src}>{t.openFilm}</a></p>}
      <p className="proposal-signature script">{t.forever}</p>
    </Reveal>
  </section>;
}
