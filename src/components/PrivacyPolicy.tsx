import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 text-sm">Last updated: {currentDate}</p>
            </div>
          </header>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to MyBMI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our free MyBMI service at <a href="https://mybmiapp.vercel.app" className="text-blue-600 hover:underline">mybmiapp.vercel.app</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                MyBMI is designed with your privacy in mind. Here's what we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>BMI Calculation Data:</strong> Name, age, gender, height, and weight that you voluntarily enter to calculate your BMI. This data is processed locally in your browser and is NOT stored on our servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide and maintain our MyBMI service</li>
                <li>To generate your personalized BMI report and PDF download</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Hosting:</strong> Our website is hosted on platforms that may collect server logs and basic session data for operational purposes.</li>
              </ul>
            </section>


            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your information. Your BMI calculation data is processed entirely in your browser and is not transmitted to or stored on our servers. PDF reports are generated locally on your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Right to access your data</li>
                <li>Right to request deletion of your data (though no data is stored on our servers)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our website or reach out to the developer at{' '}
                <span className="text-gray-700">MyBMI Project Support</span>.
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

export default PrivacyPolicy;
