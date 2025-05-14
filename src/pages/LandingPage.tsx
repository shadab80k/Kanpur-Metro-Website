import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LandingPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const screenshots = [
    { id: 1, src: '/screenshots/screenshot1.jpg', alt: 'App Screenshot 1' },
    { id: 2, src: '/screenshots/screenshot2.jpg', alt: 'App Screenshot 2' },
    { id: 3, src: '/screenshots/screenshot3.jpg', alt: 'App Screenshot 3' },
    { id: 4, src: '/screenshots/screenshot4.jpg', alt: 'App Screenshot 4' },
    { id: 5, src: '/screenshots/screenshot5.jpg', alt: 'App Screenshot 5' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-orange-500 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">{t('appName')}</div>
          <div>
            <button 
              onClick={toggleLanguage}
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium border border-white hover:bg-white hover:text-orange-500 transition-colors duration-300"
            >
              {language === 'en' ? t('switchToHindi') : t('switchToEnglish')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-100 py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-orange-600 mb-4">{t('appName')}</h1>
          <p className="text-xl text-gray-700 mb-8">{t('tagline')}</p>
          <a
            href="/app-debug.apk"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t('downloadAPK')}
          </a>
        </div>
      </header>

      {/* App Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">{t('appFeatures')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">{t('routePlanner')}</h3>
              <p className="text-gray-600">{t('routePlannerDesc')}</p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">{t('stationInfo')}</h3>
              <p className="text-gray-600">{t('stationInfoDesc')}</p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">{t('fareCalculator')}</h3>
              <p className="text-gray-600">{t('fareCalculatorDesc')}</p>
            </div>
            {/* Feature Card 4 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">{t('metroMap')}</h3>
              <p className="text-gray-600">{t('metroMapDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">{t('screenshots')}</h2>
          {screenshots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-2">
                  <img
                    src={screenshot.src}
                    alt={`${t('appName')} ${screenshot.alt}`}
                    className="w-full h-auto object-contain rounded-md max-h-96" // Added max-h-96 for better layout
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center text-gray-500">
              <p>{t('screenshotsPlaceholder')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-10 px-4 text-center">
        <div className="container mx-auto">
          <p className="mb-2">{t('contactEmail')}</p>
          {/* Social Links Placeholder */}
          <div className="mb-4">
            <a href="#" className="hover:text-gray-300 mx-2">{t('facebook')}</a>
            <a href="#" className="hover:text-gray-300 mx-2">{t('twitter')}</a>
            <a href="#" className="hover:text-gray-300 mx-2">{t('instagram')}</a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

