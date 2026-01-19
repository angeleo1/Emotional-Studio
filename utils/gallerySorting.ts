// 이미지 파일 확장자
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// 클라이언트 사이드에서 사용 가능한 정렬 함수
// 실제 파일 생성 시간은 서버에서만 확인 가능하므로, 
// 클라이언트에서는 원래 순서를 유지하거나 파일명 기준으로 정렬합니다.

// 파일명에서 숫자를 추출하여 정렬하는 함수 (예: image_001.jpg, image_002.jpg)
// 배열의 원래 순서를 유지합니다 (이미 최신순으로 정렬되어 있음)
export function sortImagesByCreationTime(imagePaths: string[]): string[] {
  // 배열의 원래 순서를 유지 (이미 최신순으로 정렬되어 있음)
  return [...imagePaths];
}

// 파일 경로에서 숫자 추출
function extractNumber(filePath: string): number | null {
  const fileName = filePath.split('/').pop() || '';
  const match = fileName.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// 갤러리 이미지 객체를 정렬하는 함수
export function sortGalleryImagesByCreationTime(galleryImages: Record<string, string[]>): Record<string, string[]> {
  const sortedGallery: Record<string, string[]> = {};
  
  for (const [category, images] of Object.entries(galleryImages)) {
    sortedGallery[category] = sortImagesByCreationTime(images);
  }
  
  return sortedGallery;
}

// All 탭용 이미지 배열을 정렬하는 함수
export function sortAllImagesByCreationTime(allImages: string[]): string[] {
  return sortImagesByCreationTime(allImages);
}
