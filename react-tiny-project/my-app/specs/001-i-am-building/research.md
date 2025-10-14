```markdown
# research.md — Modern podcast website

## Summary of decisions

- Decision: Use Next.js App Router static generation (build-time rendering) to pre-render all pages using the embedded `data/episodes.json`.
- Rationale: No runtime data sources were requested; build-time generation provides the best performance and SEO while keeping the app simple and dependency-light.
- Alternatives considered:
  - Client-side fetching from a mock API: adds complexity and hurts SEO.
  - Server-side rendering: unnecessary since data is static.

## Implementation notes

- For dynamic episode routes, use `generateStaticParams` (or Next.js equivalent) to produce static pages for each episode at build time.
- Keep assets (images/audio) in `public/` and reference them from mock data; if assets are missing, use CSS placeholders.
- Ensure mobile-first responsive CSS and accessible player controls.

## Actionable tasks

1. Implement static generation for episodes and pages; ensure routes exist for each mocked episode slug.  
2. Add or confirm `data/episodes.json` includes all episodes (already present).  
3. Add responsive CSS rules and simple mock player controls.  
4. Optionally add placeholder images/audio to `public/` for improved local preview.

```