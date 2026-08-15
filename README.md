# MARTI101 — AI and Digital Business Transformation

Course website and interactive Framework Author Slibrary for **MARTI101**
(Major Master in Artificial Intelligence for Business, Term I, 3 ECTS),
EU Business School.

© 2026 Dr. Hildegard Haas · EU Business School.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Course landing page — six units, links to the author gallery |
| `frameworks.html` | Framework Sheet Library — 145-page print-styled reference — master index, 24 Slibrary indexes, 120 nine-section A4 sheets |
| `slibrary.html` | Framework Author Slibrary — 111 authors, 120 frameworks, 6 units, 24 Slibraries; searchable, with click-to-expand six-section profiles |
| `404.html` | Not-found fallback page |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is (no Jekyll build) |

## Publishing on GitHub Pages

1. Create a repository named **`marti101`** under the `drhaas-eubs` account.
2. Upload the contents of this folder to the repository root (not the folder itself — the files must sit at the top level).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
6. After a minute the site is live at:
   `https://drhaas-eubs.github.io/marti101/`

All internal links are relative, so the site works from that sub-path without changes.

## Notes

- The author quotes marked with a red ⚠ in `slibrary.html` are paraphrased
  positions awaiting verbatim-source verification before final publication.
- The site is self-contained: no build step, no external dependencies, no
  frameworks or CDNs — plain HTML and CSS with a small amount of vanilla JS.
