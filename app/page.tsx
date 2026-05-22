import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";

type CvPage = {
  src: string;
  width: number;
  height: number;
};

type CvMeta = {
  pages: CvPage[];
  pdfPath: string;
};

async function loadMeta(): Promise<CvMeta> {
  const file = await readFile(
    path.join(process.cwd(), "public/cv/meta.json"),
    "utf-8",
  );
  return JSON.parse(file);
}

export default async function Home() {
  const meta = await loadMeta();

  return (
    <main className="min-h-screen bg-neutral-100 py-6 px-4 sm:py-10">
      <a
        href={meta.pdfPath}
        download="Tom-Cardoen-CV.pdf"
        className="fixed top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-neutral-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
          <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg>
        Download PDF
      </a>

      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {meta.pages.map((page, i) => (
          <Image
            key={page.src}
            src={page.src}
            width={page.width}
            height={page.height}
            alt={`CV page ${i + 1}`}
            priority={i === 0}
            className="w-full h-auto rounded-sm bg-white shadow-md ring-1 ring-black/5"
          />
        ))}
      </div>
    </main>
  );
}
