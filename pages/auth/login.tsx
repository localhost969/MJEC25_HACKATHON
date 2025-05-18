import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCode, FiLogIn, FiUser, FiUserPlus, FiTarget } from 'react-icons/fi';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pageError, setPageError] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const { login, signup, isLoading } = useAuth();
  
  // Animation controls
  const controls = useAnimation();
  const backgroundControls = useAnimation();
  const formControls = useAnimation();
  
  // Parallax effect for background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Animation sequence on mount
  useEffect(() => {
    const sequence = async () => {
      await backgroundControls.start({ opacity: 1, transition: { duration: 1.2 } });
      await formControls.start({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } });
      setAnimationComplete(true);
    };
    
    sequence();
    
    // Initialize controls
    backgroundControls.set({ opacity: 0 });
    formControls.set({ opacity: 0, y: 20 });
    
    // Focus input after animations
    const timer = setTimeout(() => {
      if (isSignUpMode) {
        fullNameInputRef.current?.focus();
      } else {
        emailInputRef.current?.focus();
      }
    }, 1800);
    
    return () => clearTimeout(timer);
  }, [backgroundControls, formControls, isSignUpMode]);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageError('');

    if (isSignUpMode) {
      if (!fullName || !email || !password || !confirmPassword) {
        setPageError('All fields are required for sign-up.');
        return;
      }
      if (password !== confirmPassword) {
        setPageError('Passwords do not match.');
        return;
      }
      try {
        await signup(fullName, email, password);
      } catch (error) {
        setPageError((error as Error).message || 'Sign-up failed. Please try again.');
        console.error('Sign-up failed on page:', error);
      }
    } else {
      if (!email || !password) {
        setPageError('Email and password are required.');
        return;
      }
      try {
        await login(email, password);
      } catch (error) {
        setPageError((error as Error).message || 'Login failed. Please check your credentials.');
        console.error('Login failed on page:', error);
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-100 relative">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20 overflow-hidden"
        animate={backgroundControls}
        initial={{ opacity: 0 }}
      >
        <motion.div 
          className="absolute -top-[10%] -right-[10%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl"
          animate={{ 
            x: mousePosition.x * 20, 
            y: mousePosition.y * 20,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 8, repeat: Infinity }
          }}
        />
        <motion.div 
          className="absolute top-[50%] -left-[5%] w-[25%] h-[25%] rounded-full bg-gradient-to-tr from-cyan-300/20 to-blue-500/20 blur-3xl"
          animate={{ 
            x: mousePosition.x * -15, 
            y: mousePosition.y * -15,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 40 },
            y: { type: "spring", stiffness: 40 },
            scale: { duration: 6, repeat: Infinity, delay: 1 }
          }}
        />
        <motion.div 
          className="absolute -bottom-[10%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-500/10 blur-3xl"
          animate={{ 
            x: mousePosition.x * 10, 
            y: mousePosition.y * 10,
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 30 },
            y: { type: "spring", stiffness: 30 },
            scale: { duration: 7, repeat: Infinity, delay: 2 }
          }}
        />
      </motion.div>
      
      {/* Website Brand */}
      <Link href="/" className="absolute top-6 left-6 z-10 flex items-center space-x-3 group">
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-2.5 overflow-hidden relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <FiCode size={20} className="relative z-10" />
          <motion.div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            initial={{ x: "-100%" }}
            animate={{ x: mousePosition.x > 0 ? "0%" : "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </motion.div>
        <motion.span
          className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          DevPrepAI
        </motion.span>
      </Link>

      {/* Main Container */}
      <div className="flex min-h-screen w-full">
        {/* Left Side - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[...Array(8)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M${i * 10},100 C${i * 10 + 5},${50 + Math.random() * 20} ${i * 10 + 10},${30 + Math.random() * 30} ${i * 10 + 20},0`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  fill="none"
                  animate={{ 
                    d: [
                      `M${i * 10},100 C${i * 10 + 5},${50 + Math.random() * 20} ${i * 10 + 10},${30 + Math.random() * 30} ${i * 10 + 20},0`,
                      `M${i * 10},100 C${i * 10 + 5},${60 + Math.random() * 20} ${i * 10 + 10},${20 + Math.random() * 30} ${i * 10 + 20},0`,
                      `M${i * 10},100 C${i * 10 + 5},${40 + Math.random() * 20} ${i * 10 + 10},${50 + Math.random() * 30} ${i * 10 + 20},0`,
                      `M${i * 10},100 C${i * 10 + 5},${50 + Math.random() * 20} ${i * 10 + 10},${30 + Math.random() * 30} ${i * 10 + 20},0`
                    ] 
                  }}
                  transition={{ 
                    duration: 10 + i, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col justify-between h-full w-full px-12 py-16">
            <div>
              <motion.h2 
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Welcome to your <br />learning journey
              </motion.h2>
              <motion.p 
                className="text-blue-100 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Sign in to continue your personalized learning experience. Track your progress, access your courses, and connect with fellow learners.
              </motion.p>
            </div>
            
            <motion.div 
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <FiTarget size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Personalized Learning</h3>
                    <p className="text-blue-100 text-sm">AI-tailored to your learning style</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <FiCode size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Interactive Coding</h3>
                    <p className="text-blue-100 text-sm">Hands-on practice with feedback</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 lg:p-16">
          <motion.div 
            className="w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden p-8 md:p-12 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={formControls}
          >
            <AnimatePresence>
              {pageError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-center"
                  role="alert"
                >
                  {pageError}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {isSignUpMode ? 'Create Account' : 'Welcome back'}
              </motion.h1>
              <motion.p 
                className="text-gray-600 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {isSignUpMode ? 'Join DevPrepAI today' : 'Sign in to your DevPrepAI account'}
              </motion.p>
            </div>

            {/* Login Form with animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.form 
                  key={isSignUpMode ? "signup-form" : "login-form"}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0, x: isSignUpMode ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isSignUpMode ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    {isSignUpMode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <motion.div
                              animate={{ 
                                color: formFocus === 'fullName' ? '#3b82f6' : '#9ca3af'
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiUser className="h-5 w-5" />
                            </motion.div>
                          </div>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            required
                            ref={fullNameInputRef}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onFocus={() => setFormFocus('fullName')}
                            onBlur={() => setFormFocus(null)}
                            className={`block w-full pl-10 pr-3 py-3.5 border ${formFocus === 'fullName' || fullName ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'} rounded-xl leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 sm:text-sm shadow-sm`}
                            placeholder="Your Full Name"
                          />
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      // No whileFocus/whileTap here, applied on individual input wrappers
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <motion.div
                            animate={{ 
                              color: formFocus === 'email' ? '#3b82f6' : '#9ca3af'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiMail className="h-5 w-5" />
                          </motion.div>
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          ref={emailInputRef}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFormFocus('email')}
                          onBlur={() => setFormFocus(null)}
                          className={`block w-full pl-10 pr-3 py-3.5 border ${formFocus === 'email' || email ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'} rounded-xl leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 sm:text-sm shadow-sm`}
                          placeholder="you@example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      // No whileFocus/whileTap here, applied on individual input wrappers
                    >
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <motion.div
                            animate={{ 
                              color: formFocus === 'password' ? '#3b82f6' : '#9ca3af'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiLock className="h-5 w-5" />
                          </motion.div>
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete={isSignUpMode ? "new-password" : "current-password"}
                          required
                          ref={passwordInputRef}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFormFocus('password')}
                          onBlur={() => setFormFocus(null)}
                          className={`block w-full pl-10 pr-10 py-3.5 border ${formFocus === 'password' || password ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'} rounded-xl leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 sm:text-sm shadow-sm`}
                          placeholder="Enter your password"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                          >
                            {showPassword ? (
                              <FiEyeOff className="h-5 w-5" />
                            ) : (
                              <FiEye className="h-5 w-5" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {isSignUpMode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <motion.div
                              animate={{ 
                                color: formFocus === 'confirmPassword' ? '#3b82f6' : '#9ca3af'
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiLock className="h-5 w-5" />
                            </motion.div>
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            ref={confirmPasswordInputRef}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setFormFocus('confirmPassword')}
                            onBlur={() => setFormFocus(null)}
                            className={`block w-full pl-10 pr-10 py-3.5 border ${formFocus === 'confirmPassword' || confirmPassword ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'} rounded-xl leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 sm:text-sm shadow-sm`}
                            placeholder="Confirm your password"
                          />
                           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              >
                                {showPassword ? (
                                  <FiEyeOff className="h-5 w-5" />
                                ) : (
                                  <FiEye className="h-5 w-5" />
                                )}
                              </motion.button>
                            </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>

                    {!isSignUpMode && (
                      <motion.div 
                        className="text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                          Forgot password?
                        </a>
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(99, 102, 241, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        isSignUpMode ? <FiUserPlus className="mr-2 h-5 w-5" /> : <FiLogIn className="mr-2 h-5 w-5" />
                      )}
                      {isLoading ? (isSignUpMode ? 'Signing Up...' : 'Signing In...') : (isSignUpMode ? 'Sign Up' : 'Sign In')}
                    </motion.button>
                  </div>
                </motion.form>
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              className="mt-8 text-center border-t border-gray-200 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-600">
                {isSignUpMode ? 'Already have an account? ' : "Don't have an account? "}
                <motion.button
                  onClick={() => {
                    setIsSignUpMode(!isSignUpMode);
                    setPageError(''); // Clear errors when switching mode
                    // Reset form fields when switching mode
                    setEmail('');
                    setPassword('');
                    setFullName('');
                    setConfirmPassword('');
                    setFormFocus(null);
                    // Focus appropriate input after mode switch
                    setTimeout(() => {
                      if (!isSignUpMode) { // about to switch to SignUp
                        fullNameInputRef.current?.focus();
                      } else { // about to switch to SignIn
                        emailInputRef.current?.focus();
                      }
                    }, 0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-medium text-blue-600 hover:text-blue-500 inline-block bg-transparent border-none p-0 cursor-pointer"
                >
                  {isSignUpMode ? 'Sign In' : 'Sign Up'}
                </motion.button>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
