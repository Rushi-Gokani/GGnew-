import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public', 'Memories');
const outputDir = inputDir; // Same directory

if (!fs.existsSync(inputDir)) {
  console.error(`Directory not found: ${inputDir}`);
  process.exit(1);
}

const files = fs.readdirSync(inputDir);

async function convertImages() {
  console.log(`Found ${files.length} files in ${inputDir}`);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, path.basename(file, ext) + '.webp');
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log('Conversion complete!');
}

convertImages();
