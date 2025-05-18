import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight, FiChevronRight, FiGithub, FiUserPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../contexts/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pageError, setPageError] = useState('');
  const [formFocus, setFormFocus] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'personal' | 'credentials' | 'complete'>('personal');
  const [formProgress, setFormProgress] = useState(33);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { signup, isLoading } = useAuth();
  
  // Refs for form elements
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  
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
    };
    
    sequence();
    
    // Initialize controls
    backgroundControls.set({ opacity: 0 });
    formControls.set({ opacity: 0, y: 20 });
    
    // Focus name input after animations
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [backgroundControls, formControls]);
  
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
  
  // Update form progress based on current step
  useEffect(() => {
    switch (currentStep) {
      case 'personal':
        setFormProgress(33);
        break;
      case 'credentials':
        setFormProgress(66);
        break;
      case 'complete':
        setFormProgress(100);
        break;
    }
  }, [currentStep]);

  // Handle first step (name & email) submission
  const handleFirstStepNext = () => {
    setPageError('');
    
    // Basic validation
    if (!name.trim()) {
      setPageError('Please enter your name');
      return;
    }
    
    if (!email.trim() || !/^\\S+@\\S+\\.\\S+$/.test(email)) {
      setPageError('Please enter a valid email address');
      return;
    }
    
    // Move to next step
    setCurrentStep('credentials');
    
    // Focus password input after transition
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 300);
  };
  
  // Handle stepping back to personal info
  const handleBackToPersonal = () => {
    setCurrentStep('personal');
    
    // Focus email input after transition
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
  };
  
  // Handle final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageError('');
    
    // Basic validation
    if (password.length < 6) {
      setPageError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setPageError('Passwords do not match');
      return;
    }
    
    if (!termsAccepted) {
      setPageError('You must accept the Terms of Service and Privacy Policy');
      return;
    }
    
    try {
      await signup(name, email, password);
      // On successful signup, AuthContext will redirect to /onboarding
      // We can optionally show the 'complete' step briefly or remove it
      setCurrentStep('complete');
    } catch (err) {
      // The alert is handled in AuthContext, but we can set local error state too.
      setPageError((err as Error).message || 'Signup failed. Please try again.');
      console.error("Signup failed on page:", err);
    }
  };

  const handleSocialSignup = (provider: string) => {
    setPageError('');
    console.log(`Sign up with ${provider}`);
    // TODO: Implement actual social signup logic using AuthContext if available, or separate API calls
    // For now, this will remain a placeholder
    alert('Social signup is not yet implemented.');
  };

  // Render the multi-step form
  const renderForm = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <motion.div
            key="personal-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    ref={nameInputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFormFocus('name')}
                    onBlur={() => setFormFocus(null)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200 sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <motion.button
                type="button"
                onClick={handleFirstStepNext}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200"
              >
                <span>Continue</span>
                <FiArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('Google')}
                    className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FcGoogle className="h-5 w-5 mr-2" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('GitHub')}
                    className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FiGithub className="h-5 w-5 mr-2" />
                    <span>GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'credentials':
        return (
          <motion.div
            key="credentials-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    ref={passwordInputRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFormFocus('password')}
                    onBlur={() => setFormFocus(null)}
                    className={`block w-full pl-10 pr-10 py-3 border ${formFocus === 'password' || password ? 'border-indigo-500' : 'border-gray-300'} rounded-xl leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200 sm:text-sm`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    ref={confirmPasswordInputRef}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFormFocus('confirmPassword')}
                    onBlur={() => setFormFocus(null)}
                    className={`block w-full pl-10 pr-10 py-3 border ${formFocus === 'confirmPassword' || confirmPassword ? 'border-indigo-500' : 'border-gray-300'} rounded-xl leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200 sm:text-sm`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="#" className="text-indigo-600 hover:text-indigo-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="button"
                  onClick={handleBackToPersonal}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Back
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        );
      
      case 'complete':
        return (
          <motion.div
            key="complete-step"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <motion.svg 
              className="w-24 h-24 text-green-500 mx-auto mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </motion.svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Account Created!</h3>
            <p className="text-gray-600 mb-6">Redirecting you to get started...</p>
          </motion.div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col justify-center items-center p-4 overflow-hidden relative">
      <AnimatePresence>
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={backgroundControls}
        >
          {/* Animated background elements */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`bg-shape-${i}`}
              className={`absolute rounded-full bg-white/5 ${ i % 3 === 0 ? 'w-32 h-32' : i % 3 === 1 ? 'w-24 h-24' : 'w-16 h-16'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: mousePosition.x * (Math.random() * 100 - 50),
                y: mousePosition.y * (Math.random() * 100 - 50),
                scale: [1, 1.1, 1],
                opacity: [0, 0.3, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={formControls}
      >
        <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl p-6 sm:p-10 border border-white/10">
          <div className="text-center mb-8">
            <motion.div 
              className="inline-block p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiUserPlus className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400">
              Join Our Community
            </h1>
            <p className="mt-3 text-sm text-gray-300">
              Create an account to get started on your learning journey.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 px-2">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-300 bg-indigo-600/30">
                    Step {currentStep === 'personal' ? 1 : currentStep === 'credentials' ? 2 : 3} of 3
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-300">
                    {formProgress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-900/50 border border-indigo-700/50">
                <motion.div 
                  style={{ width: `${formProgress}%`}} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500 ease-out"
                  initial={{ width: '0%' }}
                  animate={{ width: `${formProgress}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Display Global Form Error */}
          <AnimatePresence>
            {pageError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm text-center"
                role="alert"
              >
                {pageError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <AnimatePresence mode="wait">
              {renderForm()}
            </AnimatePresence>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                  Log in here
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">
           &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
