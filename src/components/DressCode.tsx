import { eventConfig } from "@/config/event";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";

export function DressCode() {
  return (
    <section className="outfit-colors section-pad" aria-labelledby="outfit-heading">
      <Reveal>
        <p className="meta section-index">A NOTE ON COLOUR</p>
        <h2 className="script section-title" id="outfit-heading">What we’ll wear</h2>
        <div className="outfit-swatches">
          {eventConfig.dressCode.colors.map((color) => {
            const [name, shade] = color.name.split(" · ");
            return (
              <div className="outfit-swatch" key={color.name}>
                <span className="outfit-chip" style={{ backgroundColor: color.hex }} aria-hidden="true" />
                <span>{name}</span>
                <span className="meta">{shade}</span>
              </div>
            );
          })}
        </div>
        <Flourish />
      </Reveal>
    </section>
  );
}
