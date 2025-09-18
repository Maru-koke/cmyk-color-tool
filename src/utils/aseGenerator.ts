export function createASE(colors: { name: string; c: number; m: number; y: number; k: number }[]) {
  const encoder = new TextEncoder();
  const header = new Uint8Array([
    0x41, 0x53, 0x45, 0x46, // "ASEF"
    0x00, 0x01, 0x00, 0x00, // バージョン 1.0
    (colors.length >> 8) & 0xff, colors.length & 0xff, 0x00, 0x00, // スウォッチ数
  ]);
  let body: number[] = [];
  colors.forEach(({ name, c, m, y, k }) => {
    // 🔹 名前を UTF-16 BE (ビッグエンディアン) でエンコード
    const nameBytes = encodeUTF16BE(name + "\0");
    const nameLength = nameBytes.length / 2;
    const swatchHeader = [
      0x00, 0x01, // スウォッチ識別子
      (nameLength >> 8) & 0xff, nameLength & 0xff, // 名前のバイト長
      ...nameBytes, // 名前（UTF-16 BE + NULL終端）
    ];
    const colorMode = [0x43, 0x4D, 0x59, 0x4B]; // 正しい "CMYK" の ASCII バイナリ
    const cmykValues = [
      ...float32ToBytes(c / 100),
      ...float32ToBytes(m / 100),
      ...float32ToBytes(y / 100),
      ...float32ToBytes(k / 100),
    ];
    const endMarker = [0x00, 0x00];
    body.push(...swatchHeader, ...colorMode, ...cmykValues, ...endMarker);
  });
  return new Uint8Array([...header, ...body]);
}

// 🔹 UTF-16 BE に変換する関数
function encodeUTF16BE(str: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // UTF-16 BE: 上位バイト、下位バイトの順
    result.push((code >> 8) & 0xFF); // 上位バイト
    result.push(code & 0xFF);        // 下位バイト
  }
  return result;
}

// 🔹 float32 (ビッグエンディアン) に変換する関数
function float32ToBytes(value: number): number[] {
  const buffer = new ArrayBuffer(4);
  new DataView(buffer).setFloat32(0, value, false); // ビッグエンディアン
  return Array.from(new Uint8Array(buffer));
}