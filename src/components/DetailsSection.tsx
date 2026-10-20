"use client";
import { TypedText } from "./TypedText";
import { eventConfig } from "@/config/event";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
import { useInvitation } from "./InvitationLanguage";

export function DetailsSection() {
  const { t, language, dateText, timeText } = useInvitation();
  const address = (value: string | null) => language === "ar" && value === "Ras Ettabia" ? "رأس الطابية" : value;
  return <section className="event-details section-pad" id="details" aria-labelledby="details-heading">
    <div className="reading-surface details-reading"><Reveal><p className="meta section-index" id="details-heading">{t.occasion}</p><p className="celebration-note">{t.celebration.replace("{date}", dateText)}</p></Reveal>
    <Reveal><div className="event-details-grid">
      <div className="event-detail event-datetime"><span className="meta">{t.dateTime}</span><time className="display-date" dateTime={eventConfig.event.date || undefined}>{dateText}</time><time className="display-time" dateTime={eventConfig.event.date || undefined}>{timeText}</time></div>
      {eventConfig.event.locations.map((location,index)=><div className="event-detail" key={index}><span className="meta"><TypedText text={t.place}/></span><p><TypedText text={location.venue || address(location.address) || t.pending}/></p>{location.venue && location.address && <p><TypedText text={address(location.address)!}/></p>}</div>)}
    </div></Reveal></div>
    {eventConfig.event.locations.map((location,index)=>(location.mapEmbedUrl || location.googleMapsUrl) && <Reveal key={index} className="location-card">
      <div className="location-toolbar"><div className="location-caption"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><p><TypedText text={location.venue || address(location.address) || t.place}/></p></div>
      {location.googleMapsUrl && <a className="map-link stationery-button" href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer"><TypedText text={t.maps}/><span aria-hidden="true">↗</span></a>}</div>
      {location.mapEmbedUrl && <div className="event-map"><iframe src={location.mapEmbedUrl} title={t.mapTitle} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>}
    </Reveal>)}
    <Flourish/>
  </section>;
}
