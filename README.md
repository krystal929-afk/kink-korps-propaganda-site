# Kink Korps — Propaganda Site

A six-page editorial website for Kink Korps, with an ink, paper and red visual system inspired by wartime print. The supplied logo, campaign image and host photography are retained as original assets.

## Pages

- Home: the brand introduction and featured night
- Events: the event desk and future announcements
- Anything Goes: the Halloween Edition briefing, admission information and optional browser-local plan
- The Korps: Mr. Satan, Satanica Lux and Rari Fastcar’s door role
- Field Guide: arrival information, consent guidance and expandable FAQs
- Get Involved: enquiries through an explicitly labelled email draft

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

## GitHub Pages preview

```sh
npm run build:pages
npm run typecheck
```

Commit the rebuilt `docs/` directory with source changes. Settings → Pages uses Deploy from a branch, `main`, `/docs`.

Preview: https://krystal929-afk.github.io/kink-korps-propaganda-site/

Every page has its own generated `index.html`, allowing direct links and refreshes on GitHub Pages. Asset and navigation paths include this repository’s URL prefix. A custom 404 page is included. The preview asks search engines not to index it. No CNAME or domain changes are included.

The original TanStack Start server build is retained and passes `npm run build`.

## Verification

The redesign passed type checking, the static Pages build and the original server build. All six static pages were rendered in Chromium at desktop (1440px) and mobile (390px), with no application errors, broken local assets or horizontal overflow. Additional checks covered 320px layouts, menu navigation and Escape dismissal, FAQ expansion, saved-plan persistence/deletion, the expired-event state and contact-form validation. Reduced-motion preferences are respected.

## Behavior and editing

- Page content and shared components: `src/components/korps-site.tsx`
- Layout, colors, typography and transitions: `src/styles.css`
- Browser routes: `src/pages-main.tsx`
- Static publishing: `vite.pages.config.ts`
- Original artwork: `public/media/`

The October 23, 2026 event automatically becomes an archive after 4 AM Eastern on October 24. Presale messaging changes at 7 PM Eastern on October 23. Ticket information links to the existing official event site; this preview does not process payments.

Contact opens a draft in the visitor’s email application. It does not silently submit or store enquiries. Personal plans stay in local browser storage and are not tickets or RSVPs. The old artwork gallery is not displayed; its assets remain available for future promos.

Future custom-domain migration requires updating the preview base path and hosting settings. The live `Kink-Korps` and `kink-korps-tickets` repositories are separate.
