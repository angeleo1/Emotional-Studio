import fs from 'fs';
import path from 'path';

// 이미지 파일 확장자
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// 파일 생성 시간을 기준으로 정렬하는 함수
export function sortImagesByCreationTime(imagePaths: string[]): string[] {
  return imagePaths.sort((a, b) => {
    try {
      // 파일 경로에서 실제 파일 시스템 경로로 변환
      const fullPathA = path.join(process.cwd(), 'public', a);
      const fullPathB = path.join(process.cwd(), 'public', b);
      
      // 파일이 존재하는지 확인
      if (!fs.existsSync(fullPathA) || !fs.existsSync(fullPathB)) {
        return 0;
      }
      
      // 파일 생성 시간 가져오기
      const statsA = fs.statSync(fullPathA);
      const statsB = fs.statSync(fullPathB);
      
      // 최신 파일이 먼저 오도록 정렬 (내림차순)
      return statsB.birthtime.getTime() - statsA.birthtime.getTime();
    } catch (error) {
      console.warn(`Error sorting images: ${error}`);
      return 0;
    }
  });
}

// 폴더 내 모든 이미지 파일을 생성 시간 순으로 가져오는 함수
export function getImagesSortedByCreationTime(folderPath: string): string[] {
  try {
    const fullPath = path.join(process.cwd(), 'public', folderPath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Folder does not exist: ${fullPath}`);
      return [];
    }
    
    const files = fs.readdirSync(fullPath);
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .map(file => `${folderPath}/${file}`);
    
    return sortImagesByCreationTime(imageFiles);
  } catch (error) {
    console.warn(`Error reading folder ${folderPath}: ${error}`);
    return [];
  }
}

// 갤러리 이미지 객체를 생성 시간 순으로 정렬하는 함수
export function sortGalleryImagesByCreationTime(galleryImages: Record<string, string[]>): Record<string, string[]> {
  const sortedGallery: Record<string, string[]> = {};
  
  for (const [category, images] of Object.entries(galleryImages)) {
    sortedGallery[category] = sortImagesByCreationTime(images);
  }
  
  return sortedGallery;
}

// All 탭용 이미지 배열을 생성 시간 순으로 정렬하는 함수
export function sortAllImagesByCreationTime(allImages: string[]): string[] {
  return sortImagesByCreationTime(allImages);
}
