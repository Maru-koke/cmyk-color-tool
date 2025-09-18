import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ここにESLint無視設定を追加
  eslint: {
    ignoreDuringBuilds: true, // ← これがポイント
  },

  /* 他の設定があればここに書く */
};

export default nextConfig;
