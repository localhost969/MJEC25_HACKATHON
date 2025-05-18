import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface TestCaseDetailsProps {
  testCase: any;
  index: number;
  result?: {
    status: 'pending' | 'running' | 'passed' | 'failed';
    output?: any;
    executionTime?: number;
  };
}

const TestCaseDetails: React.FC<TestCaseDetailsProps> = ({ testCase, index, result }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const getInputString = () => {
    if (testCase.input.nums) {
      // Format for TwoSum
      return `nums = ${JSON.stringify(testCase.input.nums)}, target = ${testCase.input.target}`;
    } else if (testCase.input.s) {
      // Format for ReverseString
      return `s = ${JSON.stringify(testCase.input.s)}`;
    }
    return JSON.stringify(testCase.input);
  };

  const getExpectedString = () => {
    return JSON.stringify(testCase.expected);
  };

  const getOutputString = () => {
    return result?.output !== undefined ? JSON.stringify(result.output) : 'No output yet';
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div 
        className={`p-3 cursor-pointer flex items-center justify-between ${
          result?.status === 'failed' ? 'bg-red-50' : 
          result?.status === 'passed' ? 'bg-green-50' : 
          'bg-gray-50'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <span className="font-medium text-sm mr-2">Test Case {index + 1}</span>
          {result?.status === 'passed' && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Passed
            </span>
          )}
          {result?.status === 'failed' && (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
              Failed
            </span>
          )}
        </div>
        
        <div className="flex items-center">
          {result?.executionTime && (
            <span className="text-xs text-gray-500 mr-2">{result.executionTime}ms</span>
          )}
          {expanded ? (
            <ChevronUpIcon className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="bg-white p-4 border-t border-gray-200">
          <div className="space-y-4">
            {/* Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-semibold text-gray-500 uppercase">Input:</h4>
                <button 
                  onClick={() => handleCopy(getInputString(), 'input')}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <DocumentDuplicateIcon className="h-3.5 w-3.5 mr-1" />
                  {copied === 'input' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-50 p-2 rounded font-mono text-sm overflow-x-auto">
                {getInputString()}
              </div>
            </div>
            
            {/* Expected Output */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-semibold text-gray-500 uppercase">Expected Output:</h4>
                <button 
                  onClick={() => handleCopy(getExpectedString(), 'expected')}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <DocumentDuplicateIcon className="h-3.5 w-3.5 mr-1" />
                  {copied === 'expected' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-50 p-2 rounded font-mono text-sm overflow-x-auto">
                {getExpectedString()}
              </div>
            </div>
            
            {/* Actual Output (if available) */}
            {result && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">Your Output:</h4>
                  <button 
                    onClick={() => handleCopy(getOutputString(), 'output')}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                    disabled={!result.output}
                  >
                    <DocumentDuplicateIcon className="h-3.5 w-3.5 mr-1" />
                    {copied === 'output' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className={`p-2 rounded font-mono text-sm overflow-x-auto ${
                  result.status === 'failed' ? 'bg-red-50 text-red-800' : 'bg-gray-50'
                }`}>
                  {getOutputString()}
                </div>
                
                {result.status === 'failed' && result.output && (
                  <div className="mt-2 text-xs text-red-600">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      <span>Debug: Output does not match expected result</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseDetails; 