import { Info, ArrowLeft, Calculator, FileText, Scale, Heart } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage = ({ onBack }: AboutPageProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          aria-label="Go back to MyBMI"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to MyBMI
        </button>

        <article className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <header className="flex items-center gap-4 mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About MyBMI</h1>
              <p className="text-gray-500">Your trusted health companion</p>
            </div>
          </header>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is BMI?</h2>
              <p className="text-gray-700 leading-relaxed">
                Body Mass Index (BMI) is a simple, widely-used measurement that helps assess whether a person has a healthy body weight for their height. It was developed by Belgian mathematician Adolphe Quetelet in the 1830s and has since become the standard method for categorizing weight status in adults.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters (kg/m²). While BMI doesn't directly measure body fat, it provides a reasonable indicator for most people.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">MyBMI Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Instant Calculation</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Get your BMI result immediately with our fast and accurate calculator.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Multiple Units</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Support for both metric (kg/cm) and imperial (lbs/ft/in) measurements.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">PDF Reports</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Download detailed PDF reports to share with your healthcare provider.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-6 h-6 text-red-600" />
                    <h3 className="font-semibold text-gray-900">Health Insights</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Receive personalized recommendations based on your BMI category.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">BMI Categories Explained</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-2 text-left">Category</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">BMI Range</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium text-blue-700">Underweight</td>
                      <td className="border border-gray-200 px-4 py-2">&lt; 18.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">May indicate nutritional deficiency or other health issues</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 font-medium text-green-700">Normal Weight</td>
                      <td className="border border-gray-200 px-4 py-2">18.5 - 24.9</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Generally considered a healthy weight range</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium text-orange-700">Overweight</td>
                      <td className="border border-gray-200 px-4 py-2">25 - 29.9</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">May increase risk of certain health conditions</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 font-medium text-red-700">Obese</td>
                      <td className="border border-gray-200 px-4 py-2">≥ 30</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Higher risk for obesity-related health problems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations of BMI</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                While BMI is a useful screening tool, it has limitations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Muscle Mass:</strong> Athletes and people with high muscle mass may have a high BMI without excess body fat.</li>
                <li><strong>Age:</strong> Older adults may have more body fat than indicated by their BMI.</li>
                <li><strong>Gender:</strong> Women typically have more body fat than men at the same BMI.</li>
                <li><strong>Ethnicity:</strong> BMI may not accurately reflect health risks across different ethnic groups.</li>
                <li><strong>Body Composition:</strong> BMI doesn't distinguish between fat mass and lean mass.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Always consult with a healthcare professional for a comprehensive health assessment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Project</h2>
              <p className="text-gray-700 leading-relaxed">
                MyBMI is a community-focused project dedicated to creating useful health and wellness tools. The goal is to provide free, accessible health resources to help people make informed decisions about their well-being. This tool is open-source and available for everyone to use and improve.
              </p>
            </section>

            <section className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-2">Medical Disclaimer</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                MyBMI is provided for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or calculated using this tool.
              </p>
            </section>
          </div>
        </article>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MyBMI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
};

export default AboutPage;
