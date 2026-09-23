# Agentnonymous

Responsive React landing page implemented from the nine-page **Agentnonymous Landing Page.pdf** reference. Original artwork is extracted into optimized WebP assets; headings, cards, pricing, forms, and FAQ remain native HTML.

## Development

```sh
npm ci
npm run dev
```

Use Node 24.15+ (the installed jsdom release requires at least that patch on Node 24). npm owns the lockfile.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

## Structure

- `src/features/landing`: page sections, reference copy, navigation, hero, and contact form.
- `src/components/ui`: shared shadcn-style Button/Card and Radix-based shadcn Accordion.
- `src/components/motion`: reusable Framer Motion scroll reveals. Content is visible before animation attaches.
- `src/index.css`: dark/red design tokens, PDF-matched layouts, responsive styles, and reduced-motion overrides.
- `public/images`: original PDF artwork, optimized to about 300 KB total. No runtime PDF renderer or external image service is needed.

The desktop layout follows the PDF's proportions. Below 768px, cards and form fields stack, a keyboard-accessible mobile navigation dialog replaces the desktop links, and large decorative process blocks are omitted.

The hero uses a single original robot/laptop layer and four independently animated bubble crops. Scroll reveals run once; reduced motion disables translations, floating loops, and smooth scrolling. Animation failure does not keep content hidden.

## Integrations deferred

Per project scope, authentication and contact delivery are not connected. Sign in opens an availability dialog. The form validates name/email, preserves entered data, and explicitly explains that nothing was sent. Selecting a pricing plan carries that choice into the contact section. There are no credential inputs, outbound form requests, or fake success states.

When connecting services, replace the sign-in dialog with the actual portal URL and the contact submit handler with the agreed API contract. Add server-side validation, abuse protection, and real pending/success/error states then. Social icons remain artwork until profile URLs are supplied.

Pricing and feature wording follows the PDF, including its marketing-oriented plan descriptions. Only the first FAQ answer is present in the source; other answers are conservative draft copy to review before launch.

## Deployment

`npm run build` generates `dist/`. Configure a static host to serve `index.html` for application routes. No deployment has been performed.

Six component tests cover section anchors, accordion behavior, pricing selection, contact validation, dialog focus, and mobile navigation. Browser QA additionally checks desktop/mobile rendering, image loading, reduced motion, and overflow.
