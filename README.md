# Kink Korps — Propaganda Site

Private development repository for the WWII propaganda-inspired Kink Korps / Anything Goes website, imported from the supplied Grok Build export with accessibility and reminder-label fixes.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run typecheck
npm run build
```

Both commands passed during the October 22, 2026 import. Browser verification remains pending because the local Playwright Chromium executable was unavailable.

## Deployment

The supplied project uses React, TanStack Start, Vite, Tailwind CSS and a Vercel server-rendered build. Connect this repository to a separate Vercel project when ready to preview or publish it. It is not configured as a GitHub Pages static site. No hosting or domain settings were changed during import.

## Content and behavior

- Main page: `src/components/landing-page.tsx`
- Colors and type: `src/styles.css`
- Artwork and logos: `public/media/`
- Event summary and browser storage: `src/lib/enlistment.ts`
- The displayed event is October 23, 2026; review the event details before publishing.
- The personal plan form saves only in the visitor's browser. It does not submit an RSVP, collect payment, or notify the organizers.
- Original platform support files and branding are retained. Generated output, logs, screenshots and installed dependencies are excluded from version control.
