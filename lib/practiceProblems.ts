// Define problem types and difficulty
type Difficulty = 'Easy' | 'Medium' | 'Hard';
type Tag = 
  | 'Array' 
  | 'String' 
  | 'Hash Table' 
  | 'Math' 
  | 'Dynamic Programming' 
  | 'Sorting' 
  | 'Greedy' 
  | 'Depth-First Search' 
  | 'Binary Search' 
  | 'Tree' 
  | 'Matrix' 
  | 'Graph'
  | 'Two Pointers'
  | 'Linked List'
  | 'Recursion'
  | 'Sliding Window'
  | 'Divide and Conquer'
  | 'Heap (Priority Queue)'
  | 'Merge Sort'
  | 'Stack';

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  likes: number;
  dislikes: number;
  acceptance: number;
  tags: Tag[];
  companies: string[];
  solved: boolean;
  attempted: boolean;
  bookmarked: boolean;
}

export interface TestCase {
  id: number;
  input: any;
  expected: any;
}

export interface ProblemDetail extends Problem {
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  testCases: TestCase[];
  starterCode: {
    javascript: string;
    python: string;
  };
  solution: {
    javascript: string;
    python: string;
  };
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    likes: 42560,
    dislikes: 1390,
    acceptance: 48.2,
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Facebook", "Apple", "Microsoft"],
    solved: true,
    attempted: true,
    bookmarked: true
  },
  {
    id: 2,
    title: "Reverse String",
    slug: "reverse-string",
    difficulty: "Easy",
    likes: 5621,
    dislikes: 945,
    acceptance: 74.8,
    tags: ["String", "Two Pointers"],
    companies: ["Amazon", "Apple", "Microsoft"],
    solved: false,
    attempted: true,
    bookmarked: false
  },
  {
    id: 3,
    title: "Palindrome Number",
    slug: "palindrome-number",
    difficulty: "Easy",
    likes: 6890,
    dislikes: 2135,
    acceptance: 51.4,
    tags: ["Math"],
    companies: ["Amazon", "Adobe"],
    solved: false,
    attempted: false,
    bookmarked: false
  },
  {
    id: 4,
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    difficulty: "Medium",
    likes: 18964,
    dislikes: 3810,
    acceptance: 38.9,
    tags: ["Linked List", "Math", "Recursion"],
    companies: ["Amazon", "Microsoft", "Facebook", "Bloomberg"],
    solved: false,
    attempted: false,
    bookmarked: true
  },
  {
    id: 5,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    likes: 24350,
    dislikes: 1050,
    acceptance: 33.8,
    tags: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Facebook", "Google", "Bloomberg", "Microsoft"],
    solved: false,
    attempted: true,
    bookmarked: true
  },
  {
    id: 6,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    likes: 22190,
    dislikes: 1050,
    acceptance: 49.5,
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Apple"],
    solved: true,
    attempted: true,
    bookmarked: false
  },
  {
    id: 7,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    likes: 15870,
    dislikes: 975,
    acceptance: 54.3,
    tags: ["Array", "Two Pointers", "Greedy"],
    companies: ["Amazon", "Google", "Facebook", "Adobe"],
    solved: false,
    attempted: false,
    bookmarked: false
  },
  {
    id: 8,
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "Hard",
    likes: 12745,
    dislikes: 490,
    acceptance: 46.1,
    tags: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)", "Merge Sort"],
    companies: ["Amazon", "Facebook", "Google", "Microsoft", "Uber"],
    solved: false,
    attempted: false,
    bookmarked: true
  },
  {
    id: 9,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    likes: 21340,
    dislikes: 297,
    acceptance: 55.8,
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Bloomberg"],
    solved: false,
    attempted: false,
    bookmarked: false
  },
  {
    id: 10,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    likes: 13280,
    dislikes: 650,
    acceptance: 40.7,
    tags: ["String", "Stack"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Bloomberg"],
    solved: false,
    attempted: false,
    bookmarked: false
  },
  {
    id: 11,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    likes: 18460,
    dislikes: 2170,
    acceptance: 33.9,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
    solved: false,
    attempted: false,
    bookmarked: false
  },
  {
    id: 12,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    likes: 16875,
    dislikes: 570,
    acceptance: 54.2,
    tags: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Facebook", "Microsoft", "Google"],
    solved: false,
    attempted: false,
    bookmarked: false
  }
];

const problemDetails: Record<string, ProblemDetail> = {
  "two-sum": {
    ...problems.find(p => p.slug === "two-sum")!,
    description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
    `,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testCases: [
      {
        id: 1,
        input: {
          nums: [2, 7, 11, 15],
          target: 9
        },
        expected: [0, 1]
      },
      {
        id: 2,
        input: {
          nums: [3, 2, 4],
          target: 6
        },
        expected: [1, 2]
      },
      {
        id: 3,
        input: {
          nums: [3, 3],
          target: 6
        },
        expected: [0, 1]
      },
      {
        id: 4,
        input: {
          nums: [1, 5, 8, 3, 9, 2],
          target: 10
        },
        expected: [2, 5]
      },
      {
        id: 5,
        input: {
          nums: [-1, -2, -3, -4, -5],
          target: -8
        },
        expected: [2, 4]
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
}`,
      python: `def two_sum(nums, target):
    # Write your code here
    pass`
    },
    solution: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `def two_sum(nums, target):
    map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in map:
            return [map[complement], i]
        map[num] = i
    return []`
    }
  },
  "reverse-string": {
    ...problems.find(p => p.slug === "reverse-string")!,
    description: `
Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.
    `,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    testCases: [
      {
        id: 1,
        input: {
          s: ["h", "e", "l", "l", "o"]
        },
        expected: ["o", "l", "l", "e", "h"]
      },
      {
        id: 2,
        input: {
          s: ["H", "a", "n", "n", "a", "h"]
        },
        expected: ["h", "a", "n", "n", "a", "H"]
      },
      {
        id: 3,
        input: {
          s: ["a", "b", "c", "d", "e", "f"]
        },
        expected: ["f", "e", "d", "c", "b", "a"]
      },
      {
        id: 4,
        input: {
          s: ["A"]
        },
        expected: ["A"]
      },
      {
        id: 5,
        input: {
          s: ["A", "B"]
        },
        expected: ["B", "A"]
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Write your code here
}`,
      python: `def reverse_string(s):
    # Write your code here
    pass`
    },
    solution: {
      javascript: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
      python: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1`
    }
  },
  "palindrome-number": {
    ...problems.find(p => p.slug === "palindrome-number")!,
    description: `
Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same forward and backward.
For example, 121 is a palindrome while 123 is not.
    `,
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        input: "x = 10",
        output: "false",
        explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    testCases: [
      {
        id: 1,
        input: {
          x: 121
        },
        expected: true
      },
      {
        id: 2,
        input: {
          x: -121
        },
        expected: false
      },
      {
        id: 3,
        input: {
          x: 10
        },
        expected: false
      },
      {
        id: 4,
        input: {
          x: 12321
        },
        expected: true
      },
      {
        id: 5,
        input: {
          x: 0
        },
        expected: true
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Write your code here
}`,
      python: `def is_palindrome(x):
    # Write your code here
    pass`
    },
    solution: {
      javascript: `function isPalindrome(x) {
    // Special cases:
    // If x is negative, it's not a palindrome
    // If x ends with 0 but is not 0, it's not a palindrome
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    
    let reversed = 0;
    while (x > reversed) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    // When the length is an odd number, we need to get rid of the middle digit
    // For example when x = 12321, at the end of the while loop we get x = 12, reversed = 123
    // Since the middle digit doesn't matter in palindrome (it will always equal to itself)
    // We can simply get rid of it by dividing reversed by 10
    return x === reversed || x === Math.floor(reversed / 10);
}`,
      python: `def is_palindrome(x):
    # Special cases:
    # If x is negative, it's not a palindrome
    # If x ends with 0 but is not 0, it's not a palindrome
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    
    reversed_num = 0
    while x > reversed_num:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    
    # When the length is an odd number, we need to get rid of the middle digit
    # For example when x = 12321, at the end of the while loop we get x = 12, reversed_num = 123
    return x == reversed_num or x == reversed_num // 10`
    }
  },
  "valid-parentheses": {
    ...problems.find(p => p.slug === "valid-parentheses")!,
    description: `
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.
    `,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    testCases: [
      {
        id: 1,
        input: {
          s: "()"
        },
        expected: true
      },
      {
        id: 2,
        input: {
          s: "()[]{}"
        },
        expected: true
      },
      {
        id: 3,
        input: {
          s: "(]"
        },
        expected: false
      },
      {
        id: 4,
        input: {
          s: "([)]"
        },
        expected: false
      },
      {
        id: 5,
        input: {
          s: "{[]}"
        },
        expected: true
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here
}`,
      python: `def is_valid(s):
    # Write your code here
    pass`
    },
    solution: {
      javascript: `function isValid(s) {
    const stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else {
            const lastOpenBracket = stack.pop();
            if (map[lastOpenBracket] !== char) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    mapping = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    
    for char in s:
        if char in mapping:  # It's an opening bracket
            stack.append(char)
        else:  # It's a closing bracket
            if not stack or mapping[stack.pop()] != char:
                return False
    
    return len(stack) == 0`
    }
  },
  "maximum-subarray": {
    ...problems.find(p => p.slug === "maximum-subarray")!,
    description: `
Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.
    `,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    testCases: [
      {
        id: 1,
        input: {
          nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        },
        expected: 6
      },
      {
        id: 2,
        input: {
          nums: [1]
        },
        expected: 1
      },
      {
        id: 3,
        input: {
          nums: [5, 4, -1, 7, 8]
        },
        expected: 23
      },
      {
        id: 4,
        input: {
          nums: [-1]
        },
        expected: -1
      },
      {
        id: 5,
        input: {
          nums: [-2, -1]
        },
        expected: -1
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Write your code here
}`,
      python: `def max_sub_array(nums):
    # Write your code here
    pass`
    },
    solution: {
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either continue the current subarray or start a new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        // Update maximum sum if needed
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
      python: `def max_sub_array(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        # Either continue the current subarray or start a new one
        current_sum = max(nums[i], current_sum + nums[i])
        # Update maximum sum if needed
        max_sum = max(max_sum, current_sum)
    
    return max_sum`
    }
  }
};

// Function to get all problems
export const getAllProblems = (): Problem[] => {
  return problems;
};

// Function to get a specific problem detail by slug
export const getProblemBySlug = (slug: string): ProblemDetail | null => {
  return problemDetails[slug] || null;
};

// Function to get a specific problem by ID
export const getProblemById = (id: number): Problem | null => {
  return problems.find(problem => problem.id === id) || null;
};

// Function to check if a solution is correct
export const validateSolution = (
  slug: string,
  code: string,
  language: string
): { 
  isCorrect: boolean;
  results: {
    testCase: TestCase;
    passed: boolean;
    output: any;
    expectedOutput: any;
    error?: string;
  }[]
} => {
  // In a real application, this would execute the code safely against test cases
  // For this demonstration, we'll simulate passing results
  
  const problem = problemDetails[slug];
  if (!problem) {
    return {
      isCorrect: false,
      results: []
    };
  }
  
  // Simulate execution results with random passing/failing
  const results = problem.testCases.map(testCase => {
    const passed = Math.random() > 0.2; // 80% chance of passing for demonstration
    
    let output;
    if (passed) {
      output = testCase.expected;
    } else {
      // Generate a slightly wrong output for demo purposes
      if (Array.isArray(testCase.expected)) {
        output = [...testCase.expected];
        if (output.length > 0) {
          output[0] = (output[0] + 1) % 10; // Modify first element
        }
      } else if (typeof testCase.expected === 'number') {
        output = testCase.expected + (Math.random() > 0.5 ? 1 : -1);
      } else if (typeof testCase.expected === 'boolean') {
        output = !testCase.expected;
      } else {
        output = testCase.expected;
      }
    }
    
    return {
      testCase,
      passed,
      output,
      expectedOutput: testCase.expected,
      error: passed ? undefined : 'Output does not match expected result'
    };
  });
  
  // Check if all tests passed
  const isCorrect = results.every(result => result.passed);
  
  return {
    isCorrect,
    results
  };
}; 