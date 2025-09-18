import { CMYK, cmykToCssColor } from "@/utils/colorUtils";

interface ColorSwatchesProps {
  colors: CMYK[];
}

export default function ColorSwatches({ colors }: ColorSwatchesProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {colors.map((color, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border shadow-md text-center"
          style={{ backgroundColor: cmykToCssColor(color) }}
        >
          <p className="text-white font-bold">Color {index + 1}</p>
          <p className="text-xs text-white">
            C: {color.c} M: {color.m} Y: {color.y} K: {color.k}
          </p>
        </div>
      ))}
    </div>
  );
}
