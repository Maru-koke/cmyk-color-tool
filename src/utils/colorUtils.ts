export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

/**
 * JapanColor に基づく CMYK → RGB 変換（C, M, Y, K を補正）
 */
export function cmykToRgb(cmyk: CMYK): RGB {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;

  // C100% を (0, 159, 232)、M100% を (230, 0, 130)、Y100% を (255, 241, 0)、K100% を (34, 23, 20) に調整
  const r = Math.round(
    0 * c * (1 - k) + 230 * m * (1 - k) + 255 * y * (1 - k) + 34 * k + 255 * (1 - c - m - y) * (1 - k)
  );
  const g = Math.round(
    159 * c * (1 - k) + 0 * m * (1 - k) + 241 * y * (1 - k) + 23 * k + 255 * (1 - c - m - y) * (1 - k)
  );
  const b = Math.round(
    232 * c * (1 - k) + 130 * m * (1 - k) + 0 * y * (1 - k) + 20 * k + 255 * (1 - c - m - y) * (1 - k)
  );

  return { r, g, b };
}

/**
 * JapanColor に基づいた CMYK を CSS 用の色に変換
 */
export function cmykToCssColor(cmyk: CMYK): string {
  const { r, g, b } = cmykToRgb(cmyk);
  return `rgb(${r},${g},${b})`;
}

/**
 * プロタノピア (P型: 赤色盲) の変換
 */
export const simulateProtanopia = (rgb: RGB): RGB => {
  const { r, g, b } = rgb;
  return {
    r: 0.56667 * r + 0.43333 * g + 0 * b,
    g: 0.55833 * r + 0.44167 * g + 0 * b,
    b: 0 * r + 0.24167 * g + 0.75833 * b,
  };
};

/**
 * デュートラノピア (D型: 緑色盲) の変換
 */
export const simulateDeuteranopia = (rgb: RGB): RGB => {
  const { r, g, b } = rgb;
  return {
    r: 0.625 * r + 0.375 * g + 0 * b,
    g: 0.7 * r + 0.3 * g + 0 * b,
    b: 0 * r + 0.3 * g + 0.7 * b,
  };
};

/**
 * 高齢者視覚シミュレーション
 * - ぼやけを再現
 * - 青色の感度低下を再現
 * - コントラストを弱める
 */
export const simulateAgingVision = (rgb: RGB): RGB => {
  const { r, g, b } = rgb;

  const newR = r * 0.9 + g * 0.1;
  const newG = g * 0.95 + b * 0.05;
  const newB = b * 0.6 + g * 0.4;

  return {
    r: Math.min(255, newR),
    g: Math.min(255, newG),
    b: Math.min(255, newB),
  };
};

/**
 * RGB 値を整数に変換
 */
export const roundRgb = (rgb: RGB): RGB => ({
  r: Math.round(rgb.r),
  g: Math.round(rgb.g),
  b: Math.round(rgb.b),
});
