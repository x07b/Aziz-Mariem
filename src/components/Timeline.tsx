import { eventConfig } from "@/config/event";
import { TimelineIcon, Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
export function Timeline() {
  const labels: Record<string, string> = {
    Welcome: "الترحيب",
    Khotba: "الخطوبة",
    Photos: "الصور",
    Celebrate: "الاحتفال",
  };
  return <section className="timeline-section section-pad" aria-labelledby="timeline-heading"><Reveal><p className="meta section-index arabic-ui" lang="ar" dir="rtl">أمسيتنا</p><h2 className="arabic-ui section-title" id="timeline-heading" lang="ar" dir="rtl">لحظاتنا معًا</h2><ol className="timeline-grid">{eventConfig.timeline.map((item)=><li key={item.title}><TimelineIcon type={item.icon}/><h3 className="arabic-ui" lang="ar" dir="rtl">{labels[item.title] ?? item.title}</h3></li>)}</ol><Flourish/></Reveal></section>;
}
