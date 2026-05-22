# vitae

A tiny site that renders my CV as images with a sticky **Download PDF** button.

The source of truth is `public/cv.pdf`. It is rasterized to PNGs in `public/cv/` (committed to the repo) so browsers never have to render a PDF inline.

## Updating the CV

```bash
cp ~/path/to/new-cv.pdf public/cv.pdf
pnpm cv:render
git add public/ && git commit -m "Update CV" && git push
```

Vercel just serves static files, no build-time PDF processing.

## Local dev

```bash
pnpm install
pnpm dev
```

## Requirements

`pnpm cv:render` needs poppler:

```bash
brew install poppler
```

## Stack

Next.js 16, React 19, Tailwind 4, pdftoppm.

## License

Code: MIT (see [LICENSE](./LICENSE)). Feel free to fork it for your own CV.

Personal content (`public/cv.pdf`, `public/cv/*`, `app/icon.jpg`) is not covered by the MIT license and remains all rights reserved.
