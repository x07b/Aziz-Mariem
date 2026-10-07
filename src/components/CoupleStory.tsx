import { coupleNames, eventConfig } from "@/config/event";
import { PhotoFrame } from "./PhotoFrame";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";
export function CoupleStory() {
  return <section className="story section-pad" aria-labelledby="story-heading">
    <Reveal><Flourish/><div className="heart-memories" role="group" aria-label="صور عزيز ومريم في الطفولة">
      <svg className="hearts-ribbon" viewBox="0 0 600 170" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M76 143C57 27 201 6 294 62C224-19 350-13 303 63C417 11 546 39 523 154M294 62C235 18 204 41 221 60C236 77 275 67 294 62C344 30 386 37 378 58C372 77 324 67 303 63M294 64q-6 41-34 64M303 64q4 36 33 59"/></svg>
      <PhotoFrame photo={eventConfig.photos.aziz} shape="heart" className="memory-heart aziz-heart" caption={eventConfig.couple.firstPerson}/>
      <PhotoFrame photo={eventConfig.photos.mariem} shape="heart" className="memory-heart mariem-heart" caption={eventConfig.couple.secondPerson}/>
    </div></Reveal>
    <Reveal className="story-message"><h2 className="sr-only" id="story-heading" lang="ar">فصل جديد معًا</h2><blockquote lang="en">{eventConfig.story}</blockquote><p className="meta" lang="en">WITH LOVE</p><p className="script signature" lang="en">{coupleNames}</p></Reveal>
  </section>;
}
