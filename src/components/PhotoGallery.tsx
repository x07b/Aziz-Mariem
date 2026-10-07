import { eventConfig } from "@/config/event";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";

export function PhotoGallery() {
  return (
    <section className="photo-gallery section-pad" aria-labelledby="photo-gallery-heading">
      <Reveal>
        <p className="meta section-index">A FEW MOMENTS TO KEEP</p>
        <h2 className="script section-title" id="photo-gallery-heading">In pictures</h2>
        <div className="photo-gallery-grid">
          <PhotoFrame photo={eventConfig.photos.aziz} shape="oval" caption={eventConfig.couple.firstPerson} />
          <PhotoFrame photo={eventConfig.photos.couple} shape="polaroid" caption="Together" />
          <PhotoFrame photo={eventConfig.photos.mariem} shape="oval" caption={eventConfig.couple.secondPerson} />
        </div>
      </Reveal>
    </section>
  );
}
