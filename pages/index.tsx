import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { FiArrowRight, FiCheck, FiStar, FiUser, FiBook, FiAward, FiTarget, FiCode, FiMessageCircle, FiMenu, FiX } from 'react-icons/fi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: 'Personalized Learning Paths',
      description: 'Our AI creates custom learning paths based on your goals, experience, and learning style.',
      icon: FiTarget,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Interactive Coding Sessions',
      description: 'Practice coding with real-time feedback and guidance from our AI tutor.',
      icon: FiCode,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Comprehensive Learning Library',
      description: 'Access a vast collection of courses, tutorials, and resources curated for your needs.',
      icon: FiBook,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Progress Tracking & Analytics',
      description: 'Monitor your learning journey with detailed analytics and performance insights.',
      icon: FiAward,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      title: 'AI-Powered Mock Interviews',
      description: 'Prepare for tech interviews with our AI interviewer that simulates real interview scenarios.',
      icon: FiUser,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Community Learning',
      description: 'Connect with peers, participate in group sessions, and learn collaboratively.',
      icon: FiMessageCircle,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Software Developer',
      image: '/testimonial1.jpg',
      content: "DevPrep AI transformed my learning experience. The personalized approach helped me understand complex coding concepts faster than any other method I've tried.",
      stars: 5
    },
    {
      id: 2,
      name: 'Samantha Lee',
      role: 'Computer Science Student',
      image: '/testimonial2.jpg',
      content: 'As a student, I found DevPrep AI invaluable. The AI tutor is like having a personal mentor available 24/7, and the interactive practice sessions significantly improved my skills.',
      stars: 5
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Career Switcher',
      image: '/testimonial3.jpg',
      content: 'Switching careers to tech was intimidating, but DevPrep AI made it approachable. The AI-powered mock interviews were game-changers for my confidence and preparation.',
      stars: 4
    }
  ];

  const faqs = [
    {
      question: 'How does the AI tutoring work?',
      answer: 'Our AI tutor analyzes your learning style, knowledge gaps, and goals to create personalized lessons. It provides real-time feedback during coding sessions and adapts to your progress over time.'
    },
    {
      question: 'Is DevPrep AI suitable for beginners?',
      answer: 'Absolutely! DevPrep AI is designed for learners at all levels. Beginners will appreciate the step-by-step guidance, while advanced users benefit from deeper dives into complex topics.'
    },
    {
      question: 'Can I access DevPrep AI on mobile devices?',
      answer: 'Yes, DevPrep AI is fully responsive and works on desktops, tablets, and mobile phones, allowing you to learn wherever and whenever is convenient for you.'
    },
    {
      question: 'Do you offer interview preparation?',
      answer: 'Yes, our AI-powered mock interviews simulate real tech interview scenarios, providing feedback on your answers and helping you improve your interview skills.'
    },
    {
      question: 'How often is the content updated?',
      answer: 'We regularly update our curriculum to keep pace with industry trends and technologies. Our AI also continuously improves based on user interactions and feedback.'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isVisible ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white rounded-lg p-2">
              <FiCode size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">DevPrep AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo(heroRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</button>
            <button onClick={() => scrollTo(featuresRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</button>
            <button onClick={() => scrollTo(testimonialsRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</button>
            <button onClick={() => scrollTo(pricingRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</button>
            <button onClick={() => scrollTo(faqRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">FAQ</button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors">
              Sign Up Free
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <button onClick={() => scrollTo(heroRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Home</button>
                <button onClick={() => scrollTo(featuresRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Features</button>
                <button onClick={() => scrollTo(testimonialsRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Testimonials</button>
                <button onClick={() => scrollTo(pricingRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Pricing</button>
                <button onClick={() => scrollTo(faqRef)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">FAQ</button>
                <div className="pt-2 flex flex-col space-y-3">
                  <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                    Login
                  </Link>
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full font-medium transition-colors text-center">
                    Sign Up Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Learn Coding with <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">AI-Powered</span> Tutoring
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  DevPrep AI uses advanced AI to create personalized learning experiences, providing real-time feedback and guidance as you master coding skills at your own pace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-8 py-4 text-center transition-colors flex items-center justify-center">
                    Get Started Free <FiArrowRight className="ml-2" />
                  </Link>
                  <Link href="/demo" className="border border-gray-300 hover:border-gray-400 bg-white text-gray-800 font-medium rounded-full px-8 py-4 text-center transition-colors">
                    Try a Demo Lesson
                  </Link>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                        <FiUser className="w-5 h-5 text-gray-600" />
                      </div>
                    ))}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">From 2,000+ happy students</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-2xl shadow-lg">
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-600">DevPrep AI AI Tutor</div>
                    <div></div>
                  </div>
                  <div className="p-6 bg-white h-72 overflow-y-auto">
                    <div className="mb-4 flex">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <FiCode className="text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-gray-800">Hi there! I'm your DevPrep AI AI Tutor. What would you like to learn today?</p>
                      </div>
                    </div>
                    <div className="mb-4 flex justify-end">
                      <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                        <p>I want to learn React Hooks. How do they work?</p>
                      </div>
                    </div>
                    <div className="mb-4 flex">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <FiCode className="text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-gray-800">React Hooks are functions that let you use state and other React features in functional components. Let's start with useState:</p>
                        <pre className="mt-2 bg-gray-800 text-white p-2 rounded text-sm overflow-x-auto">
                          <code>const [count, setCount] = useState(0);</code>
                        </pre>
                        <p className="mt-2 text-gray-800">Would you like me to explain how this works?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose DevPrep AI?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our AI-powered platform adapts to your learning style and goals, providing a truly personalized educational experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl border border-gray-200 ${index === activeFeature ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'} transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-5`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied learners who have transformed their careers with DevPrep AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <FiUser className="text-gray-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <FiStar key={i} className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that fits your learning goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for beginners to try out the platform.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Access to basic courses</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Limited AI tutoring sessions</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Community forum access</span>
                </li>
              </ul>
              <Link href="/signup" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg py-3 text-center transition-colors">
                Get Started
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="border-2 border-blue-500 rounded-2xl p-8 bg-white shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
              <p className="text-gray-600 mb-6">For dedicated learners wanting to advance quickly.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">All free features</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Unlimited AI tutoring sessions</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">All courses & learning paths</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Progress tracking & analytics</span>
                </li>
              </ul>
              <Link href="/signup?plan=pro" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-center transition-colors">
                Get Started
              </Link>
            </motion.div>

            {/* Team Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Team</h3>
              <p className="text-gray-600 mb-6">For teams and organizations.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">All Pro features</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Team management dashboard</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Progress reporting for teams</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Priority customer support</span>
                </li>
              </ul>
              <Link href="/signup?plan=team" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg py-3 text-center transition-colors">
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Have questions? We're here to help.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6 last:mb-0"
              >
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">Join thousands of students who are already mastering coding skills with DevPrep AI's AI-powered tutoring.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-full px-8 py-4 text-center transition-colors inline-flex items-center justify-center">
              Get Started Free <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/contact" className="border border-white/30 hover:bg-white/10 text-white font-medium rounded-full px-8 py-4 text-center transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 text-white rounded-lg p-2">
                  <FiCode size={20} />
                </div>
                <span className="text-xl font-bold">DevPrep AI</span>
              </div>
              <p className="text-gray-400 mb-4">Transforming education with AI-powered personalized learning experiences.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Learning Paths</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} DevPrep AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
