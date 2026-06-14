import { jsPDF } from "jspdf";
import QRCode from "qrcode";
// 1. Import your logo
import logo from '../assets/bnwLogo.png';  

export const generateLabelsPDF = async (labelNumbers) => {
  // 2. Pre-load the logo image so jsPDF can use it inside the loop
  const logoImg = new Image();
  logoImg.src = logo;
  await new Promise((resolve) => {
    logoImg.onload = resolve;
    logoImg.onerror = resolve; 
  });

  const doc = new jsPDF({
    orientation: "landscape", 
    unit: "mm",
    format: [100, 25] 
  });

  const qrsPerPage = 4;      
  
  const startX = 2;          
  const stickerWidth = 22.5; 
  const gapX = 1.5;          
  
  const qrSize = 14; 
  const qrOffset = (stickerWidth - qrSize) / 2; 

  for (let i = 0; i < labelNumbers.length; i++) {
    const label = labelNumbers[i];
    const verifyUrl = `${import.meta.env.VITE_FRONTEND_URL}/verify/${label}`;

    if (i > 0 && i % qrsPerPage === 0) {
      doc.addPage([100, 25], "landscape");
    }

    const col = i % qrsPerPage;
    const currentX = startX + (col * (stickerWidth + gapX));
    const currentY = 0;

    try {
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, { 
        width: 120,  
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' },
        // 3. CRITICAL FIX: Set error correction to High (allows 30% of QR to be covered)
        errorCorrectionLevel: 'H' 
      });

      // Draw the QR Code
      doc.addImage(qrDataUrl, "PNG", currentX + qrOffset, currentY + 3.0, qrSize, qrSize);

      // 4. Calculate exact center for the logo
      const logoSize = 3.5; // About 25% of the QR code size
      const logoX = currentX + qrOffset + (qrSize / 2) - (logoSize / 2);
      const logoY = currentY + 3.0 + (qrSize / 2) - (logoSize / 2);

      // 5. Draw a tiny white square behind the logo so it stands out and scans easily
      doc.setFillColor(255, 255, 255);
      doc.rect(logoX - 0.2, logoY - 0.2, logoSize + 0.4, logoSize + 0.4, 'F');

      // 6. Draw the logo exactly in the center 
      doc.addImage(logoImg, "PNG", logoX, logoY, logoSize, logoSize, 'SVSLogo', 'FAST');

      // Draw the label text
      doc.setFontSize(5.5);
      doc.text(label, currentX + (stickerWidth / 2), currentY + 22.0, { align: "center" });

      if (i % 50 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1));
      }

    } catch (err) {
      console.error("Error generating QR:", label, err);
    }
  }

  // --- MANUAL BLOB DOWNLOAD ---
  try {
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = "Thermal_100x25_Labels.pdf";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to force download:", error);
    alert("The PDF was generated, but your browser blocked the massive download. Try generating 1,000 labels at a time.");
  }
};