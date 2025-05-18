import { useState } from 'react';
import Layout from '../components/Layout';
import QuizCard from '../components/QuizCard';
import AIAssistant from '../components/AIAssistant';

// Mock data for quizzes
const quizzes = [
  {
    id: 1,
    title: 'Python Basics',
    description: 'Test your fundamental Python knowledge with this beginner-friendly quiz.',
    language: 'Python',
    questionsCount: 10,
    difficulty: 'Beginner',
  },
  {
    id: 2,
    title: 'Java OOP Concepts',
    description: 'Master object-oriented programming concepts in Java with this intermediate quiz.',
    language: 'Java',
    questionsCount: 15,
    difficulty: 'Intermediate',
  },
  {
    id: 3,
    title: 'C++ Data Structures',
    description: 'Challenge yourself with advanced C++ data structure problems.',
    language: 'C++',
    questionsCount: 12,
    difficulty: 'Advanced',
  },
  {
    id: 4,
    title: 'Python Algorithms',
    description: 'Solve algorithm problems using Python. Perfect for coding interview preparation.',
    language: 'Python',
    questionsCount: 20,
    difficulty: 'Intermediate',
  },
  {
    id: 5,
    title: 'Java Spring Framework',
    description: 'Test your knowledge of Spring Framework concepts and best practices.',
    language: 'Java',
    questionsCount: 15,
    difficulty: 'Advanced',
  },
  {
    id: 6,
    title: 'C++ Memory Management',
    description: 'Deep dive into memory management concepts in C++.',
    language: 'C++',
    questionsCount: 10,
    difficulty: 'Intermediate',
  },
];

export default function QuizPage() {
  const [enrolledQuizzes, setEnrolledQuizzes] = useState<number[]>([1, 3, 5]); // Mock enrolled quiz IDs
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const filteredQuizzes = selectedLanguage === 'All' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.language === selectedLanguage);

  const handleStartQuiz = (quizId: number) => {
    // In a real app, this would navigate to the quiz taking interface
    alert(`Starting quiz ${quizId}`);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Coding Quizzes
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Test your programming knowledge and prepare for technical interviews
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Quiz Grid */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Quizzes</h2>
                <div className="flex items-center space-x-2">
                  <label htmlFor="language-filter" className="text-sm font-medium text-gray-700">
                    Filter by language:
                  </label>
                  <select
                    id="language-filter"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="All">All Languages</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    title={quiz.title}
                    description={quiz.description}
                    language={quiz.language}
                    questionsCount={quiz.questionsCount}
                    difficulty={quiz.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'}
                    onStart={() => handleStartQuiz(quiz.id)}
                  />
                ))}
              </div>

              {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No quizzes found for the selected language.</p>
                </div>
              )}
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:w-1/3">
              <AIAssistant />
              
              {/* Enrolled Quizzes Section */}
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="font-semibold">Your Enrolled Quizzes</h3>
                </div>
                <div className="p-4">
                  {enrolledQuizzes.length > 0 ? (
                    <ul className="space-y-2">
                      {quizzes
                        .filter(quiz => enrolledQuizzes.includes(quiz.id))
                        .map(quiz => (
                          <li key={quiz.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div>
                              <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                              <p className="text-sm text-gray-500">{quiz.language} • {quiz.difficulty}</p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Enrolled
                            </span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">You haven't enrolled in any quizzes yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
