import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { DownloadButton } from "./download-button";

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
      <DownloadButton href={meta.pdfPath} />

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
