import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  TrophyIcon, 
  FireIcon, 
  StarIcon, 
  ChartBarIcon, 
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  AcademicCapIcon,
  CpuChipIcon,
  CommandLineIcon,
  CodeBracketIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// User data
const users = [
  {
    id: 1,
    name: "Raj Patel",
    points: 1250,
    completedCourses: 8,
    streak: 45,
    badges: ["Full Stack Master", "Algorithm Expert", "100 Days Coding"],
    rank: 1,
    progress: 85,
    achievements: [
      { id: 1, name: "JavaScript Champion", description: "Completed all JavaScript courses with excellence", icon: <CodeBracketIcon className="h-5 w-5" />, date: "2023-12-15" },
      { id: 2, name: "Consistent Learner", description: "Maintained a 30-day learning streak", icon: <FireIcon className="h-5 w-5" />, date: "2024-01-10" },
      { id: 3, name: "React Pioneer", description: "Built 5 React projects from scratch", icon: <CpuChipIcon className="h-5 w-5" />, date: "2024-02-20" },
    ]
  },
  {
    id: 2,
    name: "Priya Singh",
    points: 1180,
    completedCourses: 7,
    streak: 30,
    badges: ["Backend Wizard", "Database Expert"],
    rank: 2,
    progress: 78,
    achievements: [
      { id: 1, name: "SQL Master", description: "Solved 50 complex database challenges", icon: <CommandLineIcon className="h-5 w-5" />, date: "2024-01-05" },
      { id: 2, name: "Node.js Expert", description: "Created a scalable backend architecture", icon: <CodeBracketIcon className="h-5 w-5" />, date: "2024-02-15" },
    ]
  },
  {
    id: 3,
    name: "Vikram Reddy",
    points: 950,
    completedCourses: 6,
    streak: 22,
    badges: ["Frontend Designer", "Accessibility Advocate"],
    rank: 3,
    progress: 65,
    achievements: [
      { id: 1, name: "UI Master", description: "Created 10 responsive UI designs", icon: <SparklesIcon className="h-5 w-5" />, date: "2024-01-25" },
    ]
  },
  {
    id: 4,
    name: "Neha Sharma",
    points: 820,
    completedCourses: 5,
    streak: 18,
    badges: ["Mobile Dev Star"],
    rank: 4,
    progress: 60,
    achievements: [
      { id: 1, name: "React Native Explorer", description: "Built a cross-platform mobile app", icon: <CpuChipIcon className="h-5 w-5" />, date: "2024-02-05" },
    ]
  },
  {
    id: 5,
    name: "Anish Kumar",
    points: 780,
    completedCourses: 4,
    streak: 15,
    badges: ["Cloud Computing Rookie"],
    rank: 5,
    progress: 55,
    achievements: [
      { id: 1, name: "AWS Starter", description: "Deployed first cloud application", icon: <CommandLineIcon className="h-5 w-5" />, date: "2024-03-01" },
    ]
  }
];

export default function LeaderboardPage() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [showMobileStats, setShowMobileStats] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Student Leaderboard</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'leaderboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChartBarIcon className="w-5 h-5 inline mr-2" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'achievements' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrophyIcon className="w-5 h-5 inline mr-2" />
              Achievements
            </button>
          </div>
        </div>

        {activeTab === 'leaderboard' ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top 3 Winners */}
              <div className="lg:col-span-3 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performers</h2>
                <div className="flex flex-wrap justify-center items-end gap-6">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 relative">
                        {users[1].name[0].toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gray-100 rounded-full p-1 border-2 border-white">
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-xs font-semibold">2</span>
                      </div>
                      <h3 className="font-medium text-gray-700 mt-1">{users[1].name}</h3>
                      <p className="text-xs md:text-sm text-gray-500">{users[1].points} pts</p>
                    </div>
                    <div className="h-16 md:h-28"></div>
                  </div>

                  {/* 1st Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 mx-auto">
                        <TrophyIcon className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                        {users[0].name[0].toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1 border-2 border-white shadow-md">
                        <StarIcon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <span className="text-xs md:text-sm font-bold text-white">1</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mt-1">{users[0].name}</h3>
                      <p className="text-xs md:text-sm font-medium text-blue-600">{users[0].points} pts</p>
                    </div>
                    <div className="h-12 md:h-20"></div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                        {users[2].name[0].toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gray-100 rounded-full p-1 border-2 border-white">
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-xs font-semibold">3</span>
                      </div>
                      <h3 className="font-medium text-gray-700 mt-1">{users[2].name}</h3>
                      <p className="text-xs md:text-sm text-gray-500">{users[2].points} pts</p>
                    </div>
                    <div className="h-16 md:h-28"></div>
                  </div>
                </div>
              </div>

              {/* Mobile User Stats (shows when a user is selected) */}
              {showMobileStats && (
                <div className="lg:hidden p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                        {selectedUser.name[0].toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-gray-900">{selectedUser.name}</h3>
                        <p className="text-xs text-gray-500">Rank #{selectedUser.rank}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowMobileStats(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedUser.badges.map((badge, idx) => (
                      <span key={idx} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                        <CheckBadgeIcon className="h-3 w-3 mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-indigo-50 rounded-lg p-2">
                      <div className="text-xl font-bold text-gray-800">{selectedUser.points}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="text-xl font-bold text-gray-800">{selectedUser.completedCourses}</div>
                      <div className="text-xs text-gray-500">Courses</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-2">
                      <div className="text-xl font-bold text-gray-800">{selectedUser.streak}</div>
                      <div className="text-xs text-gray-500">Streak</div>
                    </div>
                  </div>
                  
                  {selectedUser.achievements.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1">Latest Achievement</h4>
                      <div className="flex items-start p-2 rounded-md bg-gray-50">
                        <div className="p-1.5 bg-white rounded-md shadow-sm mr-2">
                          {selectedUser.achievements[0].icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-800">{selectedUser.achievements[0].name}</h4>
                          <p className="text-xs text-gray-500">{selectedUser.achievements[0].description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Leaderboard Table */}
              <div className="lg:col-span-2 p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Full Rankings</h2>
                <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rank
                          </th>
                          <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points
                          </th>
                          <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Courses
                          </th>
                          <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Streak
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr 
                            key={user.id} 
                            className={`hover:bg-gray-50 cursor-pointer ${selectedUser.id === user.id ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                              setSelectedUser(user);
                              // On mobile, show the stats panel when a user is clicked
                              if (window.innerWidth < 1024) {
                                setShowMobileStats(true);
                              }
                            }}
                          >
                            <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <div className={`flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full text-xs font-medium ${
                                user.rank === 1 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : user.rank === 2
                                    ? 'bg-gray-100 text-gray-800'
                                    : user.rank === 3
                                      ? 'bg-orange-100 text-orange-800'
                                      : 'bg-blue-50 text-blue-800'
                              }`}>
                                {user.rank}
                              </div>
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-800">
                                  {user.name[0].toUpperCase()}
                                </div>
                                <div className="ml-3 md:ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="hidden md:flex text-xs text-gray-500 items-center">
                                    {user.badges.slice(0, 2).map((badge, idx) => (
                                      <span key={idx} className="inline-flex items-center mr-1">
                                        <CheckBadgeIcon className="h-3 w-3 text-blue-500 mr-1" />
                                        <span>{badge}</span>
                                      </span>
                                    ))}
                                    {user.badges.length > 2 && <span>+{user.badges.length - 2}</span>}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.points}</div>
                              <div className="text-xs text-gray-500 md:block hidden">points</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.completedCourses}</div>
                              <div className="text-xs text-gray-500">completed</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FireIcon className="w-4 h-4 text-orange-500 mr-1" />
                                <span className="text-sm text-gray-900">{user.streak} days</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Selected User Stats - Desktop Only */}
              <div className="hidden lg:block p-6 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                    Rank #{selectedUser.rank}
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {selectedUser.name[0].toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedUser.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedUser.badges.map((badge, idx) => (
                        <span key={idx} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          <CheckBadgeIcon className="h-3 w-3 mr-1" />
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-700">{selectedUser.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${selectedUser.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-3 text-center">
                      <div className="text-indigo-700 flex justify-center mb-1">
                        <StarIcon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{selectedUser.points}</div>
                      <div className="text-xs text-gray-500">Total Points</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-green-700 flex justify-center mb-1">
                        <AcademicCapIcon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{selectedUser.completedCourses}</div>
                      <div className="text-xs text-gray-500">Courses</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <div className="text-orange-700 flex justify-center mb-1">
                        <FireIcon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{selectedUser.streak}</div>
                      <div className="text-xs text-gray-500">Day Streak</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Achievements</h3>
                    <div className="space-y-2">
                      {selectedUser.achievements.slice(0, 2).map((achievement) => (
                        <div key={achievement.id} className="flex items-start p-2 rounded-md bg-gray-50">
                          <div className="p-2 bg-white rounded-md shadow-sm mr-3">
                            {achievement.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">{achievement.name}</h4>
                            <p className="text-xs text-gray-500">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievement Criteria</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center mb-2 md:mb-3">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-md mr-3">
                    <CodeBracketIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="font-medium text-gray-800">Course Completion</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600">Complete courses to earn points and unlock special achievements. Each course has a different point value based on difficulty.</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      Complete 5 courses: "Consistent Learner" badge
                    </li>
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      Complete 10 courses: "Knowledge Seeker" badge
                    </li>
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      Complete a specialized track: Track-specific badge
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center mb-2 md:mb-3">
                  <div className="p-2 bg-orange-100 text-orange-700 rounded-md mr-3">
                    <FireIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="font-medium text-gray-800">Daily Streak</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600">Maintain a consistent learning habit by logging in and completing lessons daily to build your streak.</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      7-day streak: "Quick Start" badge
                    </li>
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      30-day streak: "Consistent Learner" badge
                    </li>
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      100-day streak: "100 Days Coding" badge
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center mb-2 md:mb-3">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-md mr-3">
                    <SparklesIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="font-medium text-gray-800">Project Completion</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600">Build and submit projects to demonstrate your skills. Quality projects earn you badges and higher rankings.</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      Complete 3 projects: "Project Builder" badge
                    </li>
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      Complete 5 projects in one category: Technology-specific badge
                    </li>
                    <li className="flex items-center">
                      <CheckBadgeIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
                      Get featured project: "Featured Creator" badge
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {users.flatMap(user => user.achievements).map((achievement, index) => (
                <div key={index} className="flex items-start p-3 md:p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="p-2 md:p-3 bg-blue-50 rounded-lg mr-3 md:mr-4">
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="flex items-center flex-wrap">
                      <h3 className="font-medium text-gray-800 text-sm md:text-base mr-2">{achievement.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-1 md:mt-0">
                        {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <UserIcon className="h-3 w-3 mr-1" />
                      <span>First achieved by: {users.find(u => u.achievements.some(a => a.id === achievement.id))?.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
         </div>
       </Layout>
  );
}
