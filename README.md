# Aziz & Mariem — engagement invitation

Next.js, TypeScript, Tailwind CSS and Framer Motion. All event data, photos, music and the exact Quran verse are in `src/config/event.ts`.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start -- --port 3001
```

## Post-opening gown story

`src/components/GownStory.tsx` wraps the existing invitation, childhood lockets, event details/map, timeline, countdown and footer. The Bismillah and exact Quran verse appear above the couple. The Arabic invitation copy, event information and section order are preserved. Every section and the footer is transparent over the same continuous fabric surface.

The redesigned cover uses the supplied video, copied to `public/videos/cover.mp4`, with a still extracted from that video at `public/videos/cover-poster.jpg`. The cover shows Aziz & Mariem, “Fête de fiançailles” and the entry button. A single music control also pauses/resumes the cover video. Reduced motion keeps the video still; playback failures retain the poster. Paths and cover copy are editable in `src/config/event.ts`; styling is isolated in `src/app/cover.css`.

The childhood portraits sit in large lace heart frames, side by side on desktop and diagonally stacked on mobile. The photo positioning leaves the faces below the heart’s center notch so neither face is clipped. Each Arabic paragraph reveals independently during natural scrolling, with short fades for reduced-motion users. Embroidery-colored typography and transparent section backgrounds continue through the footer.

`src/app/gown-story.css` contains the isolated visual redesign. A feathered SVG mask merges the photographic gown into a continuous fabric surface. Alternately mirrored texture tiles meet at matching edges without stretching the embroidery. The canvas follows native document scrolling; there are no scroll event handlers or scroll hijacking. The scene remains uncropped across screen widths, with a centered editorial width on desktop. Motion respects reduced-motion preferences.

The scene was generated using the supplied couple photo as reference: Mariem wears an opaque ivory gown and hijab, Aziz wears navy blue. Optimized artwork is stored in `public/images/doorway-scene.webp` and `public/images/ivory-fabric.webp`. Full generation prompts and provenance are in `docs/artwork.md`.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
# With the production preview running on port 3001:
npm run test:e2e
```

Browser tests cover 320, 375, 390, 430, 768, 1024 and 1440px; Arabic verse integrity, content preservation, overflow, image loading, opening/closing, audio, countdown and navigation. External Google Maps is stubbed only in automated tests. Screenshots are saved in the ignored `test-results` directory.

The existing optional RSVP components and local-storage adapter remain available in source, but the current page composition does not mount them. No backend or publishing service is configured.
