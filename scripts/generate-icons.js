const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];

async function generateIcons() {
  try {
    for (const size of sizes) {
      // Create a simple black square with white text
      const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="black"/>
          <text x="50%" y="50%" font-family="Arial" font-size="${size/4}" fill="white" text-anchor="middle" dominant-baseline="middle">ES</text>
        </svg>
      `;

      await sharp(Buffer.from(svg))
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, `../public/icon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    }
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 