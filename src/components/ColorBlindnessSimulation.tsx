import { RGB, simulateProtanopia, simulateDeuteranopia, simulateTritanopia, roundRgb } from "@/utils/colorBlindness";
import { cmykToRgb, cmykToCssColor } from "@/utils/colorUtils";

export default function ColorBlindnessSimulation({ colors }: { colors: any[] }) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">色覚シミュレーション</h3>

      {/* ラベル行（見出し） */}
      <div className="grid grid-cols-7 gap-4 text-center font-semibold">
        <div className="w-24"></div> {/* 空白セル（見本名用） */}
        {["Color 1", "Color 2", "Color 3", "Color 4", "Color 5", "Color 6"].map((label, index) => (
          <div key={index} className="w-24 flex justify-center">{label}</div>
        ))}
      </div>

      {/* 元の色 */}
      <div className="grid grid-cols-7 gap-4 mt-2 items-center">
        <div className="text-center font-semibold w-24">元の色</div>
        {colors.map((cmyk, index) => (
          <div key={index} className="w-24 flex justify-center">
            <div
              className="w-24 h-16 rounded border"
              style={{ backgroundColor: cmykToCssColor(cmyk) }}
            ></div>
          </div>
        ))}
      </div>

      {/* D型（デュートラノピア） */}
      <div className="grid grid-cols-7 gap-4 mt-2 items-center">
        <div className="text-center font-semibold w-24">D型</div>
        {colors.map((cmyk, index) => {
          const dRgb = roundRgb(simulateDeuteranopia(cmykToRgb(cmyk)));
          return (
            <div key={index} className="w-24 flex justify-center">
              <div
                className="w-24 h-16 rounded border"
                style={{ backgroundColor: `rgb(${dRgb.r},${dRgb.g},${dRgb.b})` }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* P型（プロタノピア） */}
      <div className="grid grid-cols-7 gap-4 mt-2 items-center">
        <div className="text-center font-semibold w-24">P型</div>
        {colors.map((cmyk, index) => {
          const pRgb = roundRgb(simulateProtanopia(cmykToRgb(cmyk)));
          return (
            <div key={index} className="w-24 flex justify-center">
              <div
                className="w-24 h-16 rounded border"
                style={{ backgroundColor: `rgb(${pRgb.r},${pRgb.g},${pRgb.b})` }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* 高齢者（白内障シミュレーション） */}
      <div className="grid grid-cols-7 gap-4 mt-2 items-center">
        <div className="text-center font-semibold w-24">高齢者</div>
        {colors.map((cmyk, index) => {
          const tRgb = roundRgb(simulateTritanopia(cmykToRgb(cmyk)));
          return (
            <div key={index} className="w-24 flex justify-center">
              <div
                className="w-24 h-16 rounded border"
                style={{ backgroundColor: `rgb(${tRgb.r},${tRgb.g},${tRgb.b})` }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
