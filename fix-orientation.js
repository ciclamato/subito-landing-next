const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const mappings = [
  { src: "museos/03 museo del futbol", dst: "03-museo-del-futbol" },
  { src: "museos/07 MUSEO QUIROGA", dst: "07-museo-quiroga" },
];

const SRC_ROOT = "C:/Users/tetri/OneDrive/Desktop/subitoLANDING/imagenes";
const DST_ROOT = path.join(__dirname, "public", "images", "museos");

mappings.forEach(({ src, dst }) => {
  const srcDir = path.join(SRC_ROOT, src);
  const dstDir = path.join(DST_ROOT, dst);
  if (!fs.existsSync(srcDir)) return;
  
  fs.readdirSync(srcDir).forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
    
    const outName = file.toLowerCase().replace(/\s+/g, "-").replace(/_+/g, "-");
    const dstPath = path.join(dstDir, outName);
    
    let pipeline = sharp(path.join(srcDir, file))
      .withMetadata()
      .resize(1400, 1400, { fit: "inside", withoutEnlargement: true });
    
    if (ext === ".png") {
      pipeline = pipeline.png({ quality: 80 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    }
    
    pipeline.toFile(dstPath + ".tmp").then(() => {
      fs.renameSync(dstPath + ".tmp", dstPath);
      console.log("  ok:", outName);
    });
  });
});

console.log("Done - orientation preserved.");
