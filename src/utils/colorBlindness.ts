export type RGB = { r: number; g: number; b: number };

// 行列変換関数
const applyMatrix = (rgb: RGB, matrix: number[][]): RGB => {
  const { r, g, b } = rgb;
  return {
    r: matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b,
    g: matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b,
    b: matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b,
  };
};

// プロタノピア (P型: 赤色盲) の変換（修正）
export const simulateProtanopia = (rgb: RGB): RGB => {
  const protanopiaMatrix = [
    [0.152, 1.053, -0.204],
    [0.115, 0.786, 0.099],
    [-0.004, -0.048, 1.052],
  ];
  return applyMatrix(rgb, protanopiaMatrix);
};

// デュートラノピア (D型: 緑色盲) の変換（修正）
export const simulateDeuteranopia = (rgb: RGB): RGB => {
  const deuteranopiaMatrix = [
    [0.367, 0.860, -0.227],
    [0.280, 0.673, 0.047],
    [-0.011, 0.042, 0.969],
  ];
  return applyMatrix(rgb, deuteranopiaMatrix);
};

// トリタノピア (T型: 青色盲) の変換（修正）
export const simulateTritanopia = (rgb: RGB): RGB => {
  const tritanopiaMatrix = [
    [1.000, 0.091, -0.091],
    [0.000, 0.733, 0.267],
    [0.000, 0.183, 0.817],
  ];
  return applyMatrix(rgb, tritanopiaMatrix);
};

// RGB 値を整数に丸める
export const roundRgb = (rgb: RGB): RGB => ({
  r: Math.max(0, Math.min(255, Math.round(rgb.r))),
  g: Math.max(0, Math.min(255, Math.round(rgb.g))),
  b: Math.max(0, Math.min(255, Math.round(rgb.b))),
});
