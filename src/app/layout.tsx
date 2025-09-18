import "./globals.css";

export const metadata = {
  title: "CMYK Color Tool",
  description: "CMYKアクセシビリティツール",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
