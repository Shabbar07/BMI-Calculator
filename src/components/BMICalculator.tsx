import { useState } from 'react';
import { Calculator, Download, User, Ruler, Weight, Info, Shield, HelpCircle, Lightbulb, Activity, Heart, Scale } from 'lucide-react';
import { BMIData } from '../types/bmi';
import { calculateBMI, getBMICategory, calculateIdealWeight } from '../utils/bmiCalculations';
import { generatePDFReport } from '../utils/pdfGenerator';
import BMIResult from './BMIResult';

interface BMICalculatorProps {
  onNavigateToPrivacy: () => void;
  onNavigateToAbout: () => void;
}

const BMICalculator = ({ onNavigateToPrivacy, onNavigateToAbout }: BMICalculatorProps) => {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in' | 'ft'>('cm');
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [result, setResult] = useState<BMIData | null>(null);

  // Conversion helpers
  const convertHeight = (value: number, from: 'cm' | 'in' | 'ft', to: 'cm' | 'in' | 'ft') => {
    if (from === to) return value;
    // Convert to cm first
    let cm = value;
    if (from === 'in') cm = value * 2.54;
    if (from === 'ft') cm = value * 30.48;
    if (to === 'cm') return cm;
    if (to === 'in') return cm / 2.54;
    if (to === 'ft') return cm / 30.48;
    return value;
  };

  const convertWeight = (value: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs') => {
    if (from === to) return value;
    if (from === 'kg' && to === 'lbs') return value / 0.453592;
    if (from === 'lbs' && to === 'kg') return value * 0.453592;
    return value;
  };

  // Responsive unit change handlers
  const handleHeightUnitChange = (newUnit: 'cm' | 'in' | 'ft') => {
    if (height) {
      const heightNum = parseFloat(height);
      if (!isNaN(heightNum)) {
        const converted = convertHeight(heightNum, heightUnit, newUnit);
        setHeight(converted ? converted.toFixed(2) : '');
      }
    }
    setHeightUnit(newUnit);
  };

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (weight) {
      const weightNum = parseFloat(weight);
      if (!isNaN(weightNum)) {
        const converted = convertWeight(weightNum, weightUnit, newUnit);
        setWeight(converted ? converted.toFixed(2) : '');
      }
    }
    setWeightUnit(newUnit);
  };
  const handleCalculate = () => {
    const ageNum = parseFloat(age);
    let heightNum = parseFloat(height);
    let weightNum = parseFloat(weight);

    if (!name.trim() || !gender || !ageNum || !heightNum || !weightNum || ageNum <= 0 || heightNum <= 0 || weightNum <= 0) {
      alert('Please enter your name, gender, and valid positive numbers for all fields');
      return;
    }

    // Store original input values
    const heightInput = heightNum;
    const weightInput = weightNum;
    // Convert height to cm if needed for calculation
    let heightForCalc = heightNum;
    if (heightUnit === 'in') {
      heightForCalc = heightNum * 2.54;
    } else if (heightUnit === 'ft') {
      heightForCalc = heightNum * 30.48;
    }
    // Convert weight to kg if needed for calculation
    let weightForCalc = weightNum;
    if (weightUnit === 'lbs') {
      weightForCalc = weightNum * 0.453592;
    }

    const bmi = calculateBMI(weightForCalc, heightForCalc);
    const idealWeight = calculateIdealWeight(heightForCalc);
    const category = getBMICategory(bmi);

    // Determine weight difference to the nearest healthy boundary
    let weightDifferenceCalc = 0;
    if (bmi < 18.5) {
      // Need to gain weight to reach the minimum healthy weight
      weightDifferenceCalc = weightForCalc - idealWeight.min; // negative
    } else if (bmi >= 25) {
      // Need to lose weight to get down to the maximum healthy weight
      weightDifferenceCalc = weightForCalc - idealWeight.max; // positive
    } else {
      weightDifferenceCalc = 0;
    }

    const bmiData: BMIData = {
      name: name.trim(),
      gender: gender as 'male' | 'female' | 'other',
      age: ageNum,
      height: heightForCalc,
      heightUnit,
      heightInput,
      weight: weightForCalc,
      weightUnit,
      weightInput,
      bmi: bmi,
      category: category.name,
      idealWeightMin: idealWeight.min,
      idealWeightMax: idealWeight.max,
      weightDifference: weightDifferenceCalc,
    } as BMIData;

    setResult(bmiData);
  };

  const handleDownloadPDF = async () => {
    if (result) {
      await generatePDFReport(result, result);
    }
  };

  const handleReset = () => {
    setName('');
    setGender('');
    setAge('');
    setHeight('');
    setHeightUnit('cm');
    setWeight('');
    setWeightUnit('kg');
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg mb-6 ring-4 ring-blue-50">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Free Body Mass Index Calculator</h1>
          <p className="text-gray-600 text-lg">Calculate your Body Mass Index and get personalized health insights with instant results</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" aria-label="BMI Calculator Input Form">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enter Your Details</h2>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} aria-label="BMI calculation form">
              <div>
                <label htmlFor="name-input" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
                  Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  aria-required="true"
                />
              </div>
              <fieldset>
                <legend className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-pink-600" aria-hidden="true" />
                  Gender
                </legend>
                <div className="flex gap-4" role="radiogroup" aria-label="Gender selection">
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${gender === 'male' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="sr-only" required aria-required="true" />
                    Male
                  </label>
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${gender === 'female' ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="sr-only" required aria-required="true" />
                    Female
                  </label>
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${gender === 'other' ? 'bg-gray-600 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <input type="radio" name="gender" value="other" checked={gender === 'other'} onChange={() => setGender('other')} className="sr-only" required aria-required="true" />
                    Other
                  </label>
                </div>
              </fieldset>
              <div>
                <label htmlFor="age-input" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
                  Age (years)
                </label>
                <input
                  id="age-input"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  min="1"
                  max="150"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="height-input" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
                  Height
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                  <input
                    id="height-input"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={
                      heightUnit === 'cm' ? 'e.g. 170 cm' :
                      heightUnit === 'in' ? 'e.g. 65 in' :
                      'e.g. 5.5 ft'
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-0"
                    min="0"
                    step="0.01"
                    required
                    aria-required="true"
                    aria-label={`Height in ${heightUnit}`}
                  />
                  <div className="flex flex-row rounded-lg shadow-sm overflow-hidden border border-gray-300 w-full sm:w-auto" role="group" aria-label="Height unit selection">
                    <button type="button" className={`flex-1 px-3 py-2 text-sm font-medium ${heightUnit === 'cm' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleHeightUnitChange('cm')} aria-pressed={heightUnit === 'cm'}>cm</button>
                    <button type="button" className={`flex-1 px-3 py-2 text-sm font-medium ${heightUnit === 'in' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleHeightUnitChange('in')} aria-pressed={heightUnit === 'in'}>inches</button>
                    <button type="button" className={`flex-1 px-3 py-2 text-sm font-medium ${heightUnit === 'ft' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleHeightUnitChange('ft')} aria-pressed={heightUnit === 'ft'}>feet</button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="weight-input" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Weight className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
                  Weight
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                  <input
                    id="weight-input"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={weightUnit === 'kg' ? 'e.g. 70 kg' : 'e.g. 154 lbs'}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-0"
                    min="0"
                    step="0.01"
                    required
                    aria-required="true"
                    aria-label={`Weight in ${weightUnit}`}
                  />
                  <div className="flex flex-row rounded-lg shadow-sm overflow-hidden border border-gray-300 w-full sm:w-auto" role="group" aria-label="Weight unit selection">
                    <button type="button" className={`flex-1 px-3 py-2 text-sm font-medium ${weightUnit === 'kg' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleWeightUnitChange('kg')} aria-pressed={weightUnit === 'kg'}>kg</button>
                    <button type="button" className={`flex-1 px-3 py-2 text-sm font-medium ${weightUnit === 'lbs' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleWeightUnitChange('lbs')} aria-pressed={weightUnit === 'lbs'}>lbs</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  aria-label="Calculate Body Mass Index"
                >
                  Calculate BMI
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    aria-label="Reset calculator"
                  >
                    Reset
                  </button>
                )}
              </div>

              {result && (
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  aria-label="Download BMI Report as PDF"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  Download PDF Report
                </button>
              )}
            </form>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" aria-label="BMI Results" role="region">
            {result ? (
              <BMIResult data={result} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400" role="status" aria-live="polite">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
                  <p className="text-lg">Enter your details and calculate your BMI to see results</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <article className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding BMI Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200" role="note">
              <h3 className="font-semibold text-blue-900 mb-1">Underweight</h3>
              <p className="text-sm text-blue-700">BMI &lt; 18.5</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200" role="note">
              <h3 className="font-semibold text-green-900 mb-1">Normal Weight</h3>
              <p className="text-sm text-green-700">BMI 18.5 - 24.9</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200" role="note">
              <h3 className="font-semibold text-orange-900 mb-1">Overweight</h3>
              <p className="text-sm text-orange-700">BMI 25 - 29.9</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200" role="note">
              <h3 className="font-semibold text-red-900 mb-1">Obese</h3>
              <p className="text-sm text-red-700">BMI ≥ 30</p>
            </div>
          </div>
        </article>

        {/* SEO Content Section - What is BMI */}
        <article className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">What is BMI (Body Mass Index)?</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Body Mass Index (BMI)</strong> is a widely used measurement that provides a simple way to assess whether you have a healthy body weight for your height. Developed by Belgian mathematician Adolphe Quetelet in the 1830s, BMI has become the standard method for categorizing weight status in adults worldwide.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The BMI formula divides your weight in kilograms by the square of your height in meters (kg/m²). While it doesn't directly measure body fat percentage, BMI correlates with body fat and health risks for most people.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How is BMI Calculated?</h3>
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-blue-900 font-mono text-center text-lg">
                BMI = Weight (kg) ÷ Height² (m²)
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              For example, if you weigh 70 kg and are 1.75 m tall: BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = <strong>22.9</strong> (Normal weight)
            </p>
          </div>
        </article>

        {/* SEO Content Section - Health Tips */}
        <article className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl">
              <Lightbulb className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Tips for Maintaining a Healthy Weight</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Stay Active</h3>
                <p className="text-gray-600 text-sm">Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly. Include strength training exercises twice a week.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Balanced Nutrition</h3>
                <p className="text-gray-600 text-sm">Focus on whole grains, lean proteins, fruits, vegetables, and healthy fats. Limit processed foods, sugary drinks, and excessive sodium.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 text-sm font-bold">💧</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Stay Hydrated</h3>
                <p className="text-gray-600 text-sm">Drink plenty of water throughout the day. Sometimes thirst is mistaken for hunger. Aim for 8 glasses (2 liters) of water daily.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 text-sm font-bold">😴</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quality Sleep</h3>
                <p className="text-gray-600 text-sm">Get 7-9 hours of quality sleep each night. Poor sleep can affect hormones that regulate appetite and metabolism.</p>
              </div>
            </div>
          </div>
        </article>

        {/* FAQ Section for SEO */}
        <article className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-xl">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Is BMI accurate for everyone?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-700">
                BMI is a useful screening tool but has limitations. It may overestimate body fat in muscular individuals (like athletes) and underestimate it in older adults who have lost muscle mass. BMI also doesn't account for fat distribution, which is important for health risk assessment.
              </p>
            </details>
            <details className="group bg-gray-50 rounded-xl p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                What's the difference between BMI and body fat percentage?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-700">
                BMI is a simple calculation based on height and weight, while body fat percentage directly measures the proportion of fat in your body. Body fat percentage is more accurate but requires special equipment like DEXA scans or bioelectrical impedance devices.
              </p>
            </details>
            <details className="group bg-gray-50 rounded-xl p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Can BMI be used for children?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-700">
                For children and teens (ages 2-20), BMI is calculated the same way but interpreted using age- and sex-specific percentiles because body composition varies as children grow. A healthcare provider should interpret children's BMI.
              </p>
            </details>
            <details className="group bg-gray-50 rounded-xl p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Should I rely only on BMI for my health assessment?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-700">
                No, BMI is just one indicator. Other important factors include waist circumference, blood pressure, cholesterol levels, blood sugar, physical fitness, family history, and lifestyle habits. Always consult a healthcare professional for a comprehensive health assessment.
              </p>
            </details>
          </div>
        </article>
      </div>
      <footer className="mt-8 border-t pt-6" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-6" aria-label="Footer navigation">
            <button
              onClick={onNavigateToAbout}
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              About
            </button>
            <button
              onClick={onNavigateToPrivacy}
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </button>
            <span className="text-gray-600">Contact</span>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold shadow" role="img" aria-label="MyBMI">
                MB
              </span>
              <span className="ml-3 text-sm text-gray-600">MyBMI - Health & Wellness Tool</span>
            </div>
            <div className="text-xs text-gray-400">© {new Date().getFullYear()} MyBMI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default BMICalculator;
