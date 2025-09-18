export function debugASE(aseData: Uint8Array) {
  let hexDump = "";
  for (let i = 0; i < aseData.length; i += 16) {
    hexDump += aseData.slice(i, i + 16).map(b => b.toString(16).padStart(2, "0")).join(" ") + "\n";
  }
  console.log("ASE File Hex Dump:\n" + hexDump);
}
