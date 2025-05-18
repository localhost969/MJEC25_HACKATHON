import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

type TestCaseResult = {
  id: number;
  input: any;
  expected: any;
  output?: any;
  status: 'pending' | 'running' | 'passed' | 'failed';
  executionTime?: number;
};

interface TestCaseAnimatorProps {
  testCases: any[];
  userCode: string;
  language: string;
  onComplete: (results: TestCaseResult[]) => void;
  isSubmit?: boolean;
}

const TestCaseAnimator: React.FC<TestCaseAnimatorProps> = ({
  testCases,
  userCode,
  language,
  onComplete,
  isSubmit = false
}) => {
  const [results, setResults] = useState<TestCaseResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allComplete, setAllComplete] = useState(false);
  const [firstTestPassed, setFirstTestPassed] = useState(false);

  // Initialize test cases on component mount
  useEffect(() => {
    const initialResults = testCases.map((testCase, index) => ({
      id: index,
      input: testCase.input,
      expected: testCase.expected,
      status: 'pending' as const,
    }));
    
    setResults(initialResults);
    setCurrentIndex(0);
    setAllComplete(false);
    setFirstTestPassed(false);
  }, [testCases, userCode]);

  // Process test cases one by one with animation
  useEffect(() => {
    if (currentIndex >= testCases.length) {
      setAllComplete(true);
      onComplete(results);
      return;
    }

    // Mark current test case as running
    setResults(prev => 
      prev.map((result, idx) => 
        idx === currentIndex 
          ? { ...result, status: 'running' } 
          : result
      )
    );

    // Simulate test case execution with random timing
    const executionTime = Math.floor(Math.random() * 500) + 300; // 300-800ms

    const timer = setTimeout(() => {
      // Simulate code execution (in real app, this would be actual code execution)
      try {
        let output: any;
        let isPassed = false;
        
        // This is demo code that simulates executing user code against test cases
        if (language === 'javascript') {
          if (currentIndex === 0 || isSubmit || firstTestPassed) {
            // For Two Sum problem, check if the code is correct
            if (testCases[currentIndex].input.nums) {
              // Two Sum
              const { nums, target } = testCases[currentIndex].input;
              
              // Simulate execution - this would be real execution in a production app
              // For demo, check if the code contains key elements of the solution
              const isSolutionCorrect = userCode.includes('Map') || 
                (userCode.includes('for') && userCode.includes('has(') && userCode.includes('get('));
              
              isPassed = isSolutionCorrect;
              output = isPassed ? testCases[currentIndex].expected : [0, 0];
              
              // Set firstTestPassed if this is the first test and it passed
              if (currentIndex === 0 && isPassed) {
                setFirstTestPassed(true);
              }
            } else if (testCases[currentIndex].input.s) {
              // Reverse String
              const isSolutionCorrect = userCode.includes('left') && 
                userCode.includes('right') && 
                userCode.includes('while');
              
              isPassed = isSolutionCorrect;
              output = isPassed ? testCases[currentIndex].expected : ["Failed output"];
              
              // Set firstTestPassed if this is the first test and it passed
              if (currentIndex === 0 && isPassed) {
                setFirstTestPassed(true);
              }
            } else {
              // Generic test case
              isPassed = Math.random() > 0.2; // 80% chance to pass
              output = isPassed ? testCases[currentIndex].expected : "Failed output";
              
              // Set firstTestPassed if this is the first test and it passed
              if (currentIndex === 0 && isPassed) {
                setFirstTestPassed(true);
              }
            }
          } else {
            // If first test case failed and not submit mode, fail this one too
            isPassed = false;
            output = "Test skipped - fix earlier test cases first";
          }
        } else {
          // Python simulation
          if (currentIndex === 0 || isSubmit || firstTestPassed) {
            // Check if the Python code contains key solution patterns
            const isSolutionCorrect = (userCode.includes('dict') || userCode.includes('{}')) &&
              userCode.includes('enumerate') && 
              userCode.includes('return');
            
            isPassed = isSolutionCorrect;
            output = isPassed ? "Correct Python output" : "Incorrect Python output";
            
            // Set firstTestPassed if this is the first test and it passed
            if (currentIndex === 0 && isPassed) {
              setFirstTestPassed(true);
            }
          } else {
            // If first test case failed and not submit mode, fail this one too
            isPassed = false;
            output = "Test skipped - fix earlier test cases first";
          }
        }

        // Update the current test case result
        setResults(prev => 
          prev.map((result, idx) => 
            idx === currentIndex 
              ? { 
                  ...result, 
                  status: isPassed ? 'passed' : 'failed',
                  output,
                  executionTime
                } 
              : result
          )
        );

        // Move to the next test case if it passed or if we're in submit mode
        if (isPassed || isSubmit) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // If it failed and we're not in submit mode, only show remaining tests as pending
          setResults(prev => 
            prev.map((result, idx) => 
              idx > currentIndex 
                ? { ...result, status: 'pending' }
                : result
            )
          );
          setAllComplete(true);
          onComplete(results.map((result, idx) => 
            idx > currentIndex 
              ? { ...result, status: 'pending' }
              : result
          ));
        }
      } catch (error) {
        // Update with error
        setResults(prev => 
          prev.map((result, idx) => 
            idx === currentIndex 
              ? { 
                  ...result, 
                  status: 'failed',
                  output: `Error: ${error instanceof Error ? error.message : String(error)}`,
                  executionTime
                } 
              : result
          )
        );
        // Stop at the error unless it's submit mode
        if (isSubmit) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setAllComplete(true);
          onComplete(results.map((result, idx) => 
            idx > currentIndex 
              ? { ...result, status: 'pending' }
              : result
          ));
        }
      }
    }, isSubmit ? executionTime : Math.min(executionTime, 500)); // Faster animation for Run vs Submit

    return () => clearTimeout(timer);
  }, [currentIndex, testCases, userCode, language, isSubmit, results, onComplete, firstTestPassed]);

  return (
    <div className="space-y-3 mt-3">
      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
        {isSubmit ? 'Running All Test Cases:' : 'Test Case Results:'}
      </h4>
      
      <div className="space-y-2">
        {results.map((result) => (
          <div 
            key={result.id} 
            className={`flex items-start p-3 rounded-md border transition-all duration-200 ${
              result.status === 'passed' 
                ? 'bg-green-50 border-green-200' 
                : result.status === 'failed'
                  ? 'bg-red-50 border-red-200'
                  : result.status === 'running'
                    ? 'bg-blue-50 border-blue-200 shadow-md'
                    : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mr-3">
              {result.status === 'passed' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              ) : result.status === 'failed' ? (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              ) : result.status === 'running' ? (
                <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium">
                  Test Case {result.id + 1}
                </p>
                {result.executionTime && (
                  <span className="text-xs text-gray-500">
                    {result.executionTime}ms
                  </span>
                )}
              </div>
              
              <p className="text-xs text-gray-600 font-mono mt-1 break-all">
                Input: {JSON.stringify(result.input)}
              </p>
              
              {result.status !== 'pending' && (
                <>
                  <p className="text-xs text-gray-600 font-mono mt-1 break-all">
                    Expected: {JSON.stringify(result.expected)}
                  </p>
                  
                  {result.output !== undefined && (
                    <p className={`text-xs font-mono mt-1 break-all ${
                      result.status === 'failed' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      Your Output: {JSON.stringify(result.output)}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {allComplete && isSubmit && (
        <div className={`mt-4 p-3 rounded-md ${
          results.every(r => r.status === 'passed')
            ? 'bg-green-100 border border-green-200'
            : 'bg-yellow-100 border border-yellow-200'
        }`}>
          <p className="text-sm font-medium">
            {results.every(r => r.status === 'passed')
              ? '🎉 All test cases passed!'
              : `${results.filter(r => r.status === 'passed').length}/${results.length} test cases passed.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestCaseAnimator; 