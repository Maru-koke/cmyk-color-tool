import { CMYK, cmykToRgb } from "@/utils/colorUtils";
import { simulateProtanopia, simulateDeuteranopia, simulateTritanopia, roundRgb } from "@/utils/colorBlindness";

interface ColorWarningsProps {
  colors: CMYK[];
}

export default function ColorWarnings({ colors }: ColorWarningsProps) {
  const isValidColor = (color: CMYK) => !(color.c === 0 && color.m === 0 && color.y === 0 && color.k === 0);

  const colorDifference = (rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }) => {
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  };

  const indistinguishablePairs = colors
    .map((color, i) =>
      colors.slice(i + 1).map((otherColor, j) => {
        if (!isValidColor(color) || !isValidColor(otherColor)) return null;

        const cDiff = Math.abs(color.c - otherColor.c);
        const mDiff = Math.abs(color.m - otherColor.m);
        const yDiff = Math.abs(color.y - otherColor.y);
        const kDiff = Math.abs(color.k - otherColor.k);

        const isCMOnly = (col: CMYK) => col.y === 0 && col.k === 0;
        if (isCMOnly(color) && isCMOnly(otherColor)) {
          const cmSumDiff = Math.abs((color.c + color.m) - (otherColor.c + otherColor.m));
          if (cmSumDiff < 40) {
            return `Color ${i + 1} と Color ${j + i + 2} は見分けにくい`;
          }
        }

        const isY100 = (col: CMYK) => col.y === 100;
        if (isY100(color) && isY100(otherColor)) {
          const cmSumDiff = Math.abs((color.c + color.m) - (otherColor.c + otherColor.m));
          if (cmSumDiff < 40) {
            return `Color ${i + 1} と Color ${j + i + 2} は見分けにくい`;
          }
        }

        const isSimilarCMYK =
          cDiff < 15 && mDiff < 15 && yDiff < 15 && kDiff < 15;

        if (isSimilarCMYK) {
          return `Color ${i + 1} と Color ${j + i + 2} は見分けにくい`;
        }

        const originalRgb1 = cmykToRgb(color);
        const originalRgb2 = cmykToRgb(otherColor);

        const dRgb1 = roundRgb(simulateDeuteranopia(originalRgb1));
        const dRgb2 = roundRgb(simulateDeuteranopia(originalRgb2));
        const pRgb1 = roundRgb(simulateProtanopia(originalRgb1));
        const pRgb2 = roundRgb(simulateProtanopia(originalRgb2));
        const tRgb1 = roundRgb(simulateTritanopia(originalRgb1));
        const tRgb2 = roundRgb(simulateTritanopia(originalRgb2));

        const diffD = colorDifference(dRgb1, dRgb2);
        const diffP = colorDifference(pRgb1, pRgb2);
        const diffT = colorDifference(tRgb1, tRgb2);

        if (diffD < 40 || diffP < 40 || diffT < 40) {
          return `Color ${i + 1} と Color ${j + i + 2} は見分けにくい`;
        }

        return null;
      })
    )
    .flat()
    .filter(Boolean);

  const hasWarning = indistinguishablePairs.length > 0;
  const bgColor = hasWarning ? "bg-red-500 text-white" : "bg-teal-200 text-gray-900";

  return (
    <div className={`p-4 rounded-lg ${bgColor}`}>
      {hasWarning ? (
        <>
          <p className="font-bold">⚠️ 見分けにくい色があります！</p>
          <ul className="list-disc pl-5">
            {indistinguishablePairs.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="font-bold">✅ すべての色は区別しやすいです。</p>
      )}
    </div>
  );
}
