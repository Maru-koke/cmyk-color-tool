"use client";
import { useState } from "react";
import { CMYK, cmykToCssColor } from "@/utils/colorUtils";

export default function ColorPicker({
  label,
  colorIndex,
  colors,
  setColors,
}: {
  label: string;
  colorIndex: number;
  colors: CMYK[];
  setColors: (colors: CMYK[]) => void;
}) {
  const color = colors[colorIndex];

  const handleChange = (channel: keyof CMYK, value: number) => {
    const newColors = [...colors];
    newColors[colorIndex] = { ...color, [channel]: value };
    setColors(newColors);
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border w-full">
      <div
        className="w-16 h-16 rounded border"
        style={{ backgroundColor: cmykToCssColor(color) }}
      ></div>
      <p className="text-sm font-semibold mt-2">{label}</p>

      <div className="w-full space-y-3 mt-3">
        {(["c", "m", "y", "k"] as (keyof CMYK)[]).map((channel) => (
          <div key={channel} className="flex items-center w-full">
            {/* ラベルを左側に配置 */}
            <label className="text-xs font-medium w-6 text-right">{channel.toUpperCase()}</label>
            <div className="flex items-center gap-2 w-full ml-2">
              {/* スライダー */}
              <input
                type="range"
                min={0}
                max={100}
                value={color[channel]}
                onChange={(e) => handleChange(channel, Number(e.target.value))}
                className="w-full"
              />
              {/* 数値入力 */}
              <input
                type="number"
                min={0}
                max={100}
                value={color[channel]}
                onChange={(e) => handleChange(channel, Number(e.target.value))}
                className="w-14 p-1 border rounded text-center text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
