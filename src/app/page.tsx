"use client";
import ColorPicker from "@/components/ColorPicker";
import ColorBlindnessSimulation from "@/components/ColorBlindnessSimulation";
import ColorWarnings from "@/components/ColorWarnings";
import SwatchDownload from "@/components/SwatchDownload";
import { useState } from "react";
import { CMYK } from "@/utils/colorUtils";

export default function Home() {
  // 初期値をすべて 0 に設定
  const initialColors: CMYK[] = Array(6).fill({ c: 0, m: 0, y: 0, k: 0 });

  const [colors, setColors] = useState(initialColors);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">CMYK アクセシビリティツール</h1>
        
        {/* カラーピッカー */}
        <div className="grid grid-cols-3 gap-6">
          {colors.map((_, index) => (
            <ColorPicker
              key={index}
              label={`Color ${index + 1}`}
              colorIndex={index}
              colors={colors}
              setColors={setColors}
            />
          ))}
        </div>

        {/* 警告表示 */}
        <ColorWarnings colors={colors} />

        {/* 色覚シミュレーション */}
        <ColorBlindnessSimulation colors={colors} />

        {/* スウォッチダウンロード */}
        <div className="flex justify-center">
          <SwatchDownload colors={colors} />
        </div>
      </div>
    </div>
  );
}
