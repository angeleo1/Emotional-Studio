const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 회전된 이미지를 찾아서 수정하는 함수
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
        
        try {
          // 이미지 메타데이터 확인
          const metadata = await sharp(filePath).metadata();
          console.log(`${file}: ${metadata.width}x${metadata.height}`);
          
          // 가로가 세로보다 작으면 회전된 것으로 간주하고 90도 반시계방향으로 회전
          if (metadata.width < metadata.height) {
            console.log(`Rotating ${file}...`);
            await sharp(filePath)
              .rotate(270) // 90도 반시계방향 회전
              .webp({ quality: 80 })
              .toFile(filePath + '.rotated');
            
            // 원본 파일을 회전된 파일로 교체
            fs.unlinkSync(filePath);
            fs.renameSync(filePath + '.rotated', filePath);
            console.log(`✅ Rotated ${file}`);
          } else {
            console.log(`✓ ${file} is already in correct orientation`);
          }
        } catch (error) {
          console.error(`Error processing ${file}:`, error.message);
        }
      }

      console.log(`✅ Completed ${folder} folder`);
    } catch (error) {
      console.error(`Error processing ${folder} folder:`, error);
    }
  }

  console.log('\n🎉 All images processed!');
}

// aboutus2.jpg 특별 처리
async function fixAboutUsImage() {
  const aboutUsPath = path.join(process.cwd(), 'public', 'images', 'Gallery', 'STUDIO', 'aboutus2.jpg');
  const aboutUsOptimizedPath = path.join(process.cwd(), 'public', 'images', 'Gallery', 'STUDIO', 'optimized', 'aboutus2.webp');
  
  if (fs.existsSync(aboutUsPath)) {
    console.log('\n=== Fixing aboutus2.jpg rotation ===');
    try {
      const metadata = await sharp(aboutUsPath).metadata();
      console.log(`aboutus2.jpg: ${metadata.width}x${metadata.height}`);
      
      // 가로가 세로보다 작으면 회전된 것으로 간주
      if (metadata.width < metadata.height) {
        console.log('Rotating aboutus2.jpg...');
        await sharp(aboutUsPath)
          .rotate(270) // 90도 반시계방향 회전
          .webp({ quality: 80 })
          .toFile(aboutUsOptimizedPath);
        console.log('✅ aboutus2.jpg rotation fixed');
      } else {
        // 정상 방향이면 그냥 변환
        await sharp(aboutUsPath)
          .webp({ quality: 80 })
          .toFile(aboutUsOptimizedPath);
        console.log('✅ aboutus2.jpg converted (no rotation needed)');
      }
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
