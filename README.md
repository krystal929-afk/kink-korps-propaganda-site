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

## GitHub Pages preview

Run `npm run build:pages` to refresh the committed `docs/` preview. In repository Settings → Pages, select Deploy from a branch, `main`, and `/docs`. GitHub Free requires this repository to be public.

Expected preview URL (after enabling Pages): https://krystal929-afk.github.io/kink-korps-propaganda-site/

This separate browser-only build preserves the page artwork and personal-plan interactions. It uses the repository URL prefix for images and fonts and asks search engines not to index the preview. There is no CNAME file or custom-domain change. The original server build remains available via `npm run build`.

After editing source, rebuild and commit `docs/` along with the source changes to update the preview.

## Content and behavior

- Main page: `src/components/landing-page.tsx`
- Colors and type: `src/styles.css`
- Artwork and logos: `public/media/`
- Event summary and browser storage: `src/lib/enlistment.ts`
- The displayed event is October 23, 2026; review the event details before publishing.
- The personal plan form saves only in the visitor's browser. It does not submit an RSVP, collect payment, or notify the organizers.
- Original platform support files and branding are retained. Generated output, logs, screenshots and installed dependencies are excluded from version control.
