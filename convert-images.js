// convert-images.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "src/assets/images");
const outputDir = path.join(__dirname, "src/assets/images-webp");

// crée un dossier s’il n’existe pas
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// fonction récursive
function convertDirectory(currentInputDir, currentOutputDir) {
  ensureDir(currentOutputDir);

  const files = fs.readdirSync(currentInputDir, { withFileTypes: true });

  files.forEach((file) => {
    const inputPath = path.join(currentInputDir, file.name);
    const outputPath = path.join(currentOutputDir, file.name);

    if (file.isDirectory()) {
      // 🔁 recurse dans les sous-dossiers
      convertDirectory(inputPath, outputPath);
    } 
    else if (file.isFile() && file.name.endsWith(".png")) {
      const webpOutput = outputPath.replace(".png", ".webp");

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(webpOutput)
        .then(() =>
          console.log(`✅ Converti : ${inputPath} → ${webpOutput}`)
        )
        .catch((err) =>
          console.error(`❌ Erreur pour ${inputPath}`, err)
        );
    }
  });
}

// 🚀 Lancer la conversion
convertDirectory(inputDir, outputDir);
