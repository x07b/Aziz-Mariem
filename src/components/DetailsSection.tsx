"use client";
import { TypedText } from "./TypedText";
import { eventConfig, invitationCopy } from "@/config/event";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
import { useInvitation } from "./InvitationLanguage";

export function DetailsSection() {
  const { dateText, timeText } = useInvitation();
  const t = invitationCopy.fr;
  const address = (value: string | null) => value;
  return <section className="event-details section-pad" lang="fr" dir="ltr" id="details" aria-label={t.dateTime}>
    <div className="reading-surface details-reading">
    <Reveal><div className="event-details-grid">
      <div className="event-detail event-datetime"><span className="meta">{t.dateTime}</span><time className="display-date" dateTime={eventConfig.event.date || undefined}>{dateText}</time><time className="display-time" dateTime={eventConfig.event.date || undefined}>{timeText}</time></div>
      {eventConfig.event.locations.map((location,index)=>{const placeName=location.venue || address(location.address);return placeName && <div className="event-detail" key={index}><span className="meta"><TypedText text={t.place}/></span><p className="display-date"><TypedText text={placeName}/></p>{location.venue && location.address && <p><TypedText text={address(location.address)!}/></p>}</div>;})}
    </div></Reveal></div>
    {eventConfig.event.locations.map((location,index)=>(location.mapEmbedUrl || location.googleMapsUrl) && <Reveal key={index} className="location-card">
      {location.mapEmbedUrl && <div className="event-map"><iframe src={location.mapEmbedUrl} title={t.mapTitle} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>}
      <div className="location-directions">{location.googleMapsUrl && <a className="map-link stationery-button" href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer"><TypedText text={t.maps}/><span aria-hidden="true">↗</span></a>}</div>
    </Reveal>)}
    <Flourish/>
  </section>;
}
