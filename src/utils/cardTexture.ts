export interface CardTextureConfig {
  id: string;
  code: string;
  category: string;
  title: string;
  description: string;
  themeColor: string;
  scanMessage?: string;
}

export function generateCardTexture(config: CardTextureConfig): string {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 728;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 1. Draw Card Background with premium dark matte gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 728);
  bgGrad.addColorStop(0, "#111110");
  bgGrad.addColorStop(1, "#1D1D1C");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 728);

  // 2. Draw outer boundary border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 512 - 3, 728 - 3);

  // 3. Draw premium nested inner fine border inset by 16px
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, 512 - 32, 728 - 32);

  // 4. Draw top category pill / tab accent
  const tabHeight = 12;
  ctx.fillStyle = config.themeColor;
  ctx.fillRect(16, 16, 180, tabHeight);

  // 5. Huge serif watermark code background in center/right
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  ctx.font = "italic bold 280px Georgia, serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(config.code, 470, 320);

  // 6. Draw Category name & ID header
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  
  // Category Label
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
  ctx.fillText(config.category.toUpperCase(), 32, 44);

  // Unique Code Badge at Top-Right
  ctx.textAlign = "right";
  ctx.fillStyle = config.themeColor;
  ctx.font = "bold 14px monospace";
  ctx.fillText(config.id, 480, 44);

  // Divider Line below Header
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(32, 70);
  ctx.lineTo(480, 70);
  ctx.stroke();

  // 7. Large card code label on left side
  ctx.textAlign = "left";
  ctx.fillStyle = config.themeColor;
  ctx.font = "bold 44px system-ui, -apple-system, sans-serif";
  ctx.fillText(config.code, 32, 95);

  // 8. Card Title (wrapped beautifully)
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
  
  // Custom wrapping function for title
  const titleY = wrapText(ctx, config.title, 32, 160, 448, 34);

  // Secondary divider line below title
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(32, titleY + 22);
  ctx.lineTo(480, titleY + 22);
  ctx.stroke();

  // 9. Card Description (wrapped with high-end editorial line height)
  ctx.fillStyle = "#D4D4D2";
  ctx.font = "normal 15px system-ui, -apple-system, sans-serif";
  wrapText(ctx, config.description, 32, titleY + 45, 448, 24);

  // 10. Tactile Bottom Area (Barcode + CardOS Spec)
  const bottomY = 620;
  
  // Separator
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(32, bottomY);
  ctx.lineTo(480, bottomY);
  ctx.stroke();

  // Draw technical fake Barcode at bottom left
  ctx.fillStyle = "#FFFFFF";
  let barcodeX = 32;
  const barcodeY = bottomY + 16;
  const barcodeHeight = 24;
  const barWidths = [3, 1, 4, 1, 2, 5, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 1, 2, 5, 1, 2, 3];
  
  for (let i = 0; i < barWidths.length; i++) {
    const w = barWidths[i];
    if (i % 2 === 0) {
      ctx.fillRect(barcodeX, barcodeY, w, barcodeHeight);
    }
    barcodeX += w + 1;
  }

  // Draw CARDOS SPEC and scan prompt on the right side of the footer
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 9px monospace";
  ctx.fillText("CARDOS SPEC v1.0", 480, bottomY + 24);

  if (config.scanMessage) {
    ctx.fillStyle = config.themeColor;
    ctx.font = "bold 8px system-ui, -apple-system, sans-serif";
    ctx.fillText(config.scanMessage.toUpperCase(), 480, bottomY + 42);
  }

  return canvas.toDataURL("image/png");
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}
