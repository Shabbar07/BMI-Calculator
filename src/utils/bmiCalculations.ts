import { BMIData, BMICategory } from '../types/bmi';

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) {
    return {
      name: 'Underweight',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      range: '< 18.5',
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      name: 'Normal Weight',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      range: '18.5 - 24.9',
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      name: 'Overweight',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      range: '25 - 29.9',
    };
  } else {
    return {
      name: 'Obese',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      range: '≥ 30',
    };
  }
};

export const calculateIdealWeight = (height: number): { min: number; max: number } => {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 24.9 * heightInMeters * heightInMeters;
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10,
  };
};

export const getWeightRecommendation = (bmi: number, currentWeight: number, idealWeightMin: number, idealWeightMax: number): string => {
  if (bmi < 18.5) {
    const weightToGain = Math.round((idealWeightMin - currentWeight) * 10) / 10;
    return `You should aim to gain approximately ${weightToGain} kg to reach a healthy weight range.`;
  } else if (bmi >= 25) {
    const weightToLose = Math.round((currentWeight - idealWeightMax) * 10) / 10;
    return `You should aim to lose approximately ${weightToLose} kg to reach a healthy weight range.`;
  } else {
    return 'Your weight is within the healthy range. Maintain your current lifestyle!';
  }
};
