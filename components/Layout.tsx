import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  QuestionMarkCircleIcon, 
  ChartBarIcon, 
  CodeBracketSquareIcon, 
  BriefcaseIcon, 
  UserGroupIcon, 
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Library', href: '/library', icon: BookOpenIcon },
  { name: 'Learning Path', href: '/learning-path', icon: AcademicCapIcon },
  { name: 'Quiz', href: '/quiz', icon: QuestionMarkCircleIcon },
  { name: 'Analytics', href: '/leaderboard', icon: ChartBarIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Practice', href: '/practice-problems', icon: CodeBracketSquareIcon },
  { name: 'Interview', href: 'https://linkedin969.vercel.app/dashboard', icon: BriefcaseIcon },
  { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
  { name: 'Community', href: '/community', icon: UserGroupIcon },
];

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  // Determine if the sidebar should be expanded - either by click or by hover
  const isExpanded = expanded || hovering;
  
  // Handle hover state
  const handleMouseEnter = () => {
    if (clientSide) {
      setHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (clientSide) {
      setHovering(false);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-white shadow-md border border-gray-200"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <Bars3Icon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? 240 : 72,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-gray-200 shadow-lg overflow-y-auto rounded-tr-2xl rounded-br-2xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <CodeBracketSquareIcon className="w-7 h-7 text-blue-600 flex-shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 text-lg font-bold text-gray-900 whitespace-nowrap overflow-hidden"
                >
                  DEVPREP AI
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.name} href={item.href} passHref>
                  <motion.div
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="ml-3 whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
          
          {/* Toggle button */}
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {expanded ? (
                <ChevronLeftIcon className="w-5 h-5" />
              ) : (
                <ChevronRightIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        animate={{ 
          marginLeft: clientSide ? (isExpanded ? 240 : 72) : 72 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col h-screen overflow-y-auto bg-white transition-all duration-300 ease-in-out"
      >
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}