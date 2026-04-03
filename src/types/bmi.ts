export interface BMIData {
  color(color: any): unknown;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number; // always in cm for calculation
  heightUnit: 'cm' | 'in' | 'ft';
  heightInput: number; // original value entered by user
  weight: number; // always in kg for calculation
  weightUnit: 'kg' | 'lbs';
  weightInput: number; // original value entered by user
  bmi: number;
  category: string;
  idealWeightMin: number;
  idealWeightMax: number;
  weightDifference: number;
}

export interface BMICategory {
  name: string;
  color: string;
  bgColor: string;
  range: string;
}
