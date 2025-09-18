export type RGB = { r: number; g: number; b: number };

// 色覚特性に応じた変換行列
const colorBlindnessMatrices = {
  protanopia: [
    [0.567, 0.433, 0.0],
    [0.558, 0.442, 0.0],
    [0.0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0.0],
    [0.7, 0.3, 0.0],
    [0.0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0.0],
    [0.0, 0.433, 0.567],
    [0.0, 0.475, 0.525],
  ],
};

// RGB値を変換
const applyColorBlindnessMatrix = (rgb: RGB, matrix: number[][]): RGB => {
  return {
    r: rgb.r * matrix[0][0] + rgb.g * matrix[0][1] + rgb.b * matrix[0][2],
    g: rgb.r * matrix[1][0] + rgb.g * matrix[1][1] + rgb.b * matrix[1][2],
    b: rgb.r * matrix[2][0] + rgb.g * matrix[2][1] + rgb.b * matrix[2][2],
  };
};

// 色覚異常ごとの変換関数
export const simulateProtanopia = (rgb: RGB) => applyColorBlindnessMatrix(rgb, colorBlindnessMatrices.protanopia);
export const simulateDeuteranopia = (rgb: RGB) => applyColorBlindnessMatrix(rgb, colorBlindnessMatrices.deuteranopia);
export const simulateTritanopia = (rgb: RGB) => applyColorBlindnessMatrix(rgb, colorBlindnessMatrices.tritanopia);
