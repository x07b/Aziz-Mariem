# Aziz & Mariem — engagement invitation

Next.js, TypeScript, Tailwind CSS and Framer Motion. All event data, photos, music and French/English invitation copy are in `src/config/event.ts`.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start -- --port 3001
```

## Link preview image

The supplied invitation artwork is used for Open Graph and large Twitter card previews. Vercel production and preview deployments use their deployment URL automatically. For other hosting providers, set `NEXT_PUBLIC_SITE_URL` to the public site origin, including `https://` (for example, `https://invitation.example.com`), so share metadata contains absolute URLs to the site and image. Social platforms may cache link previews; after updating the image or metadata, use the platform's sharing debugger or wait for its cache to refresh. Instagram does not display link preview cards in captions or bio links.

## Post-opening gown story

`src/components/GownStory.tsx` wraps the invitation, childhood lockets, event details/map, timeline, countdown and footer. The invitation body switches between French and English. The Quran verse above the couple always remains in Arabic. Every section and the footer is transparent over the same continuous fabric surface. The event information and section order are unchanged.

French is the default language. The globe/FR–EN button above the single music control switches all rendered invitation copy, cover labels, accessibility labels, dates, times and countdown units without re-opening the cover or stopping audio. The choice is remembered in local storage when available. `src/components/InvitationLanguage.tsx` owns the shared language state; `src/app/invitation-editorial.css` contains the bilingual typography and controls.

The redesigned cover uses the supplied video, copied to `public/videos/cover.mp4`, with a still extracted from that video at `public/videos/cover-poster.jpg`. The cover shows Aziz & Mariem, “Fête de fiançailles” and the entry button. A single music control also pauses/resumes the cover video. Reduced motion keeps the video still; playback failures retain the poster. Paths and cover copy are editable in `src/config/event.ts`; styling is isolated in `src/app/cover.css`.

The childhood portraits sit in large lace heart frames, side by side on desktop and diagonally stacked on mobile. The photo positioning leaves the faces below the heart’s center notch so neither face is clipped. Text groups and timeline moments reveal during natural scrolling, with short fades for reduced-motion users. Bold Lora headings and readable paragraphs sit on softly blurred ivory reading surfaces; script lettering is reserved for small name signatures. Solid olive buttons provide clear actions while transparent section backgrounds continue through the footer.

`src/app/gown-story.css` contains the base visual design. A feathered SVG mask merges the photographic gown into a continuous fabric surface. Alternately mirrored texture tiles meet at matching edges without stretching the embroidery. Framer Motion scroll progress moves the shared fabric by a restrained 48px over the full page. Native anchor scrolling stays smooth, without scroll hijacking. Reduced motion disables the fabric displacement and smooth scrolling. The scene remains uncropped across screen widths, with a centered editorial width on desktop.

The scene was generated using the supplied couple photo as reference: Mariem wears an opaque ivory gown and hijab, Aziz now wears beige. Optimized artwork is stored in `public/images/doorway-scene-beige.webp` and `public/images/ivory-fabric.webp`; the prior navy image is preserved separately. Full generation prompts and provenance are in `docs/artwork.md`.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
# With the production preview running on port 3001:
npm run test:e2e
```

Browser tests cover 320, 375, 390, 430, 768, 1024 and 1440px; both languages, supplied copy integrity, the fixed Arabic verse, heading weight, overflow, image loading, opening/closing, audio, countdown, navigation, control placement and remembered language preferences. External Google Maps is stubbed only in automated tests. Screenshots are saved in the ignored `test-results` directory.

The existing optional RSVP components and local-storage adapter remain available in source, but the current page composition does not mount them. No backend or publishing service is configured.
