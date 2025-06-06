import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

// RGB를 HSL로 변환
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// HSL을 RGB로 변환
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (h >= 300 && h < 360) {
    [r, g, b] = [c, 0, x];
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
};

// 정확한 보색 계산
const getComplementaryColor = (r: number, g: number, b: number): string => {
  // RGB를 HSL로 변환
  const [h, s, l] = rgbToHsl(r, g, b);
  
  // 보색 계산 (색상환에서 180도 회전)
  const complementaryH = (h + 180) % 360;
  
  // HSL을 다시 RGB로 변환
  const [compR, compG, compB] = hslToRgb(complementaryH, s, l);
  
  return `rgb(${compR}, ${compG}, ${compB})`;
};

export const getColorAtPosition = async (x: number, y: number): Promise<string> => {
  try {
    // 화면 캡처
    const canvas = await html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      scale: 1
    });

    // 캔버스 컨텍스트 가져오기
    const ctx = canvas.getContext('2d');
    if (!ctx) return '#ffffff';

    // 특정 위치의 픽셀 데이터 가져오기
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  } catch (error) {
    console.error('Error capturing screen:', error);
    return '#ffffff';
  }
};

export const calculateInverseColor = (color: string): string => {
  const [r, g, b] = color.match(/\d+/g)?.map(Number) || [255, 255, 255];
  return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
}; 