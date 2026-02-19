/**
 * Image Optimization Script
 * Converts and compresses images used on the homepage to WebP format
 * Dramatically reduces file sizes for mobile performance
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = 'd:/globalgourmet/public';
const IMAGES_DIR = join(PUBLIC_DIR, 'images');

// Quality settings
const HERO_QUALITY = 75; // Hero needs to look great
const GENERAL_QUALITY = 72;
const HERO_MAX_WIDTH = 1920;
const GENERAL_MAX_WIDTH = 1200;
const THUMBNAIL_MAX_WIDTH = 800;

// All image paths referenced on the home page
const homePageImages = [
  // Hero
  { src: 'images/hero_real.jpg', maxWidth: HERO_MAX_WIDTH, quality: HERO_QUALITY },
  // About
  { src: 'images/Creative123.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  // Advantages
  { src: 'images/1.png', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/1.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/3.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/4.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/mindful-sourcing.png', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  // Food / Menu
  { src: 'images/food/Copy of B1621171.jpg', maxWidth: THUMBNAIL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/food/Copy of B1621180.jpg', maxWidth: THUMBNAIL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/food/Copy of T1020423.jpg', maxWidth: THUMBNAIL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/food/Copy of T1020454.jpg', maxWidth: THUMBNAIL_MAX_WIDTH, quality: GENERAL_QUALITY },
  // Experience Center
  { src: 'images/culinary.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/workspace.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'images/experience-center/3.jpg', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  // Logos
  { src: 'logo.png', maxWidth: 400, quality: 85 },
  { src: 'logo-blue.png', maxWidth: 400, quality: 85 },
  // Saras
  { src: 'saras-final-1.png', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'saras-final-2.png', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
  { src: 'sustainability-visual.png', maxWidth: GENERAL_MAX_WIDTH, quality: GENERAL_QUALITY },
];

async function optimizeImage(imgConfig) {
  const inputPath = join(PUBLIC_DIR, imgConfig.src);

  if (!existsSync(inputPath)) {
    console.log(`⏭  SKIP (not found): ${imgConfig.src}`);
    return;
  }

  const ext = extname(imgConfig.src).toLowerCase();
  const base = basename(imgConfig.src, ext);
  const dir = dirname(join(PUBLIC_DIR, imgConfig.src));
  const outputWebP = join(dir, `${base}.webp`);

  // Also create optimized JPG fallback for the hero
  const outputJpg = join(dir, `${base}-opt.jpg`);

  try {
    const inputStat = await stat(inputPath);
    const inputKB = Math.round(inputStat.size / 1024);

    // Create WebP version
    const webpResult = await sharp(inputPath)
      .resize({ width: imgConfig.maxWidth, withoutEnlargement: true })
      .webp({ quality: imgConfig.quality, effort: 6 })
      .toFile(outputWebP);

    const webpKB = Math.round(webpResult.size / 1024);
    const savings = Math.round((1 - webpResult.size / inputStat.size) * 100);

    console.log(`✅ ${imgConfig.src}: ${inputKB}KB → ${webpKB}KB WebP (${savings}% smaller)`);

  } catch (err) {
    console.error(`❌ Error processing ${imgConfig.src}:`, err.message);
  }
}

async function optimizeEventImages() {
  const eventsDir = join(IMAGES_DIR, 'Events');
  if (!existsSync(eventsDir)) {
    console.log('⏭  Events directory not found');
    return;
  }

  const files = await readdir(eventsDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  for (const file of imageFiles) {
    const inputPath = join(eventsDir, file);
    const base = basename(file, extname(file));
    const outputWebP = join(eventsDir, `${base}.webp`);

    try {
      const inputStat = await stat(inputPath);
      const inputKB = Math.round(inputStat.size / 1024);

      const webpResult = await sharp(inputPath)
        .resize({ width: THUMBNAIL_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: GENERAL_QUALITY, effort: 6 })
        .toFile(outputWebP);

      const webpKB = Math.round(webpResult.size / 1024);
      const savings = Math.round((1 - webpResult.size / inputStat.size) * 100);
      console.log(`✅ Events/${file}: ${inputKB}KB → ${webpKB}KB WebP (${savings}% smaller)`);
    } catch (err) {
      console.error(`❌ Error processing Events/${file}:`, err.message);
    }
  }
}

// Also optimize the Memories folder images  
async function optimizeMemoriesImages() {
  const memoriesDir = join(PUBLIC_DIR, 'Memories');
  if (!existsSync(memoriesDir)) {
    console.log('⏭  Memories directory not found');
    return;
  }

  const files = await readdir(memoriesDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  for (const file of imageFiles) {
    const inputPath = join(memoriesDir, file);
    const base = basename(file, extname(file));
    const outputWebP = join(memoriesDir, `${base}.webp`);

    // Skip if WebP already exists
    if (existsSync(outputWebP)) {
      continue; 
    }

    try {
      const inputStat = await stat(inputPath);
      const inputKB = Math.round(inputStat.size / 1024);

      const webpResult = await sharp(inputPath)
        .resize({ width: THUMBNAIL_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: GENERAL_QUALITY, effort: 6 })
        .toFile(outputWebP);

      const webpKB = Math.round(webpResult.size / 1024);
      const savings = Math.round((1 - webpResult.size / inputStat.size) * 100);
      console.log(`✅ Memories/${file}: ${inputKB}KB → ${webpKB}KB WebP (${savings}% smaller)`);
    } catch (err) {
      console.error(`❌ Error processing Memories/${file}:`, err.message);
    }
  }
}

async function main() {
  console.log('🖼  Starting image optimization...\n');
  console.log('=== Homepage Images ===');

  for (const img of homePageImages) {
    await optimizeImage(img);
  }

  console.log('\n=== Event Images ===');
  await optimizeEventImages();

  console.log('\n=== Memories Images ===');
  await optimizeMemoriesImages();

  console.log('\n🎉 Optimization complete!');
}

main();
