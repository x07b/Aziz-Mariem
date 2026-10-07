export type Photo = { src: string; alt: string; position?: string };
export type Location = { label: string; time: string | null; venue: string | null; address: string | null; googleMapsUrl: string | null; mapEmbedUrl: string | null };
export type TimelineIcon = "door" | "rings" | "camera" | "cake" | "dinner" | "music";

/** All personal details live here. Null dates/places render honest announcement copy.
 * Use an ISO date with an explicit offset, e.g. 2027-06-12T18:00:00+01:00.
 * Photos can be local paths in /public/images. Missing files gracefully show artwork.
 */
export const eventConfig = {
  couple: { firstPerson: "Aziz", secondPerson: "Mariem", initials: ["A", "M"] },
  storytelling: {
    bismillah: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
    verse: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾",
    scene: "/images/doorway-scene.webp",
    sceneAlt: "تصوّر لعزيز ببدلة زرقاء داكنة ومريم بحجاب وفستان عاجي، من الخلف أمام مدخل أنيق، وذيل الفستان يمتدّ إلى الدعوة",
    fabric: "/images/ivory-fabric.webp",
  },
  event: {
    type: "Engagement", name: "Our Khotba", date: "2026-10-24T20:00:00+01:00" as string | null,
    timeZone: "Africa/Tunis", locale: "en-GB",
    locations: [ {
      label: "Location",
      time: "8:00 pm",
      venue: null,
      address: "El Omran, Jbal Lahmar",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=36.82467802712746%2C10.153047196391178",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6387.485991074849!2d10.153047196391178!3d36.82467802712746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3370bc6ee22f%3A0x2c0cb90aa891e4a9!2sJbal%20Lahmar%2C%20Tunis!5e0!3m2!1sfr!2stn!4v1791374066995!5m2!1sfr!2stn",
    } ] as Location[],
  },
  // Add a video under public/videos and set this to its URL, e.g. "/videos/cover.mp4".
  introVideoSrc: "/videos/cover.mp4" as string | null,
  cover: { poster: "/videos/cover-poster.jpg", subtitle: "Fête de fiançailles", button: "Ouvrir l’invitation" },
  // Replace this file with your preferred track when ready.
  music: { src: "/music/song.wav", enabled: true, volume: 0.65, fadeDuration: 1800 },
  contact: { phone: null as string | null },
  photos: {
    hero: { src: "/images/couple-hero.jpg", alt: "لحظة هادئة معًا — صورة توضيحية", position: "center 45%" },
    aziz: { src: "/images/aziz-childhood.jpeg", alt: "عزيز في طفولته", position: "center 28%" },
    mariem: { src: "/images/mariem-childhood.jpeg", alt: "مريم في طفولتها", position: "center 28%" },
    couple: { src: "", alt: "صورة لعزيز ومريم قريبًا" },
    second: { src: "/images/couple-hero.jpg", alt: "لحظة رقيقة معًا", position: "center 45%" },
    scenic: { src: "/images/scenic.jpg", alt: "حديقة هادئة قرب البحيرة" },
    venue: { src: "", alt: "مكان الاحتفال قريبًا" },
    details: { src: "", alt: "تفصيل من الاحتفال" },
  } satisfies Record<string, Photo>,
  story: "Two hearts, one promise, and a beautiful new chapter we’d love to begin with you.",
  timeline: [
    { time: null, title: "Welcome", icon: "door" },
    { time: null, title: "Khotba", icon: "rings" },
    { time: null, title: "Photos", icon: "camera" },
    { time: null, title: "Celebrate", icon: "music" },
  ] as { time: string | null; title: string; icon: TimelineIcon }[],
  dressCode: {
    description: "Our colours for the evening.",
    note: "",
    colors: [{ name: "Aziz · Marine blue", hex: "#263c50" }, { name: "Mariem · Beige", hex: "#d8cbb4" }],
  },
  smallNote: { enabled: true, title: "A Small Note", text: "Your presence is the most meaningful gift to us. We simply can’t wait to celebrate this special moment together." },
  rsvp: {
    deadline: null as string | null, maxGuests: 6,
    message: "We’d love for you to be part of our celebration. Please let us know if you can make it.",
    successAccept: "We can’t wait to celebrate with you.",
    successDecline: "You’ll be with us in spirit. Thank you for letting us know.",
  },
};
export const coupleNames = `${eventConfig.couple.firstPerson} & ${eventConfig.couple.secondPerson}`;
