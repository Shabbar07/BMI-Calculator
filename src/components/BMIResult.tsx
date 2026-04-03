import { AlertCircle, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import { BMIData } from '../types/bmi';
import { getBMICategory, getWeightRecommendation } from '../utils/bmiCalculations';

interface BMIResultProps {
  data: BMIData;
}

const BMIResult = ({ data }: BMIResultProps) => {
    // Helper to format height and weight in selected units
    const formatHeight = () => {
      if (data.heightUnit === 'cm') return `${data.heightInput} cm`;
      if (data.heightUnit === 'in') return `${data.heightInput} in`;
      if (data.heightUnit === 'ft') return `${data.heightInput} ft`;
      return `${data.heightInput} cm`;
    };
    const formatWeight = () => {
      if (data.weightUnit === 'kg') return `${data.weightInput} kg`;
      if (data.weightUnit === 'lbs') return `${data.weightInput} lbs`;
      return `${data.weightInput} kg`;
    };
  const category = getBMICategory(data.bmi);
  const recommendation = getWeightRecommendation(data.bmi, data.weight, data.idealWeightMin, data.idealWeightMax);

  const getIcon = () => {
    if (data.bmi < 18.5) return <TrendingUp className="w-6 h-6" />;
    if (data.bmi >= 25) return <TrendingDown className="w-6 h-6" />;
    return <CheckCircle className="w-6 h-6" />;
  };

  const getBMIIndicatorPosition = () => {
    if (data.bmi < 15) return '0%';
    if (data.bmi > 40) return '100%';
    const position = ((data.bmi - 15) / 25) * 100;
    return `${Math.min(Math.max(position, 0), 100)}%`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Results</h2>
        <div className="mb-2 text-lg text-blue-700 font-semibold">{data.name}</div>
        <div className={`${category.bgColor} rounded-xl p-6 border-2 border-current ${category.color}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-80">Your BMI</span>
            {getIcon()}
          </div>
          <div className="text-5xl font-bold mb-2">{data.bmi.toFixed(1)}</div>
          <div className="text-lg font-semibold">{category.name}</div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">BMI Scale</h3>
        <div className="relative h-3 bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-400 rounded-full overflow-hidden">
          <div
            className="absolute top-0 w-1 h-full bg-gray-900"
            style={{ left: getBMIIndicatorPosition() }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
              {data.bmi.toFixed(1)}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>15</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>40</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Ideal Weight Range
        </h3>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {data.idealWeightMin} - {data.idealWeightMax} kg
        </div>
        <p className="text-sm text-gray-600">For your height of {formatHeight()}</p>
        <p className="text-sm text-gray-600">Your entered weight: {formatWeight()}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-5 border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
        <p className="text-gray-700 leading-relaxed">{recommendation}</p>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <p className="text-xs text-amber-900">
          <strong>Disclaimer:</strong> BMI is a general indicator and may not account for muscle mass, bone density, and other factors. Always consult with a healthcare professional for personalized advice.
        </p>
      </div>
    </div>
  );
};

export default BMIResult;
