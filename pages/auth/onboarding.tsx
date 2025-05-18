import { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div className="max-w-2xl mx-auto mt-8 md:mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Welcome to CodeMentor</h2>
      <p className="text-center text-gray-600 mt-2 mb-6">Let's set up your profile to get started</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Choose a Programming Language:</h3>
          <div className="mt-2 space-y-2">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={selectedLanguage === lang}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Select Your Current Level:</h3>
          <div className="mt-2 space-y-2">
            {difficulties.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={selectedDifficulty === level}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {message && <p className="text-sm text-green-600 text-center">{message}</p>}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Preferences & Continue
          </button>
        </div>
      </form>
    </div>
  );
}
