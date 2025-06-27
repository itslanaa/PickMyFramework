import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MADMResult } from '../types';

export async function exportToPDF(
  results: MADMResult[],
  chartElements: HTMLElement[]
): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Fuzzy MADM Framework Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Date
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Executive Summary
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const summary = `This report analyzes ${results.length} web development frameworks using Fuzzy Multi-Attribute Decision Making (MADM) methodology. The analysis considers four key criteria: popularity, community support, maintenance activity, and framework maturity.`;
  
  const summaryLines = pdf.splitTextToSize(summary, pageWidth - 40);
  pdf.text(summaryLines, 20, yPosition);
  yPosition += summaryLines.length * 5 + 10;

  // Top 5 Rankings
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Top 5 Framework Rankings', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const top5 = results.slice(0, 5);
  top5.forEach((result, index) => {
    const rankText = `${result.rank}. ${result.framework.name} (Score: ${result.score.toFixed(3)})`;
    pdf.text(rankText, 25, yPosition);
    yPosition += 6;
    
    const details = `   Stars: ${result.framework.stars.toLocaleString()}, Forks: ${result.framework.forks.toLocaleString()}, Language: ${result.framework.language}`;
    pdf.setFontSize(9);
    pdf.text(details, 25, yPosition);
    pdf.setFontSize(11);
    yPosition += 8;
  });

  // Add new page for charts
  pdf.addPage();
  yPosition = 20;

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Analysis Charts', 20, yPosition);
  yPosition += 15;

  // Capture and add charts
  for (let i = 0; i < chartElements.length; i++) {
    const element = chartElements[i];
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Check if we need a new page
        if (yPosition + imgHeight > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 15;
      } catch (error) {
        console.error('Error capturing chart:', error);
      }
    }
  }

  // Add detailed results table
  pdf.addPage();
  yPosition = 20;

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Detailed Results', 20, yPosition);
  yPosition += 15;

  // Table headers
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Rank', 20, yPosition);
  pdf.text('Framework', 35, yPosition);
  pdf.text('Score', 80, yPosition);
  pdf.text('Stars', 100, yPosition);
  pdf.text('Forks', 120, yPosition);
  pdf.text('Language', 140, yPosition);
  pdf.text('Last Update', 170, yPosition);
  yPosition += 8;

  // Table data
  pdf.setFont('helvetica', 'normal');
  results.forEach((result) => {
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.text(result.rank.toString(), 20, yPosition);
    pdf.text(result.framework.name.substring(0, 15), 35, yPosition);
    pdf.text(result.score.toFixed(3), 80, yPosition);
    pdf.text(result.framework.stars.toLocaleString(), 100, yPosition);
    pdf.text(result.framework.forks.toLocaleString(), 120, yPosition);
    pdf.text(result.framework.language.substring(0, 10), 140, yPosition);
    pdf.text(result.framework.daysSinceUpdate + 'd', 170, yPosition);
    yPosition += 6;
  });

  // Save the PDF
  pdf.save('fuzzy-madm-framework-analysis.pdf');
}