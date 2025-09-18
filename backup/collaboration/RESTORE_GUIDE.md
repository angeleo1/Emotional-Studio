# 콜라보레이션 페이지 복원 가이드

## 백업된 파일들
- `collaboration.tsx` - 데스크톱 콜라보레이션 페이지
- `mobile-collaboration.tsx` - 모바일 콜라보레이션 페이지  
- `CollaborationGallery.tsx` - 홈페이지 콜라보레이션 갤러리 컴포넌트

## 복원 방법

### 1. 페이지 파일 복원
```bash
# 데스크톱 페이지 복원
copy "backup\collaboration\collaboration.tsx" "pages\collaboration.tsx"

# 모바일 페이지 복원
copy "backup\collaboration\mobile-collaboration.tsx" "pages\mobile-collaboration.tsx"

# 홈페이지 컴포넌트 복원
copy "backup\collaboration\CollaborationGallery.tsx" "components\homepage\CollaborationGallery.tsx"
```

### 2. 네비게이션 링크 복원
다음 파일들에서 콜라보레이션 링크를 다시 추가해야 합니다:
- `components/layout/Layout.tsx` (데스크톱 네비게이션)
- `components/MobileNavbar.tsx` (모바일 네비게이션)
- `components/IntroAnimation.tsx` (홈페이지 버튼)

### 3. 홈페이지 섹션 복원
`pages/index.tsx`에서 CollaborationGallery 컴포넌트를 다시 import하고 사용해야 합니다.

## 제거된 시점
- 제거일: 2025-09-18
- 제거 이유: 일단 사용하지 않기로 결정

## 주의사항
- ChromeGrid 컴포넌트는 `components/ui/chrome-grid.tsx`에 그대로 남아있습니다.
- glitch.module.css 스타일도 그대로 남아있습니다.
- 복원 시 의존성 확인이 필요할 수 있습니다.
