import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "assets/images/original";
const outputDir = "assets/images/webp";

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir);

for (const file of files) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.\w+$/, ".webp"));

  await sharp(inputPath).webp({ quality: 100 }).toFile(outputPath);

  console.log("✔", outputPath);
}
