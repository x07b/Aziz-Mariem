import { eventConfig } from "@/config/event";
import { formatDate, formatTime } from "@/lib/date";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";

export function DetailsSection() {
  return (
    <section className="event-details section-pad" id="details" aria-labelledby="details-heading">
      <Reveal>
        <p className="meta section-index" lang="ar" dir="rtl">الاحتفال</p>
        <h2 className="arabic-ui section-title" id="details-heading" lang="ar" dir="rtl">تفاصيل المناسبة</h2>
        <div className="event-details-grid">
          <div className="event-detail">
            <span className="meta arabic-ui" lang="ar" dir="rtl">التاريخ والوقت</span>
            <p>{formatDate(eventConfig.event.date)}</p>
            <p>{eventConfig.event.locations[0]?.time || formatTime(eventConfig.event.date)}</p>
          </div>
          <div className="event-detail">
            <span className="meta arabic-ui" lang="ar" dir="rtl">المكان</span>
            <p>{eventConfig.event.locations[0]?.venue || eventConfig.event.locations[0]?.address || "التفاصيل قريبًا"}</p>
            {eventConfig.event.locations[0]?.googleMapsUrl && (
              <a
                className="map-link stationery-button"
                href={eventConfig.event.locations[0].googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span lang="ar" dir="rtl">افتح الموقع على Google Maps</span> <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        {eventConfig.event.locations[0]?.mapEmbedUrl && (
          <div className="event-map">
            <iframe
              src={eventConfig.event.locations[0].mapEmbedUrl}
              title="خريطة موقع الخطوبة في جبل الأحمر، تونس"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
        <Flourish />
      </Reveal>
    </section>
  );
}
