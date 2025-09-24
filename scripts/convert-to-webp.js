const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Customer Album 폴더의 이미지들을 WebP로 변환
const sourceDir = path.join(process.cwd(), 'public', 'images', 'Gallery', 'Customer Album');
const targetDir = path.join(sourceDir, 'optimized');

// targetDir이 존재하지 않으면 생성
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 이미지 파일 확장자
const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// 소스 디렉토리의 모든 파일 읽기
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // 이미지 파일만 필터링
  const imageFiles = files.filter(file => {
    const ext = path.extname(file);
    return imageExtensions.includes(ext);
  });

  console.log(`Found ${imageFiles.length} image files to convert`);

  // 각 이미지 파일을 WebP로 변환
  imageFiles.forEach((file, index) => {
    const sourcePath = path.join(sourceDir, file);
    const fileName = path.parse(file).name;
    const targetPath = path.join(targetDir, `${fileName}.webp`);

    // sharp를 사용하여 WebP로 변환
    const command = `npx sharp-cli -i "${sourcePath}" -o "${targetPath}" -f webp -q 80`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting ${file}:`, error);
        return;
      }
      console.log(`Converted: ${file} -> ${fileName}.webp`);
      
      // 마지막 파일이면 완료 메시지
      if (index === imageFiles.length - 1) {
        console.log('All images converted successfully!');
      }
    });
  });
});
