export function simulateColorBlindness(rgb: { r: number; g: number; b: number }, type: string) {
  let { r, g, b } = rgb;

  // シミュレーション用の変換
  switch (type) {
    case "protanopia": // 赤色盲 (赤を弱める)
      r = 0.56667 * r + 0.43333 * g + 0 * b;
      g = 0.55833 * r + 0.44167 * g + 0 * b;
      b = 0 * r + 0.24167 * g + 0.75833 * b;
      break;
      
    case "deuteranopia": // 緑色盲 (緑を弱める)
      r = 0.625 * r + 0.375 * g + 0 * b;
      g = 0.7 * r + 0.3 * g + 0 * b;
      b = 0 * r + 0.3 * g + 0.7 * b;
      break;
      
    case "tritanopia": // 青色盲 (青を弱める)
      r = 0.95 * r + 0.05 * g + 0 * b;
      g = 0 * r + 0.43333 * g + 0.56667 * b;
      b = 0 * r + 0.475 * g + 0.525 * b;
      break;
      
    default:
      break;
  }

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}
