import { TestCase } from './practiceProblems';

// Types for execution results
export interface ExecutionResult {
  success: boolean;
  output?: any;
  error?: string;
  executionTime?: number;
}

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  output?: any;
  expectedOutput: any;
  error?: string;
  executionTime: number;
}

/**
 * Safely executes JavaScript code with proper error handling
 * @param code The code to execute
 * @param params Parameters to pass to the function
 * @param functionName The name of the function to call
 */
export const executeJavaScriptCode = (
  code: string,
  params: any[],
  functionName: string
): ExecutionResult => {
  try {
    // Create a function from the provided code
    const startTime = performance.now();
    
    // We're using new Function for demo purposes
    // In production, this would run in a sandboxed environment
    const func = new Function(
      'params',
      `
      ${code}
      return ${functionName}(...params);
      `
    );
    
    // Execute the function with the provided parameters
    const result = func(params);
    const endTime = performance.now();
    
    return {
      success: true,
      output: result,
      executionTime: Math.round(endTime - startTime)
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

/**
 * Compare the expected and actual outputs to determine if the test passed
 * @param expected The expected output
 * @param actual The actual output
 */
export const compareOutputs = (expected: any, actual: any): boolean => {
  if (expected === null || actual === null) {
    return expected === actual;
  }
  
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) {
      return false;
    }
    
    // Special case for Two Sum problem: allow different order of indices
    if (expected.length === 2 && typeof expected[0] === 'number' && typeof expected[1] === 'number') {
      const sum1 = expected[0] + expected[1];
      const sum2 = actual[0] + actual[1];
      if (sum1 === sum2 && new Set([...expected, ...actual]).size === 2) {
        return true;
      }
    }
    
    // Normal array comparison
    for (let i = 0; i < expected.length; i++) {
      if (!compareOutputs(expected[i], actual[i])) {
        return false;
      }
    }
    return true;
  }
  
  if (typeof expected === 'object' && typeof actual === 'object') {
    const expectedKeys = Object.keys(expected);
    const actualKeys = Object.keys(actual);
    
    if (expectedKeys.length !== actualKeys.length) {
      return false;
    }
    
    for (const key of expectedKeys) {
      if (!actual.hasOwnProperty(key) || !compareOutputs(expected[key], actual[key])) {
        return false;
      }
    }
    return true;
  }
  
  // For primitive values, use strict equality
  return expected === actual;
};

/**
 * Run a user's code against a set of test cases
 * @param code The user's code
 * @param testCases Array of test cases to run
 * @param language Programming language of the code
 * @param functionName Name of the function to call
 */
export const runTests = (
  code: string,
  testCases: TestCase[],
  language: string,
  functionName: string
): {
  isCorrect: boolean;
  results: TestResult[];
} => {
  // If language is not supported, return error
  if (language !== 'javascript' && language !== 'python') {
    return {
      isCorrect: false,
      results: testCases.map(testCase => ({
        testCase,
        passed: false,
        expectedOutput: testCase.expected,
        error: `Language '${language}' is not supported`,
        executionTime: 0
      }))
    };
  }
  
  // For Python, we would need a server-side execution environment
  // For demo purposes, we'll simulate Python execution
  if (language === 'python') {
    const results = testCases.map(testCase => {
      // Simulate execution time between 50-200ms
      const executionTime = Math.floor(Math.random() * 150) + 50;
      
      // 80% chance of passing for demo purposes
      const passed = Math.random() > 0.2;
      
      return {
        testCase,
        passed,
        output: passed ? testCase.expected : null,
        expectedOutput: testCase.expected,
        error: passed ? undefined : 'Output does not match expected result',
        executionTime
      };
    });
    
    return {
      isCorrect: results.every(result => result.passed),
      results
    };
  }
  
  // For JavaScript, execute the code directly
  const results = testCases.map(testCase => {
    // Extract input parameters from test case
    const params = Object.values(testCase.input);
    
    // Execute the code
    const result = executeJavaScriptCode(code, params, functionName);
    
    // Process result
    if (!result.success) {
      return {
        testCase,
        passed: false,
        expectedOutput: testCase.expected,
        error: result.error,
        executionTime: result.executionTime || 0
      };
    }
    
    // Check if output matches expected result
    const passed = compareOutputs(testCase.expected, result.output);
    
    return {
      testCase,
      passed,
      output: result.output,
      expectedOutput: testCase.expected,
      error: passed ? undefined : 'Output does not match expected result',
      executionTime: result.executionTime || 0
    };
  });
  
  return {
    isCorrect: results.every(result => result.passed),
    results
  };
};

/**
 * Get the correct function name for a problem
 * @param slug The problem slug
 * @param language Programming language
 */
export const getFunctionName = (slug: string, language: string): string => {
  // Map of problem slugs to function names
  const functionNames: Record<string, { javascript: string; python: string }> = {
    'two-sum': {
      javascript: 'twoSum',
      python: 'two_sum'
    },
    'reverse-string': {
      javascript: 'reverseString',
      python: 'reverse_string'
    },
    'palindrome-number': {
      javascript: 'isPalindrome',
      python: 'is_palindrome'
    },
    'valid-parentheses': {
      javascript: 'isValid',
      python: 'is_valid'
    },
    'maximum-subarray': {
      javascript: 'maxSubArray',
      python: 'max_sub_array'
    }
  };
  
  return functionNames[slug]?.[language as keyof typeof functionNames[typeof slug]] || '';
};

/**
 * Validate a solution against all test cases for a problem
 * @param slug Problem slug
 * @param code User's code
 * @param language Programming language
 */
export const validateSolution = (
  slug: string,
  code: string,
  language: string,
  testCases: TestCase[]
): {
  isCorrect: boolean;
  results: TestResult[];
} => {
  const functionName = getFunctionName(slug, language);
  
  if (!functionName) {
    return {
      isCorrect: false,
      results: [{
        testCase: { id: 0, input: {}, expected: null },
        passed: false,
        expectedOutput: null,
        error: `Unknown problem slug: ${slug}`,
        executionTime: 0
      }]
    };
  }
  
  return runTests(code, testCases, language, functionName);
}; 