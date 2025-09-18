import { RGB } from "./colorBlindness";

// RGBをLab色空間に変換する関数
const rgbToLab = (rgb: RGB) => {
  let { r, g, b } = rgb;

  // 変換のために [0,1] の範囲に正規化
  r /= 255;
  g /= 255;
  b /= 255;

  // RGB から XYZ へ変換
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  const X = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const Z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  // XYZ から Lab へ変換
  const ref_X = 95.047;
  const ref_Y = 100.000;
  const ref_Z = 108.883;

  let x = X / ref_X;
  let y = Y / ref_Y;
  let z = Z / ref_Z;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

  const L = (116 * y) - 16;
  const A = 500 * (x - y);
  const B = 200 * (y - z);

  return { L, A, B };
};

// CIE76（ΔE）を計算
export const colorDifference = (rgb1: RGB, rgb2: RGB): number => {
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);

  return Math.sqrt(
    Math.pow(lab1.L - lab2.L, 2) +
    Math.pow(lab1.A - lab2.A, 2) +
    Math.pow(lab1.B - lab2.B, 2)
  );
};
