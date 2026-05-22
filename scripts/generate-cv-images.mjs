import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const PDF_PATH = path.resolve("public/cv.pdf");
const OUT_DIR = path.resolve("public/cv");
const DPI = 200;

try {
  execFileSync("pdftoppm", ["-v"], { stdio: "ignore" });
} catch {
  console.error("pdftoppm not found. Run: brew install poppler");
  process.exit(1);
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

execFileSync(
  "pdftoppm",
  ["-png", "-r", String(DPI), PDF_PATH, path.join(OUT_DIR, "page")],
  { stdio: "inherit" },
);

const filenames = (await readdir(OUT_DIR))
  .filter((name) => name.endsWith(".png"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const pages = await Promise.all(
  filenames.map(async (name) => {
    const buffer = await readFile(path.join(OUT_DIR, name));
    return {
      src: `/cv/${name}`,
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }),
);

await writeFile(
  path.join(OUT_DIR, "meta.json"),
  JSON.stringify({ pages, pdfPath: "/cv.pdf" }, null, 2),
);

console.log(`Rendered ${pages.length} page(s) at ${DPI} DPI to ${OUT_DIR}`);
