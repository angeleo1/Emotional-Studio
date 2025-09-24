const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 회전된 이미지들을 찾아서 수정하는 함수
async function fixRotatedImages() {
  const galleryFolders = [
    'BW',
    'COOL', 
    'WARM',
    'STUDIO',
    'Customer Album'
  ];

  for (const folder of galleryFolders) {
    const sourceDir = path.join(process.cwd(), 'public', 'images', 'Gallery', folder);
    const targetDir = path.join(sourceDir, 'optimized');

    console.log(`\n=== Checking ${folder} folder for rotated images ===`);

    if (!fs.existsSync(targetDir)) {
      console.log(`Optimized folder not found for ${folder}`);
      continue;
    }

    try {
      const files = fs.readdirSync(targetDir);
      const webpFiles = files.filter(file => file.endsWith('.webp'));

      console.log(`Found ${webpFiles.length} WebP files in ${folder}`);

      for (const file of webpFiles) {
        const filePath = path.join(targetDir, file);
        
        // 이미지 회전 정보를 확인하고 수정
        const command = `npx sharp-cli -i "${filePath}" -o "${filePath}" -f webp -q 80 --rotate 0`;
        
        await new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error processing ${file}:`, error);
              reject(error);
              return;
            }
            console.log(`Processed: ${file}`);
            resolve();
          });
        });
      }

      console.log(`✅ Completed ${folder} folder`);
    } catch (error) {
      console.error(`Error processing ${folder} folder:`, error);
    }
  }

  console.log('\n🎉 All images processed!');
}

// 특정 이미지를 90도 반시계방향으로 회전시키는 함수 (원본 방향으로 복원)
async function rotateImageCounterClockwise(inputPath, outputPath) {
  const command = `npx sharp-cli -i "${inputPath}" -o "${outputPath}" -f webp -q 80 --rotate 270`;
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error rotating image:`, error);
        reject(error);
        return;
      }
      console.log(`Rotated image: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
      resolve();
    });
  });
}

// aboutus2.jpg가 회전되어 있다면 수정
async function fixAboutUsImage() {
  const aboutUsPath = path.join(process.cwd(), 'public', 'images', 'Gallery', 'STUDIO', 'aboutus2.jpg');
  const aboutUsOptimizedPath = path.join(process.cwd(), 'public', 'images', 'Gallery', 'STUDIO', 'optimized', 'aboutus2.webp');
  
  if (fs.existsSync(aboutUsPath)) {
    console.log('\n=== Fixing aboutus2.jpg rotation ===');
    try {
      // 원본을 90도 반시계방향으로 회전하여 WebP로 변환
      await rotateImageCounterClockwise(aboutUsPath, aboutUsOptimizedPath);
      console.log('✅ aboutus2.jpg rotation fixed');
    } catch (error) {
      console.error('Error fixing aboutus2.jpg:', error);
    }
  }
}

// 메인 실행
async function main() {
  console.log('Starting image rotation fix...');
  
  // aboutus2.jpg 회전 수정
  await fixAboutUsImage();
  
  // 모든 이미지 처리
  await fixRotatedImages();
}

main().catch(console.error);
