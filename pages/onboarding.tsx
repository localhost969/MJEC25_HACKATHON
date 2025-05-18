import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function OnboardingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const languages = ['Java', 'C', 'Python'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!selectedLanguage || !selectedDifficulty) {
      setError('Please select a language and difficulty level.');
      return;
    }

    try {
      // For demo: Store preferences in localStorage
      const userCoursePreferences = {
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        selectedAt: new Date().toISOString(),
      };
      localStorage.setItem('userCoursePreferences', JSON.stringify(userCoursePreferences));

      setMessage(`Preferences saved: ${selectedLanguage} (${selectedDifficulty}). Redirecting...`);
      setSelectedLanguage('');
      setSelectedDifficulty('');

      // Redirect to dashboard after a short delay to allow message to be seen
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err) {
      console.error('Preference saving error:', err);
      setError('An unexpected error occurred while saving preferences. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Welcome to DevPrep AI</title>
        <meta name="description" content="Set up your DevPrep AI profile" />
      </Head>
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-gray-900">
        <div className="w-full max-w-4xl px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900">
              Welcome to DevPrep AI
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Let's set up your profile to get started
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose a Programming Language:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {languages.map((lang) => (
                    <label 
                      key={lang} 
                      className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedLanguage === lang 
                          ? 'bg-blue-50 border border-blue-200 text-blue-600 shadow-sm' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      <input
                        type="radio"
                        name="language"
                        value={lang}
                        checked={selectedLanguage === lang}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-lg font-medium">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Your Current Level:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {difficulties.map((level) => (
                    <label 
                      key={level} 
                      className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedDifficulty === level 
                          ? 'bg-blue-50 border border-blue-200 text-blue-600 shadow-sm' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedDifficulty(level)}
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={selectedDifficulty === level}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-lg font-medium">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm font-medium text-red-600 text-center bg-red-50 py-2 px-4 rounded-lg border border-red-200">{error}</p>}
              {message && <p className="text-sm font-medium text-green-600 text-center bg-green-50 py-2 px-4 rounded-lg border border-green-200">{message}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 rounded-lg text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Preferences & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
