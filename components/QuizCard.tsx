import { useState } from 'react';

interface QuizCardProps {
  title: string;
  description: string;
  language: string;
  questionsCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  onStart: () => void;
}

export default function QuizCard({
  title,
  description,
  language,
  questionsCount,
  difficulty,
  onStart,
}: QuizCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {language}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor()}`}>
            {difficulty}
          </span>
          <span className="text-sm text-gray-500">{questionsCount} questions</span>
        </div>
        <button
          onClick={onStart}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
