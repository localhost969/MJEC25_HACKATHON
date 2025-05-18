import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CodeEditor from '../../components/practice/CodeEditor';
import TestCaseAnimator from '../../components/practice/TestCaseAnimator';
import TestCaseDetails from '../../components/practice/TestCaseDetails';
import ConsoleOutput from '../../components/practice/ConsoleOutput';
import { 
  PlayIcon, 
  CheckIcon, 
  ArrowLeftIcon,
  DocumentTextIcon,
  BoltIcon,
  LightBulbIcon,
  InformationCircleIcon,
  ClockIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getProblemBySlug } from '../../lib/practiceProblems';
import { validateSolution, getFunctionName } from '../../lib/codeExecutor';

// Define result type
type TestResult = {
  testCase: any;
  passed: boolean;
  output?: any;
  expectedOutput: any;
  error?: string;
  executionTime: number;
};

// Add the TestCaseResult type to match the TestCaseAnimator component
type TestCaseResult = {
  id: number;
  input: any;
  expected: any;
  output?: any;
  status: 'pending' | 'running' | 'passed' | 'failed';
  executionTime?: number;
};

export default function PracticeProblemPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'description' | 'code'>('description');
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  
  // Fetch problem data
  useEffect(() => {
    if (slug) {
      const problemData = getProblemBySlug(slug as string);
      
      if (problemData) {
        setProblem(problemData);
        setBookmarked(problemData.bookmarked);
        setCode(problemData.starterCode[language]);
      }
      
      setLoading(false);
    }
  }, [slug, language]);
  
  const runCode = () => {
    if (!problem) return;
    
    setRunStatus('running');
    setShowOutput(true);
    setIsAnimating(true);
    
    // Reset previous results
    setTestResults([]);
    
    // Run all test cases - changed to run all test cases instead of just the first one
    const testCasesToRun = problem.testCases;
    
    // Hide any previous output during animation
    setOutput('');
    
    // Generate console output for all test cases
    generateConsoleOutput(testCasesToRun, false);
    
    // Validate solution
    setTimeout(() => {
      const functionName = getFunctionName(problem.slug, language);
      const results = validateSolution(problem.slug, code, language, testCasesToRun).results;
      setTestResults(results);
    }, 500);
  };
  
  const submitSolution = () => {
    if (!problem) return;
    
    setRunStatus('running');
    setShowOutput(true);
    setIsAnimating(true);
    
    // Reset previous results
    setTestResults([]);
    
    // Hide any previous output during animation
    setOutput('');
    
    // Generate console output for all test cases
    generateConsoleOutput(problem.testCases, true);
    
    // Validate solution
    setTimeout(() => {
      const functionName = getFunctionName(problem.slug, language);
      const validationResult = validateSolution(problem.slug, code, language, problem.testCases);
      setTestResults(validationResult.results);
    }, 500);
  };
  
  const generateConsoleOutput = (testCases: any[], isSubmit: boolean) => {
    if (!problem) return;
    
    // Clear previous console output
    setConsoleLines([]);
    
    // Add initial console lines
    const newConsoleLines = [
      `> Running ${language === 'javascript' ? 'JavaScript' : 'Python'} code...`,
      `> Function: ${getFunctionName(problem.slug, language)}`
    ];
    
    // Add the code being executed (shortened)
    const codePreview = code.split('\n').slice(0, 3).join('\n') + (code.split('\n').length > 3 ? '\n// ...' : '');
    newConsoleLines.push('```');
    newConsoleLines.push(codePreview);
    newConsoleLines.push('```');
    
    if (isSubmit) {
      newConsoleLines.push(`> Running ${testCases.length} test cases...`);
    } else {
      newConsoleLines.push('> Running sample test case...');
    }
    
    // Set initial console lines
    setConsoleLines(newConsoleLines);
  };
  
  const handleAnimationComplete = (results: TestCaseResult[]) => {
    setIsAnimating(false);
    
    // Convert TestCaseResult to TestResult for consistency
    const convertedResults: TestResult[] = results.map(result => ({
      testCase: { id: result.id + 1, input: result.input, expected: result.expected },
      passed: result.status === 'passed',
      output: result.output,
      expectedOutput: result.expected,
      error: result.status === 'failed' ? 'Output does not match expected result' : undefined,
      executionTime: result.executionTime || 0
    }));
    
    // Add result lines to console output
    const resultLines = convertedResults.map((result, index) => {
      const input = JSON.stringify(result.testCase.input);
      const expected = JSON.stringify(result.testCase.expected);
      const output = result.output ? JSON.stringify(result.output) : 'undefined';
      
      return [
        `> Test Case ${result.testCase.id}:`,
        `  Input: ${input}`,
        `  Expected: ${expected}`,
        `  Output: ${output}`,
        `  Status: ${result.passed ? 'Passed ✓' : 'Failed ✗'} (${result.executionTime}ms)`
      ];
    }).flat();
    
    // Check if all tests passed
    const allPassed = convertedResults.every(result => result.passed);
    
    // Add summary
    resultLines.push('');
    resultLines.push(`> ${allPassed ? 'All test cases passed! 🎉' : `${convertedResults.filter(r => r.passed).length}/${convertedResults.length} test cases passed.`}`);
    
    // Update console output
    setConsoleLines(prev => [...prev, ...resultLines]);
    
    // Set status and output message
    setRunStatus(allPassed ? 'success' : 'error');
    setOutput(
      allPassed 
        ? `All ${convertedResults.length} test cases passed!` 
        : `${convertedResults.filter(r => r.passed).length}/${convertedResults.length} test cases passed.`
    );
    
    // Update the test results state
    setTestResults(convertedResults);
  };
  
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };
  
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, this would save to the user's profile
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  if (!problem) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Problem Not Found</h1>
          <p className="text-gray-600 mb-6">The problem you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/practice-problems" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Problem List
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Link
              href="/practice-problems"
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              {problem.id}. {problem.title}
              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                problem.difficulty === 'Easy' 
                  ? 'bg-green-100 text-green-800' 
                  : problem.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {problem.difficulty}
              </span>
            </h1>
          </div>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-md ${bookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex text-sm space-x-4 text-gray-500 mb-4">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Acceptance: {problem.acceptance.toFixed(1)}%</span>
          </div>
          <div className="flex items-center">
            <span>Likes: {problem.likes}</span>
          </div>
          <div className="flex items-center">
            <span>Dislikes: {problem.dislikes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Companies:</span>
            {problem.companies.slice(0, 3).map((company: string, index: number) => (
              <span key={index} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                {company}
              </span>
            ))}
            {problem.companies.length > 3 && (
              <span className="text-xs">+{problem.companies.length - 3}</span>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('description')}
                className={`${
                  activeTab === 'description'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
              >
                <DocumentTextIcon className="h-5 w-5 inline mr-2 -mt-0.5" />
                Problem Description
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`${
                  activeTab === 'code'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code Editor
              </button>
            </nav>
          </div>

          {activeTab === 'description' ? (
            <div className="p-4 md:p-6 overflow-auto">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">{problem.description}</p>
                
                <h3 className="font-medium text-lg mt-6 mb-2">Examples:</h3>
                {problem.examples.map((example: any, index: number) => (
                  <div key={index} className="mb-4 bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-mono mb-2">
                      <span className="font-semibold">Input:</span> {example.input}
                    </p>
                    <p className="text-sm font-mono mb-2">
                      <span className="font-semibold">Output:</span> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="text-sm mb-0">
                        <span className="font-semibold">Explanation:</span> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
                
                <h3 className="font-medium text-lg mt-6 mb-2">Constraints:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {problem.constraints.map((constraint: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 font-mono">{constraint}</li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-medium text-lg text-blue-800 mb-2">Approach Hints:</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    {problem.slug === 'two-sum' && (
                      <>
                        <li className="text-sm">Consider using a hash map to store values you've seen so far</li>
                        <li className="text-sm">For each number, check if its complement (target - current) exists in the map</li>
                        <li className="text-sm">A brute force approach using nested loops would work but has O(n²) time complexity</li>
                      </>
                    )}
                    {problem.slug === 'reverse-string' && (
                      <>
                        <li className="text-sm">Try using two pointers approach - one at the beginning and one at the end</li>
                        <li className="text-sm">Swap elements as you move the pointers toward the center</li>
                        <li className="text-sm">Remember to modify the input array in-place</li>
                      </>
                    )}
                    {problem.slug === 'palindrome-number' && (
                      <>
                        <li className="text-sm">Consider edge cases: negative numbers and numbers ending with 0</li>
                        <li className="text-sm">You could convert to string, but try solving without conversion</li>
                        <li className="text-sm">Reversing half the number can be efficient</li>
                      </>
                    )}
                    {problem.slug === 'valid-parentheses' && (
                      <>
                        <li className="text-sm">Consider using a stack data structure</li>
                        <li className="text-sm">Push opening brackets onto the stack</li>
                        <li className="text-sm">When you encounter a closing bracket, check if it matches the top of the stack</li>
                      </>
                    )}
                    {problem.slug === 'maximum-subarray' && (
                      <>
                        <li className="text-sm">Consider using Kadane's algorithm</li>
                        <li className="text-sm">Track the current sum and the maximum sum</li>
                        <li className="text-sm">For each element, decide whether to start a new subarray or extend the current one</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <label htmlFor="language-select" className="text-sm font-medium text-gray-700 mr-2">
                    Language:
                  </label>
                  <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    disabled={runStatus === 'running' || isAnimating}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md ${
                      runStatus === 'running' || isAnimating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {isAnimating ? (
                      <>
                        <BoltIcon className="animate-pulse -ml-0.5 mr-2 h-4 w-4" />
                        Running...
                      </>
                    ) : (
                      <>
                        <PlayIcon className="-ml-0.5 mr-2 h-4 w-4" />
                        Run
                      </>
                    )}
                  </button>
                  <button
                    onClick={submitSolution}
                    disabled={runStatus === 'running' || isAnimating}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md ${
                      runStatus === 'running' || isAnimating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                    }`}
                  >
                    {isAnimating ? (
                      <>
                        <BoltIcon className="animate-pulse -ml-0.5 mr-2 h-4 w-4" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <CheckIcon className="-ml-0.5 mr-2 h-4 w-4" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Code Editor Component */}
              <CodeEditor 
                code={code}
                language={language}
                onChange={setCode}
              />
              
              {/* Console Output */}
              {showOutput && (
                <ConsoleOutput 
                  output={consoleLines}
                  isRunning={isAnimating}
                />
              )}
              
              {/* Show solution button */}
              <div className="mt-2 flex justify-end">
                <button
                  onClick={toggleSolution}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <LightBulbIcon className="h-4 w-4 mr-1" />
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
              
              {/* Solution display */}
              {showSolution && problem.solution && (
                <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-yellow-800">Solution ({language}):</h4>
                  </div>
                  <pre className="bg-white p-3 rounded border border-yellow-100 text-sm font-mono overflow-x-auto">
                    {problem.solution[language]}
                  </pre>
                  <p className="text-xs text-yellow-700 mt-2 flex items-center">
                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                    Try to understand the solution before using it.
                  </p>
                </div>
              )}
              
              {/* Test Case Results */}
              {isAnimating && (
                <TestCaseAnimator
                  testCases={!isAnimating ? [] : 
                    (consoleLines.some(line => line.includes('sample test case'))) ? 
                      [problem.testCases[0]] : 
                      problem.testCases}
                  userCode={code}
                  language={language}
                  onComplete={handleAnimationComplete}
                  isSubmit={!consoleLines.some(line => line.includes('sample test case'))}
                />
              )}
              
              {/* Display Test Results after animation */}
              {!isAnimating && showOutput && testResults.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className={`p-3 rounded-md ${
                    runStatus === 'success' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className="text-sm font-medium flex items-center">
                      {runStatus === 'success' ? (
                        <>
                          <CheckIcon className="h-5 w-5 text-green-500 mr-1.5" />
                          <span className="text-green-800">Success: {output}</span>
                        </>
                      ) : (
                        <>
                          <InformationCircleIcon className="h-5 w-5 text-red-500 mr-1.5" />
                          <span className="text-red-800">{output}</span>
                        </>
                      )}
                    </p>
                  </div>
                  
                  {/* Detailed test results */}
                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <TestCaseDetails
                        key={index}
                        testCase={result.testCase}
                        index={index}
                        result={result}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 