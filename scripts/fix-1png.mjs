import sharp from 'sharp';
// Create 1-png.webp from 1.png to avoid conflict with 1.webp (from 1.jpg)
const r = await sharp('d:/globalgourmet/public/images/1.png')
  .resize({width:1200,withoutEnlargement:true})
  .webp({quality:72,effort:6})
  .toFile('d:/globalgourmet/public/images/1-png.webp');
console.log('Done:', Math.round(r.size/1024)+'KB');
