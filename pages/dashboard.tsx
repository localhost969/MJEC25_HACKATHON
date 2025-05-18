import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Layout from '../components/Layout';
import { 
  FiBookOpen, 
  FiBarChart2, 
  FiTarget, 
  FiAward, 
  FiCheck, 
  FiPlus, 
  FiMoreVertical, 
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronRight
} from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { 
  ChartBarIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  CalendarIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define interfaces for our data types
interface StatItem {
  name: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
  changeType: 'increase' | 'decrease';
}

interface Todo {
  id: number;
  title: string;
  description: string;
  due: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface Course {
  name: string;
  instructor: string;
  completedModules: number;
  modules: number;
  progress: number;
  nextLesson: string;
  deadline: string;
  daysLeft: number;
}

// Define API data types
interface ApiStreakDay {
  date: string; // Format "YYYY-MM-DD"
  loggedIn: boolean;
}

interface ApiUser {
  id: string;
  email: string;
  name: string;
  streak: ApiStreakDay[];
}

// Store initial mock data
const initialMockData = {
  user: {
    name: ' Ruthvik',
    streak: 12,
    level: 5,
    xp: 1250,
    nextLevelXp: 2000,
  },
  stats: [
    { name: 'Courses Enrolled', value: 8, icon: FiBookOpen, change: '+2', changeType: 'increase' as const },
    { name: 'Completion Rate', value: '78%', icon: FiBarChart2, change: '+12%', changeType: 'increase' as const },
    { name: 'Daily Goal', value: '3/5', icon: FiTarget, change: '2.1%', changeType: 'decrease' as const },
  ],
  currentCourse: {
    name: 'Advanced React Patterns',
    instructor: 'Sarah Johnson',
    completedModules: 12,
    modules: 15,
    progress: 80,
    nextLesson: 'State Management with Context API',
    deadline: '2023-12-15',
    daysLeft: 14,
  },
};

// Animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Chart data and options
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#111827',
      bodyColor: '#4B5563',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      padding: 12
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#6B7280'
      }
    },
    y: {
      grid: {
        color: '#F3F4F6'
      },
      ticks: {
        color: '#6B7280'
      }
    }
  }
};

const weeklyProgressData: ChartData<'bar'> = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Minutes',
      data: [30, 45, 60, 30, 75, 20, 40],
      backgroundColor: '#3B82F6',
      borderRadius: 6,
      barPercentage: 0.7
    }
  ]
};

export default function DashboardPage() {
  // State for tasks
  const [todos, setTodos] = useState<Todo[]>([
    { 
      id: 1, 
      title: 'Complete React assignment', 
      description: 'Build a todo app with hooks', 
      due: 'Tomorrow', 
      priority: 'high' as const, 
      completed: false 
    },
    { 
      id: 2, 
      title: 'Review JavaScript concepts', 
      description: 'Closures and prototypes', 
      due: 'In 2 days', 
      priority: 'medium' as const, 
      completed: true 
    },
    { 
      id: 3, 
      title: 'Watch CSS Grid tutorial', 
      description: 'Advanced layout techniques', 
      due: 'Next week', 
      priority: 'low' as const, 
      completed: false 
    },
  ]);

  // User-related state, initialized with mock data
  const [displayName, setDisplayName] = useState<string>(initialMockData.user.name);
  const [displayStreak, setDisplayStreak] = useState<number>(initialMockData.user.streak);
  // Represents activity for M, T, W, T, F, S, S. true = active.
  const [weekActivity, setWeekActivity] = useState<boolean[]>([true, true, true, true, true, false, false]);

  // Use mock data for parts of UI not covered by the new API
  const userProfile = initialMockData.user;
  const stats = initialMockData.stats;
  const currentCourse = initialMockData.currentCourse;

  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  // Calculate XP percentage for progress bar - uses mock data via userProfile
  const xpPercentage = Math.round((userProfile.xp / userProfile.nextLevelXp) * 100);
  const progressPercentage = (currentCourse.completedModules / currentCourse.modules) * 100;

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    // Check if task already exists
    const taskExists = todos.some(todo => 
      todo.title.toLowerCase() === newTask.toLowerCase()
    );
    
    if (!taskExists) {
      const newTaskItem: Todo = {
        id: Date.now(),
        title: newTask,
        description: '',
        due: 'No due date',
        priority: 'medium',
        completed: false
      };
      
      setTodos([...todos, newTaskItem]);
      setNewTask('');
      setShowAddTask(false);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.log('Auth token not found. Using default user data.');
        // Initial state already reflects mock data, so no action needed for fallback.
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/userinfo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          let errorMsg = response.statusText;
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || `HTTP error ${response.status}`;
          } catch (parseError) {
            // If parsing error body fails, stick with a generic error
            errorMsg = `HTTP error ${response.status}`;
          }
          console.error(`Error fetching user info: ${errorMsg}`);
          // Fallback to mock data (initial state)
          return;
        }

        const data: ApiUser = await response.json();
        
        setDisplayName(data.name ? data.name.trim() : initialMockData.user.name);

        // Calculate current streak
        let calculatedApiStreak = 0;
        if (data.streak && data.streak.length > 0) {
          // Assuming streak data is sorted, most recent day is last
          for (let i = data.streak.length - 1; i >= 0; i--) {
            if (data.streak[i].loggedIn) {
              calculatedApiStreak++;
            } else {
              break; // Streak broken
            }
          }
        }
        setDisplayStreak(calculatedApiStreak);

        // Update last 7 days activity display
        const newWeekActivity = Array(7).fill(false);
        if (data.streak && data.streak.length > 0) {
          const numDaysFromApi = data.streak.length;
          for (let i = 0; i < 7; i++) { // i=0 for Monday slot, i=6 for Sunday slot
            const apiIndex = numDaysFromApi - (7 - i); // map to API array (0..len-1)
            if (apiIndex >= 0 && apiIndex < numDaysFromApi) {
              newWeekActivity[i] = data.streak[apiIndex].loggedIn;
            }
          }
        }
        setWeekActivity(newWeekActivity);

      } catch (error) {
        console.error('Failed to fetch user info:', error instanceof Error ? error.message : String(error));
        // Fallback to mock data (initial state)
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        {/* Welcome Section */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
          <p className="mt-1 text-sm text-gray-500">Here's your learning progress at a glance</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.name}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              variants={item}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.changeType === 'increase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className={`mt-4 flex items-center text-sm ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <FiTrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <FiTrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{stat.change} from last week</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Progress */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Current Course</h2>
                <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {currentCourse.progress}% Complete
                </span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{currentCourse.name}</h3>
              <p className="text-gray-600 mb-6">Instructor: {currentCourse.instructor}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{currentCourse.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${currentCourse.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500">Next Lesson</p>
                  <p className="font-medium">{currentCourse.nextLesson}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modules</p>
                  <p className="font-medium">{currentCourse.completedModules} of {currentCourse.modules} completed</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{new Date(currentCourse.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Days Left</p>
                  <p className="font-medium">{currentCourse.daysLeft} days</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                  Continue Learning
                </button>
              </div>
            </motion.div>

            {/* Weekly Progress Chart */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Progress</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64">
                <Bar data={weeklyProgressData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Tasks */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
                <button 
                  onClick={() => setShowAddTask(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <FiPlus className="mr-1" /> Add Task
                </button>
              </div>
              
              <AnimatePresence>
                {showAddTask && (
                  <motion.div 
                    className="mb-4 p-4 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={addTask} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          placeholder="Task title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowAddTask(false)}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Add Task
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {todos.map((todo) => (
                    <motion.div
                      key={todo.id}
                      className={`p-4 rounded-lg border ${
                        todo.completed 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-white border-gray-200 shadow-xs hover:shadow-sm'
                      } transition-all`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                    >
                      <div className="flex items-start">
                        <button 
                          onClick={() => toggleTodo(todo.id)}
                          className={`flex-shrink-0 w-5 h-5 mt-0.5 mr-3 rounded-full border ${
                            todo.completed 
                              ? 'bg-blue-600 border-blue-600 flex items-center justify-center' 
                              : 'border-gray-300'
                          }`}
                        >
                          {todo.completed && <FiCheck className="w-3 h-3 text-white" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {todo.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{todo.description}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <FiClock className="w-3 h-3 mr-1" />
                            <span>{todo.due}</span>
                            <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium ${
                              todo.priority === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : todo.priority === 'medium' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                            </span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FiMoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {todos.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No tasks yet. Add one to get started!</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Learning Streak */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50"></div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6 relative z-10">Learning Streak</h2>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-indigo-600">{displayStreak} days</div>
                  <p className="text-sm text-gray-500 mt-1">Keep going! You're building a habit.</p>
                </div>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FireIcon className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Current</span>
                  <span>Best: 60 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((displayStreak / 60) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                    weekActivity[i] ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Upcoming Deadlines */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Deadlines</h2>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">React Project Submission</h3>
                      <p className="text-sm text-gray-500">Advanced React Patterns</p>
                    </div>
                    <div className="text-sm font-medium text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                      2 days left
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Algorithm Quiz</h3>
                      <p className="text-sm text-gray-500">Data Structures & Algorithms</p>
                    </div>
                    <div className="text-sm font-medium text-red-800 bg-red-100 px-2 py-1 rounded">
                      Tomorrow
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Group Discussion</h3>
                      <p className="text-sm text-gray-500">System Design Principles</p>
                    </div>
                    <div className="text-sm font-medium text-green-800 bg-green-100 px-2 py-1 rounded">
                      Next week
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
