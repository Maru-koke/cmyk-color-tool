export default function SwatchDownload({ colors }: { colors: any[] }) {
  const handleDownload = () => {
    // CSVのヘッダー部分
    let csvContent = "Color,C,M,Y,K\n";

    // 各色のデータを追加
    colors.forEach((color, index) => {
      csvContent += `Color ${index + 1},${color.c},${color.m},${color.y},${color.k}\n`;
    });

    // CSVをBlobとして作成
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // ダウンロード用のリンクを作成
    const a = document.createElement("a");
    a.href = url;
    a.download = "colors.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="px-4 py-2 bg-green-500 text-white rounded-lg">
      📄 CSVを書き出し
    </button>
  );
}
