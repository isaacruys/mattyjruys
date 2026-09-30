// Adds photos from inbox/ to the site gallery.
//
//   npm run images                 -> 2026-09-30-01.jpg, 2026-09-30-02.jpg, ...
//   npm run images -- --tag studio -> 2026-09-30-studio-01.jpg, ...
//
// Each image is auto-rotated, resized to fit 2400px, compressed to JPEG,
// saved to public/gallery/, and appended to data/gallery.json.
// Originals are moved to inbox/done/ so nothing is ever lost.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const INBOX = path.join(ROOT, "inbox");
const DONE = path.join(INBOX, "done");
const OUT_DIR = path.join(ROOT, "public", "gallery");
const LIST_FILE = path.join(ROOT, "data", "gallery.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff"]);
const MAX_SIZE = 2400;
const QUALITY = 82;

function parseTag(argv) {
  const i = argv.indexOf("--tag");
  if (i === -1) return "";
  const raw = argv[i + 1] ?? "";
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Next free number for this prefix, so re-running on the same day never overwrites.
function nextNumber(prefix) {
  const re = new RegExp(`^${prefix}-(\\d+)\\.jpg$`);
  let max = 0;
  for (const f of fs.readdirSync(OUT_DIR)) {
    const m = f.match(re);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

// sharp's prebuilt binaries can't decode iPhone HEIC files, so convert
// them with macOS's built-in `sips` first.
function loadImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".heic" && ext !== ".heif") {
    return { img: sharp(file), cleanup: () => {} };
  }
  if (process.platform !== "darwin") {
    throw new Error("HEIC files can only be converted on a Mac");
  }
  const tmp = path.join(os.tmpdir(), `add-images-${Date.now()}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", file, "--out", tmp], { stdio: "ignore" });
  return { img: sharp(tmp), cleanup: () => fs.rmSync(tmp, { force: true }) };
}

async function main() {
  fs.mkdirSync(INBOX, { recursive: true });
  fs.mkdirSync(DONE, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(INBOX)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log("No images in inbox/. Drop some photos in there and run again.");
    return;
  }

  const tag = parseTag(process.argv.slice(2));
  const prefix = tag ? `${today()}-${tag}` : today();
  let n = nextNumber(prefix);

  const list = JSON.parse(fs.readFileSync(LIST_FILE, "utf8"));
  let added = 0;

  for (const file of files) {
    const src = path.join(INBOX, file);
    const name = `${prefix}-${String(n).padStart(2, "0")}.jpg`;
    const dest = path.join(OUT_DIR, name);

    try {
      const { img, cleanup } = loadImage(src);
      await img
        .rotate() // apply EXIF orientation so phone photos aren't sideways
        .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(dest);
      cleanup();
    } catch (err) {
      console.error(`✗ ${file}: ${err.message} (left in inbox/)`);
      continue;
    }

    fs.renameSync(src, path.join(DONE, file));
    list.push(`/gallery/${name}`);
    const before = fs.statSync(path.join(DONE, file)).size;
    const after = fs.statSync(dest).size;
    console.log(`✓ ${file} → public/gallery/${name}  (${kb(before)} → ${kb(after)})`);
    n++;
    added++;
  }

  fs.writeFileSync(LIST_FILE, JSON.stringify(list, null, 2) + "\n");
  console.log(`\nAdded ${added} image(s) to the gallery. Reorder or remove them in data/gallery.json.`);
}

function kb(bytes) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
