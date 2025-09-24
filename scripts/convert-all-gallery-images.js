const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 갤러리 폴더들
const galleryFolders = [
  'BW',
  'COOL', 
  'WARM',
  'STUDIO',
  'Customer Album'
];

// 이미지 파일 확장자
const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// 각 갤러리 폴더의 이미지들을 WebP로 변환
async function convertAllGalleryImages() {
  for (const folder of galleryFolders) {
    const sourceDir = path.join(process.cwd(), 'public', 'images', 'Gallery', folder);
    const targetDir = path.join(sourceDir, 'optimized');

    console.log(`\n=== Processing ${folder} folder ===`);

    // targetDir이 존재하지 않으면 생성
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Created optimized folder for ${folder}`);
    }

    // 소스 디렉토리의 모든 파일 읽기
    try {
      const files = fs.readdirSync(sourceDir);
      
      // 이미지 파일만 필터링
      const imageFiles = files.filter(file => {
        const ext = path.extname(file);
        return imageExtensions.includes(ext);
      });

      console.log(`Found ${imageFiles.length} image files in ${folder}`);

      if (imageFiles.length === 0) {
        console.log(`No images found in ${folder} folder`);
        continue;
      }

      // 각 이미지 파일을 WebP로 변환
      for (const file of imageFiles) {
        const sourcePath = path.join(sourceDir, file);
        const fileName = path.parse(file).name;
        const targetPath = path.join(targetDir, `${fileName}.webp`);

        // sharp를 사용하여 WebP로 변환
        const command = `npx sharp-cli -i "${sourcePath}" -o "${targetPath}" -f webp -q 80`;
        
        await new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error converting ${file}:`, error);
              reject(error);
              return;
            }
            console.log(`Converted: ${file} -> ${fileName}.webp`);
            resolve();
          });
        });
      }

      console.log(`✅ Completed ${folder} folder`);
    } catch (error) {
      console.error(`Error processing ${folder} folder:`, error);
    }
  }

  console.log('\n🎉 All gallery images converted successfully!');
}

convertAllGalleryImages().catch(console.error);
