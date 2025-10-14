```markdown
# data-model.md — Modern podcast website

## Entities

- Episode
  - slug: string (unique identifier)
  - title: string
  - publication_date: string (ISO date or date-like)
  - duration: string (human readable e.g., "18:23")
  - artwork: string (path or URL to artwork - mocked)
  - short_description: string
  - full_notes: string
  - transcript: string
  - audio_url: string (path to mocked audio)
  - tags: array[string]

- Host
  - name: string
  - photo_url: string
  - short_bio: string
  - social_links: array[string]

- FAQEntry
  - question: string
  - answer: string
  - category: string

## Validation rules (for mocks)
- `slug` must be unique across episodes
- `title` must be non-empty
- `publication_date` should be a parsable date string

```