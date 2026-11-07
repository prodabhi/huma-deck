# Huma deck

Huma's deck as a web app: why online writing needs a paper trail, and how Huma records one.
The engine, theme and research slides are copied from the Huma repo (`web/deck`); the two opening
slides are new.

## Run

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

Arrow keys or space advance; slide 2 has one click-build. Press `?` in the deck for the full key list.

## Slides

1. **Huma.** What it is, in the words from the app's onboarding.
2. **Spot the AI.** The same 57 words: an AI detector says 100% human, an AI wrote them.
3. to 6. The research: the web, papers, social feeds, Turing tests.
7. **Who needs it.** Authors, professors, technical writers, founders, anyone who writes.
8. **How Huma works.**
9. **Why Huma.** Turnitin and Grammarly Authorship compared with Huma.
10. Close. 11. References.

## Editing

- Slides live in `src/App.tsx`. Every number is cited; sources are in `src/data/research.ts`.
- Theme tokens are in `src/styles/tokens.css`. The deck is designed at 125% (`src/scale.ts`).
- Screenshots and other images go in `public/img/`.
