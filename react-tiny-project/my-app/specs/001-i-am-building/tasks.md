```markdown
# Tasks: Modern podcast website (podcast site)

**Input**: plan.md, spec.md, research.md, data-model.md, contracts/
**Feature**: specs/001-i-am-building/spec.md

## Overview

This file lists executable tasks grouped by user story. Tasks are numbered (T001...) and include exact file paths. Tasks marked with [P] can be worked on in parallel (they modify different files).

### Summary (high level)
- Total tasks: 26
- MVP recommendation: Complete User Story 1 (Discover a featured episode quickly) first

---

## Phase 1: Setup (Project initialization & shared infra)

Purpose: Prepare code organization, shared helper, and placeholder assets so user stories can be implemented independently.

- [x] T001 [P] [Setup] Create `lib/episodes.js` that exports functions to read mock data
  - Path: `lib/episodes.js`
  - Details: implement `getAllEpisodes()` and `getEpisodeBySlug(slug)` that synchronously import `data/episodes.json`.

- [x] T002 [P] [Setup] Add placeholders folder for visuals and audio
  - Path: `public/images/placeholder.svg`, `public/audio/sample-silence.mp3` (or data-URI alternative)
  - Details: create a simple SVG placeholder `placeholder.svg` and a tiny silent audio file or data-uri wrapper so audio tags work during local preview.

- [x] T003 [P] [Setup] Confirm `data/episodes.json` exists and validate slugs
  - Path: `data/episodes.json`
  - Details: run a quick script `scripts/validate-episodes.js` (create file) that checks unique `slug` and required fields; output errors if duplicates or missing titles.

Checkpoint: Setup complete

---

## Phase 2: Foundational (Blocking prerequisites)

Purpose: Add static generation plumbing and responsive base styles. These must complete before story-specific UI work.

- [x] T004 [ ] Add `generateStaticParams` to dynamic route
  - Path: `app/episodes/[slug]/page.js`
  - Details: export `export async function generateStaticParams()` that returns `[{ slug: episode.slug }, ...]` for all episodes by reading `data/episodes.json` (via `lib/episodes.js`). This ensures build-time static pages for each episode.

- [x] T005 [P] [Foundation] Extract data access to `lib/episodes.js` usage across pages
  - Paths: `app/page.js`, `app/episodes/page.js`, `app/episodes/[slug]/page.js`
  - Details: Replace direct `import '../data/episodes.json'` usages with calls to `lib/episodes.js` functions to centralize mock-data access.

- [ ] T006 [P] [Foundation] Improve mobile-first base CSS and utilities
  - Path: `app/globals.css`
  - Details: Add/adjust CSS variables, spacing and touch targets; ensure hero and list components have mobile-first breakpoints. Confirm accessible color contrast for `.btn` and text.

- [ ] T007 [P] [Foundation] Add simple accessible mock audio player component
  - Path: `components/MockPlayer.js` (create) plus imports in `app/episodes/[slug]/page.js` and `app/page.js`
  - Details: small React component with Play/Pause buttons, aria-labels, keyboard focus, and uses `<audio>` with the sample audio. Keep logic minimal and client-side only.

Checkpoint: Foundation ready - user stories can start

---

## Phase 3: User Story 1 - Discover a featured episode quickly (Priority: P1) 🎯 MVP

Goal: Landing page shows exactly one featured episode with artwork, metadata, and an accessible Play CTA.

Independent Test: Open `/` and confirm featured card visible above the fold with title, artwork, short description and a Play CTA. Clicking Play starts the mock audio and shows a pause control.

- [ ] T008 [P] [US1] Create `components/FeaturedEpisode.js` to render featured card
  - Path: `components/FeaturedEpisode.js`
  - Details: Props: `episode`; renders artwork (fallback to `public/images/placeholder.svg`), title, short_description, duration, and Play CTA linking to `/episodes/[slug]` or invoking mock player.

- [ ] T009 [ ] [US1] Wire `app/page.js` to use `components/FeaturedEpisode` and `lib/episodes.js` to fetch the first episode as featured
  - Path: `app/page.js`
  - Details: ensure the homepage imports `getAllEpisodes()` and passes the first (or designated featured) episode to the component.

- [ ] T010 [P] [US1] Integrate `components/MockPlayer.js` into featured card to support play/pause and accessible controls
  - Paths: `components/MockPlayer.js`, `components/FeaturedEpisode.js`, `app/page.js`
  - Details: Add keyboard support, aria-labels and visible play/pause state. Use `public/audio/sample-silence.mp3` or data-URI fallback.

- [ ] T011 [P] [US1] Add graceful fallback UI when audio or artwork asset is missing
  - Paths: `components/FeaturedEpisode.js`, `components/MockPlayer.js`
  - Details: if artwork missing show placeholder SVG; if audio fails to load show a friendly message and provide `Download notes` link to transcript section.

Checkpoint: US1 complete — landing page is functional and testable

---

## Phase 4: User Story 2 - Browse episodes (Priority: P1)

Goal: Episodes page lists 20 mock episodes with pagination (10 per page) and each episode opens static detail page with notes and mock-player.

Independent Test: Open `/episodes` and confirm 10 items per page, pagination controls; clicking an item navigates to pre-generated `/episodes/{slug}` page showing full metadata and playable mock audio.

- [ ] T012 [P] [US2] Implement paginated Episodes list (10 per page)
  - Path: `app/episodes/page.js`
  - Details: Use `getAllEpisodes()` and render first 10; add simple pagination controls that update query param `?page=2` or static route `/episodes/page/2` (choose implementation consistent with project). Ensure mobile-friendly list layout.

- [ ] T013 [P] [US2] Implement static generation for episode detail pages (generateStaticParams)
  - Path: `app/episodes/[slug]/page.js` (T004 also covers addition)
  - Details: ensure each slug results in a static page; page imports `getEpisodeBySlug(slug)` and renders full show notes, transcript and `components/MockPlayer`.

- [ ] T014 [P] [US2] Add episode excerpt and metadata to list items
  - Path: `app/episodes/page.js`
  - Details: Each list item shows title, publication_date, duration, short_description and a link to detail page.

- [ ] T015 [P] [US2] Ensure pagination handles fewer than expected items gracefully
  - Path: `app/episodes/page.js`
  - Details: hide pagination UI if total <= page size; validate with `data/episodes.json` containing 20 items.

Checkpoint: US2 complete — episodes browse and detail pages functional

---

## Phase 5: User Story 3 - Learn about the show and hosts (Priority: P2)

Goal: About page with show description, host bios and social links; responsive and accessible.

Independent Test: Open `/about` and confirm host photos, short bios and 1-3 external links visible on mobile and desktop.

- [ ] T016 [P] [US3] Improve `app/about/page.js` layout and use real placeholders
  - Path: `app/about/page.js`
  - Details: Use `public/images/placeholder.svg` for host photos, add `rel="noopener noreferrer"` on external links, ensure responsive layout (stack on mobile).

- [ ] T017 [P] [US3] Add host data file and import if desired
  - Path: `data/hosts.json` (optional)
  - Details: Populate with host entries (name, photo_url, short_bio, social_links) and load from `lib/episodes.js` or `lib/hosts.js`.

Checkpoint: US3 complete

---

## Phase 6: User Story 4 - Find answers quickly (Priority: P3)

Goal: FAQ page organized by categories and searchable by keywords.

Independent Test: Open `/faq` and confirm at least 8 questions across categories are visible; search filters client-side.

- [ ] T018 [P] [US4] Expand `app/faq/page.js` to render categories and at least 8 Q/A entries
  - Path: `app/faq/page.js`, `data/faq.json`
  - Details: Create `data/faq.json` with categories and questions, add a small client-side filter box to narrow results by keyword.

- [ ] T019 [P] [US4] Ensure FAQ is accessible and keyboard-navigable
  - Path: `app/faq/page.js`
  - Details: Focus management for search input and accessible heading semantics.

Checkpoint: US4 complete

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T020 [P] [Polish] Final CSS polish for typography, spacing and contrast
  - Path: `app/globals.css`, component-specific CSS files

- [ ] T021 [P] [Polish] Accessibility audit and fixes (keyboard, labels, alt text)
  - Path: all pages and components (list exact files as you touch them)

- [ ] T022 [P] [Polish] Performance checks: verify build output and first meaningful paint for sample page
  - Path: N/A (run local lighthouse or manual check)

- [ ] T023 [P] [Polish] Update `specs/001-i-am-building/quickstart.md` with final commands and notes
  - Path: `specs/001-i-am-building/quickstart.md`

- [ ] T024 [P] [Polish] Commit all changes and create branch `001-i-am-building` (if not already on it)
  - Path: repo root
  - Details: `git add -A && git commit -m "feat(spec): implement static pages + responsive UI for podcast site" && git push -u origin 001-i-am-building`

---

## Dependencies & Execution Order

- Setup (Phase 1) tasks T001-T003 can run in parallel.
- Foundational (Phase 2) T004-T007 must complete before user story implementation (they block US tasks).
- User Story phases (US1..US4) can be implemented in parallel after foundational tasks finish; within each story some tasks are sequential (e.g., create component then wire it into a page).

### Story order (recommended for MVP):
1. US1 (Discover a featured episode) — deliver MVP
2. US2 (Browse episodes) — expand browsing and detail pages
3. US3 (About) — content & hosts
4. US4 (FAQ) — add searchable FAQ

## Parallel execution examples

- Parallel workers example (3 devs):
  - Dev A: T001, T005, T009 (data + wiring)
  - Dev B: T004, T013, T012 (static generation + episodes list)
  - Dev C: T007, T010, T008 (mock player + featured card + homepage)

## Validation: Independent test criteria per story

- US1: Homepage displays featured card; clicking Play starts audio (use `app/page.js` + `components/MockPlayer.js`).
- US2: `/episodes` shows pagination and links; each `/episodes/{slug}` page shows notes and plays audio.
- US3: `/about` shows host bios and links; images fallback to placeholder.
- US4: `/faq` shows categories and keyword filter works.

---

## Implementation Strategy

Deliver MVP by completing Setup + Foundation + US1. Stop and validate. Then continue US2 for a full browsing experience.

```
