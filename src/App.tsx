import { useState } from 'react';
import BMICalculator from './components/BMICalculator';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutPage from './components/AboutPage';
import CookieConsent from './components/CookieConsent';

type Page = 'calculator' | 'privacy' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('calculator');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentPage === 'calculator' && (
        <BMICalculator 
          onNavigateToPrivacy={() => navigateTo('privacy')}
          onNavigateToAbout={() => navigateTo('about')}
        />
      )}
      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={() => navigateTo('calculator')} />
      )}
      {currentPage === 'about' && (
        <AboutPage onBack={() => navigateTo('calculator')} />
      )}
      
      {/* Cookie Consent Banner */}
      <CookieConsent onNavigateToPrivacy={() => navigateTo('privacy')} />
    </>
  );
}

export default App;

