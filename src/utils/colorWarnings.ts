import { RGB } from "./colorBlindness";
import { colorDifference } from "./colorDifference";

// 色の違いが20未満なら警告
const THRESHOLD = 20;

// 見分けにくい色のペアを検出
export const findSimilarColors = (colors: RGB[]): [number, number][] => {
  const similarPairs: [number, number][] = [];

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      if (colorDifference(colors[i], colors[j]) < THRESHOLD) {
        similarPairs.push([i, j]);
      }
    }
  }

  return similarPairs;
};
