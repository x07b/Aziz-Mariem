import { eventConfig } from "@/config/event";
import { DecorativeFrame } from "./DecorativeFrame";
import { PhotoImage } from "./PhotoFrame";
import { Reveal } from "./Reveal";
export function RSVPCard() {
  return <section className="rsvp-teaser photo-section" aria-label="An invitation to join us"><PhotoImage photo={eventConfig.photos.couple}/><div className="photo-veil"/><Reveal><a href="#rsvp" className="rsvp-plaque" aria-label="Kindly RSVP — go to the reply form"><DecorativeFrame><span className="script">Kindly</span><span className="plaque-rsvp">RSVP</span><span className="tiny-rule"/><span className="meta">YOUR PRESENCE<br/>WOULD MEAN THE WORLD</span><span className="meta plaque-link">CLICK HERE <span aria-hidden="true">↗</span></span></DecorativeFrame></a></Reveal></section>;
}
