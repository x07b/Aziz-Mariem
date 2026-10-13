"use client";
import { TypedText } from "./TypedText";
import { eventConfig } from "@/config/event";
import { TimelineIcon, Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
import { useInvitation } from "./InvitationLanguage";
export function Timeline() {
  const { t } = useInvitation();
  return <section className="timeline-section section-pad" aria-labelledby="timeline-heading"><div className="reading-surface"><Reveal><p className="meta section-index"><TypedText text={t.evening}/></p><h2 className="section-title" id="timeline-heading"><TypedText text={t.timeline}/></h2></Reveal><ol className="timeline-grid">{eventConfig.timeline.map((item,index)=><li key={item.title}><Reveal delay={index*.07}><TimelineIcon type={item.icon}/>{item.time && <p className="meta"><TypedText text={item.time}/></p>}<h3><TypedText text={t.moments[item.title] ?? item.title}/></h3></Reveal></li>)}</ol><Flourish/></div></section>;
}
