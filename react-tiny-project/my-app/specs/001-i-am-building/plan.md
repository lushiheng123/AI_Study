```markdown
# Implementation Plan: Modern podcast website (podcast site)

**Branch**: `001-i-am-building` | **Date**: 2025-10-14 | **Spec**: ./spec.md
**Input**: Feature specification from `/specs/001-i-am-building/spec.md`

## Summary

Implement a responsive, static-generated Next.js site that renders the podcast pages using embedded mock data (`data/episodes.json`). Use the Next.js App Router's static-generation features (build-time rendering) to produce performant, SEO-friendly pages without any runtime data source. Ensure mobile-first responsive styles and accessible controls.

## Technical Context

- Language/Version: JavaScript / Node.js (Next.js v15 App Router)
- Primary Dependencies: Next.js, React, Tailwind CSS (already in project)
- Storage: None (mock data embedded in repository under `data/episodes.json`)
- Testing: Manual validation (project constitution excludes automated tests)
- Target Platform: Web (desktop & mobile responsive)
- Project Type: Web application (frontend-only static pages)
- Performance Goals: First meaningful paint < 2s on standard broadband for mocked assets; pages pre-rendered at build time.
- Constraints: No external network data; pages must be static at build time; minimal new dependencies.

## Constitution Check

All work aligns with the project constitution: minimal dependencies, responsive design, Next.js core. No testing frameworks will be added.

## Project Structure (selected)

```
frontend/
├── app/               # Next.js app router (existing)
├── data/              # Mock data (data/episodes.json)
public/
  ├── images/
  └── audio/
specs/001-i-am-building/
  ├── spec.md
  ├── plan.md
  ├── research.md
  ├── data-model.md
  ├── quickstart.md
  └── contracts/
```

## Phase 0: Research (summary)

- Decision: Use Next.js App Router static-generation (build-time) via page rendering and optional `generateStaticParams` for dynamic routes. No external data fetching at runtime.  
- Rationale: Matches requirement to keep data embedded and ensures best performance and SEO.  
- Alternatives considered: Client-side fetching (rejected due to SEO/perf); Server-side rendering (rejected because no runtime data needed).

## Phase 1: Design & Contracts (outputs produced)

- data-model.md (entities and fields)
- contracts/openapi.yaml (minimal placeholder for possible future API)
- quickstart.md (how to build & serve statically)

```