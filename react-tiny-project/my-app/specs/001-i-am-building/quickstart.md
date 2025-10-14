```markdown
# quickstart.md — Modern podcast website

## Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server (hot reload):

```bash
npm run dev
```

3. Open in browser:

- http://localhost:3000 (or if 3000 in use, another port like 3001)

## Build (static generation)

```bash
npm run build
npm start
```

Notes:
- The site is statically generated at build time using `data/episodes.json`. No external data sources.
- Placeholders for images/audio can be added under `public/images` and `public/audio`.

```
