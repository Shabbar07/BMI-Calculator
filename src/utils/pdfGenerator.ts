import { BMIData } from '../types/bmi';

export const generatePDFReport = async (userData: BMIData, result: BMIData): Promise<void> => {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF();


  // Height conversions
  let heightInCm = userData.heightUnit === 'cm' ? userData.heightInput : userData.heightUnit === 'in' ? userData.heightInput * 2.54 : userData.heightInput * 30.48;
  let heightInInches = userData.heightUnit === 'in' ? userData.heightInput : userData.heightUnit === 'cm' ? userData.heightInput / 2.54 : userData.heightInput * 30.48 / 2.54;
  let heightInFeet = userData.heightUnit === 'ft' ? userData.heightInput : userData.heightUnit === 'cm' ? userData.heightInput / 30.48 : userData.heightInput * 2.54 / 30.48;

  // Weight conversions
  let weightInKg = userData.weightUnit === 'kg' ? userData.weightInput : userData.weightUnit === 'lbs' ? userData.weightInput * 0.453592 : userData.weightInput;
  let weightInPounds = userData.weightUnit === 'lbs' ? userData.weightInput : userData.weightUnit === 'kg' ? userData.weightInput / 0.453592 : userData.weightInput;
  let weightInStones = weightInKg / 6.35029;

  const idealMinKg = result.idealWeightMin;
  const idealMaxKg = result.idealWeightMax;
  const idealMinLbs = idealMinKg / 0.453592;
  const idealMaxLbs = idealMaxKg / 0.453592;

  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, 210, 65, 'F');

  // Header Text
  doc.setFontSize(32);
  doc.setTextColor(59, 130, 246);
  doc.text('MyBMI', 105, 28, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('BMI Report - ' + new Date().toLocaleDateString(), 105, 55, { align: 'center' });

  let yPos = 75;

  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text('Personal Information', 20, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Name: ${userData.name}`, 20, yPos);
  yPos += 7;
  doc.text(`Gender: ${userData.gender}`, 20, yPos);
  yPos += 7;
  doc.text(`Age: ${userData.age} years`, 20, yPos);
  yPos += 15;

  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text('Measurements', 20, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('Height:', 20, yPos);
  yPos += 7;
  doc.text(`  • ${heightInCm.toFixed(1)} cm`, 25, yPos);
  yPos += 6;
  doc.text(`  • ${heightInInches.toFixed(1)} inches`, 25, yPos);
  yPos += 6;
  doc.text(`  • ${heightInFeet.toFixed(2)} feet`, 25, yPos);
  yPos += 10;

  doc.text('Weight:', 20, yPos);
  yPos += 7;
  doc.text(`  • ${weightInKg.toFixed(1)} kg`, 25, yPos);
  yPos += 6;
  doc.text(`  • ${weightInPounds.toFixed(1)} pounds`, 25, yPos);
  yPos += 6;
  doc.text(`  • ${weightInStones.toFixed(2)} stones`, 25, yPos);
  yPos += 15;

  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text('BMI Results', 20, yPos);
  yPos += 10;

  doc.setFontSize(14);
  const rgb = hexToRgb(String(result.color));
  doc.setTextColor(rgb.r, rgb.g, rgb.b);
  doc.text(`BMI: ${result.bmi.toFixed(1)} - ${result.category}`, 20, yPos);
  yPos += 10;
  // Add weight gain/loss message
  let weightMsg = '';
  if (result.category === 'Underweight' && result.weightDifference < 0) {
    weightMsg = `You need to gain ${(Math.abs(result.weightDifference)).toFixed(1)} kg to reach a healthy weight.`;
  } else if ((result.category === 'Overweight' || result.category === 'Obese') && result.weightDifference > 0) {
    weightMsg = `You need to lose ${(result.weightDifference).toFixed(1)} kg to reach a healthy weight.`;
  } else {
    weightMsg = 'Your weight is within the healthy range.';
  }
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text(weightMsg, 20, yPos);
  yPos += 15;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('Ideal Weight Range:', 20, yPos);
  yPos += 7;
  doc.text(`  • ${idealMinKg.toFixed(1)} - ${idealMaxKg.toFixed(1)} kg`, 25, yPos);
  yPos += 6;
  doc.text(`  • ${idealMinLbs.toFixed(1)} - ${idealMaxLbs.toFixed(1)} pounds`, 25, yPos);
  yPos += 10;

  // BMI Scale
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text('BMI Scale', 20, yPos);
  yPos += 10;

  const scaleWidth = 170;
  const scaleHeight = 20;
  const scaleX = 20;

  doc.setFillColor(59, 130, 246);
  doc.rect(scaleX, yPos, scaleWidth * 0.25, scaleHeight, 'F');

  doc.setFillColor(16, 185, 129);
  doc.rect(scaleX + scaleWidth * 0.25, yPos, scaleWidth * 0.25, scaleHeight, 'F');

  doc.setFillColor(245, 158, 11);
  doc.rect(scaleX + scaleWidth * 0.5, yPos, scaleWidth * 0.25, scaleHeight, 'F');

  doc.setFillColor(239, 68, 68);
  doc.rect(scaleX + scaleWidth * 0.75, yPos, scaleWidth * 0.25, scaleHeight, 'F');

  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('<18.5', scaleX + scaleWidth * 0.125, yPos + 12, { align: 'center' });
  doc.text('18.5-25', scaleX + scaleWidth * 0.375, yPos + 12, { align: 'center' });
  doc.text('25-30', scaleX + scaleWidth * 0.625, yPos + 12, { align: 'center' });
  doc.text('>30', scaleX + scaleWidth * 0.875, yPos + 12, { align: 'center' });

  yPos += 30;

  // Recommendations section removed per user request.
  // If you want to re-enable or move recommendations later,
  // add them back here with appropriate layout adjustments.

  doc.save(`BMI_Report_${userData.name.replace(/\s+/g, '_')}.pdf`);
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
