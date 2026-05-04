const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "public");
const MAX_WIDTH = 1400;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const SKIP_UNDER_KB = 400;

let totalBefore = 0;
let totalAfter = 0;
let count = 0;
let skipped = 0;

function walk(dir, cb) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, cb);
    else if (entry.isFile()) cb(full);
  });
}

const tasks = [];

walk(PUBLIC, (file) => {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const stat = fs.statSync(file);
  const kb = stat.size / 1024;
  if (kb < SKIP_UNDER_KB) {
    skipped++;
    return;
  }

  totalBefore += stat.size;
  count++;

  const tmp = file + ".tmp";

  let pipeline = sharp(file).resize(MAX_WIDTH, MAX_WIDTH, { fit: "inside", withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  tasks.push(
    pipeline.toFile(tmp).then(() => {
      const after = fs.statSync(tmp).size;
      totalAfter += after;
      fs.renameSync(tmp, file);
      const pct = ((1 - after / stat.size) * 100).toFixed(0);
      console.log(`  ${pct}%  ${path.relative(PUBLIC, file)}  (${(kb / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB)`);
    })
  );
});

if (tasks.length === 0) {
  console.log("Nothing to compress. All images are already small.");
  process.exit(0);
}

Promise.all(tasks)
  .then(() => {
    console.log(`\nDone: ${count} images compressed, ${skipped} skipped (already small).`);
    console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → After: ${(totalAfter / 1024 / 1024).toFixed(1)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% reduction)`);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
