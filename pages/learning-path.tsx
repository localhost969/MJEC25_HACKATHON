import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

interface Subtopic {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
}

interface Topic {
  id: string;
  name: string;
  description?: string;
  subtopics: Subtopic[];
  totalHours: number;
}

interface CourseData {
  success: boolean;
  level: string;
  totalTopics: number;
  totalHours: number;
  topics: Topic[];
}

const LANGUAGES = ['c', 'python', 'java'] as const;
type Language = typeof LANGUAGES[number];

const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
type Difficulty = typeof DIFFICULTY_LEVELS[number];

export default function LearningPathPage() {
  const router = useRouter();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<{[key: string]: boolean}>({});
  
  // Get language and difficulty from URL or use defaults
  const language = (router.query.lang as Language) || 'c';
  const difficulty = (router.query.difficulty as Difficulty) || 'beginner';

  useEffect(() => {
    const fetchLearningPath = async () => {
      if (!LANGUAGES.includes(language as Language) || 
          !DIFFICULTY_LEVELS.includes(difficulty as Difficulty)) {
        setError('Invalid language or difficulty level');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/module/${language}/topics?difficulty=${difficulty}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        
        const data = await response.json();
        setCourseData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching learning path:', err);
        setError('Failed to load learning path. Please try again later.');
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [language, difficulty]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleLanguageChange = (newLanguage: Language) => {
    router.push({
      pathname: '/learning-path',
      query: { ...router.query, lang: newLanguage }
    });
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    router.push({
      pathname: '/learning-path',
      query: { ...router.query, difficulty: newDifficulty }
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading learning path...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !courseData) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Content</h2>
            <p className="text-gray-600 mb-4">{error || 'Unable to load the learning path. Please try again later.'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const languageName = {
    c: 'C',
    python: 'Python',
    java: 'Java'
  }[language];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {languageName} Learning Path
            </h1>
            
            {/* Language Selector */}
            <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 mb-8 p-4 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Select Language:</span>
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                  {LANGUAGES.map((lang) => {
                    const langIcons = {
                      c: (
                        <svg className="h-5 w-5" viewBox="0 0 128 128">
                          <path fill="#A8B9CC" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.3-2.1-2.2-2.9z"/>
                          <path fill="#B3B3B3" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
                          <path fill="#F7DF1E" d="M64 0L0 32v64l64 32 64-32V32L64 0zm0 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5 24.5 11 24.5 24.5-11 24.5-24.5 24.5z"/>
                        </svg>
                      ),
                      python: (
                        <svg className="h-5 w-5" viewBox="0 0 128 128">
                          <path fill="#FFD43B" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.877c-7.176 0-13.46 4.16-15.846 10.405-2.75 7.124-2.75 16.32 0 31.408 1.67 5.265 2.413 12.3 2.413 20.017 0 17.565-4.578 35.574-12.69 45.042-1.9 2.21-1.755 4.676 1.008 6.25 1.08.61 2.06.96 4.098.98 1.31-.02 2.82-.34 4.55-1.067 15.93-6.08 23.54-29.466 23.54-51.325 0-4.22.57-8.26 1.11-11.201h11.36v19.66c0 8.646 3.184 11.795 11.796 11.795h23.14c9.41 0 12.004-3.16 12.004-11.796V15.833c0-8.645-3.185-11.796-11.795-11.796H63.39zm-19.61 9.27c-1.56 0-2.82 1.27-2.82 2.83s1.26 2.83 2.83 2.83 2.83-1.26 2.83-2.83-1.27-2.83-2.83-2.83z"/>
                          <path fill="#FFD43B" d="M91.682 125.6c-2.16 0-4.44.33-6.83 1.01-11.3 3.2-15.99 7.38-18.12 10.63-.96 1.5-1.01 2.06-1.01 3.75 0 2.3 1.25 4.05 3.54 4.05h48.08c2.29 0 3.54-1.76 3.54-4.05 0-2.3-1.25-4.05-3.54-4.05h-23.65c2.21-4.51 5.37-7.87 10.83-9.1 2.62-.6 4.84-.7 6.56-.7 4.58 0 7.7.93 7.7 3.54 0 2.19-1.76 3.52-5.19 3.52-2.19 0-4.92-.48-8.13-1.01-3.21-.53-6.86-1.13-10.96-1.13-4.1 0-7.85.6-11.06 1.13-3.21.53-5.94 1.01-8.13 1.01-3.43 0-5.19-1.33-5.19-3.52 0-2.61 3.12-3.54 7.7-3.54 1.72 0 3.94.1 6.56.7 5.46 1.23 8.62 4.59 10.83 9.1h-8.08c-4.33 0-7.85-3.52-7.85-7.85v-11.3c0-4.33 3.52-7.85 7.85-7.85h35.2c4.33 0 7.85 3.52 7.85 7.85v11.3c0 4.33-3.52 7.85-7.85 7.85h-5.3z"/>
                        </svg>
                      ),
                      java: (
                        <svg className="h-5 w-5" viewBox="0 0 128 128">
                          <path fill="#E76F00" d="M47.17 47.18s-12.12 2.88 8.07 17.13c14.29 9.9 6.9 16.2 1.49 17.13-10.69 1.47-8.4 8.4-30.25-5.62C12.3 64.5 29.4 82.3 38.04 87.3c8.64 5 18.51 7.39 29.85 4.14 11.34-3.25 12.7-7.39 20.33-12.58 7.63-5.19 18.13 3.7 29.85-8.07 11.71-11.77 1.84-16.57-3.69-17.5-5.54-.93-4.15 5.08-19.35 11.08-15.2 6-16.09 1.23-25.22-4.61-9.13-5.84-21.54-12.58-21.54-12.58z"/>
                          <path fill="#5382A1" d="M82.6 123.8c15.57 0 22.4-7.83 22.4-14.66 0-7.83-6.83-10.7-15.57-12.1-3.12-.5-6.67-.7-10.22-.7-3.55 0-7.1.2-10.22.7-8.74 1.4-15.57 4.27-15.57 12.1 0 6.83 6.83 14.66 22.4 14.66z"/>
                          <path fill="#5382A1" d="M82.6 113.2c-8.4 0-15.2-1.4-15.2-4.2s6.8-4.2 15.2-4.2 15.2 1.4 15.2 4.2-6.8 4.2-15.2 4.2z"/>
                        </svg>
                      )
                    };
                    return (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`px-4 py-2 text-sm font-medium rounded-md flex items-center space-x-2 transition-all duration-200 ${
                          language === lang
                            ? 'bg-white shadow-sm text-blue-600 font-semibold'
                            : 'text-gray-600 hover:bg-white/50'
                        }`}
                        title={`Switch to ${languageName[lang]}`}
                      >
                        <span className="text-gray-700">{langIcons[lang]}</span>
                        <span>{languageName[lang]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Difficulty:</span>
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                  {DIFFICULTY_LEVELS.map((level) => {
                    const levelIcons = {
                      beginner: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8H4a5 5 0 014.5 3.67A6.97 6.97 0 007 16c0 .34.024.673.07 1h5.86z" />
                        </svg>
                      ),
                      intermediate: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ),
                      advanced: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      )
                    };
                    const levelNames = {
                      beginner: 'Beginner',
                      intermediate: 'Intermediate',
                      advanced: 'Advanced'
                    };
                    return (
                      <button
                        key={level}
                        onClick={() => handleDifficultyChange(level)}
                        className={`px-4 py-2 text-sm font-medium rounded-md flex items-center space-x-2 transition-all duration-200 ${
                          difficulty === level
                            ? 'bg-white shadow-sm text-blue-600 font-semibold'
                            : 'text-gray-600 hover:bg-white/50'
                        }`}
                        title={`${levelNames[level]} level`}
                      >
                        <span className="text-lg">{levelIcons[level]}</span>
                        <span>{levelNames[level]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-6 text-gray-600 mt-4">
              <span className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                {courseData.level}
              </span>
              <span>•</span>
              <span>{courseData.totalTopics} Topics</span>
              <span>•</span>
              <span>{courseData.totalHours} Hours</span>
            </div>
          </div>

          <div className="space-y-4">
            {courseData.topics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-6 py-4 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{topic.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 mr-4">
                        {topic.totalHours} hour{topic.totalHours !== 1 ? 's' : ''}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          expandedTopics[topic.id] ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {expandedTopics[topic.id] && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">SUBTOPICS</h4>
                      <div className="space-y-3">
                        {topic.subtopics.map((subtopic) => (
                          <div key={subtopic.id} className="flex items-start p-3 bg-gray-50 rounded-md">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                                {subtopic.duration}h
                              </div>
                            </div>
                            <div className="ml-3">
                              <h5 className="text-sm font-medium text-gray-900">{subtopic.name}</h5>
                              <p className="text-sm text-gray-500 mt-1">{subtopic.description}</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                {subtopic.difficulty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {courseData.topics.length > 0 ? (
            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Start Learning Path
              </button>
            </div>
          ) : (
            <div className="mt-8 text-center py-8 bg-white rounded-lg shadow">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No topics available</h3>
              <p className="mt-1 text-gray-500">We couldn't find any topics for the selected language and difficulty level.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
