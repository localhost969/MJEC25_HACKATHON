import { Community } from '../components/community/CommunitySidebar';
import { Post } from '../components/community/PostCard';

// Static community data
export const communities: Community[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Learn and discuss JavaScript programming language, frameworks, and best practices',
    icon: '🟨',
    members: 2453,
    createdAt: 'Jan 12, 2023',
    rules: [
      'Be respectful and helpful to other members',
      'No spam or self-promotion without community context',
      'Use proper formatting for code snippets',
      'Tag your posts appropriately',
      'Search before asking already answered questions'
    ],
    moderators: [
      {
        id: 'mod1',
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: 'mod2',
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Share Python tips, ask questions, and collaborate on projects',
    icon: '🐍',
    members: 3842,
    createdAt: 'Nov 3, 2022',
    rules: [
      'Be kind and helpful to each other',
      'Properly format your code with triple backticks',
      'Include your Python version and OS if relevant',
      'No spamming or excessive self-promotion',
      'Use descriptive titles for your posts'
    ],
    moderators: [
      {
        id: 'mod3',
        name: 'Alex Williams',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
      },
      {
        id: 'mod4',
        name: 'David Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
      }
    ]
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Frontend, backend, and everything in between for web developers',
    icon: '🌐',
    members: 1967,
    createdAt: 'Mar 18, 2023',
    rules: [
      'Be respectful to all members',
      'Use appropriate tags for your questions',
      'Format code properly when sharing snippets',
      'Provide context when asking for help',
      'Check the resources section before posting common questions'
    ],
    moderators: [
      {
        id: 'mod5',
        name: 'Emma Thompson',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      {
        id: 'mod6',
        name: 'Ryan Park',
        avatar: 'https://randomuser.me/api/portraits/men/71.jpg'
      }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'AI, ML frameworks, and learning resources',
    icon: '🤖',
    members: 2105,
    createdAt: 'Feb 7, 2023',
    rules: [
      'Share knowledge respectfully',
      'Include framework versions in questions',
      'Provide minimal reproducible examples when possible',
      'Use appropriate tags for posts',
      'No self-promotion without context'
    ],
    moderators: [
      {
        id: 'mod7',
        name: 'Sophia Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
      }
    ]
  }
];

// Sample posts data
export const posts: Post[] = [
  {
    id: 'post1',
    title: 'How to optimize React rendering performance?',
    content: 'I\'ve noticed my React application is getting sluggish as it grows. What are the best practices for optimizing render performance? I\'ve tried using memo and useCallback but still seeing issues with complex component trees.',
    author: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    type: 'question',
    votes: 24,
    replies: 7,
    tags: ['react', 'performance', 'optimization'],
    createdAt: '2 hours ago',
    solved: true,
    communityId: 'javascript'
  },
  {
    id: 'post2',
    title: 'Understanding Python\'s asyncio for web scraping',
    content: 'I\'m trying to build a web scraper that can handle multiple requests concurrently. I\'ve been reading about asyncio but I\'m struggling to implement it effectively. Has anyone built something similar who can share examples?',
    author: {
      id: 'user2',
      name: 'Maria Lopez',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    type: 'question',
    votes: 15,
    replies: 4,
    tags: ['python', 'asyncio', 'web-scraping'],
    createdAt: '5 hours ago',
    solved: false,
    communityId: 'python'
  },
  {
    id: 'post3',
    title: 'The future of frontend frameworks in 2024',
    content: 'With so many JavaScript frameworks available today, where do you see the ecosystem heading in 2024? Will React maintain its dominance? Will frameworks like Svelte and Qwik take over? Let\'s discuss!',
    author: {
      id: 'user3',
      name: 'Daniel Smith',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    type: 'discussion',
    votes: 32,
    replies: 18,
    tags: ['frontend', 'javascript', 'frameworks', 'trends'],
    createdAt: '1 day ago',
    communityId: 'web-dev'
  },
  {
    id: 'post4',
    title: 'Building a Neural Network from scratch with Python',
    content: 'I\'ve created a tutorial on building a simple neural network using just NumPy. This is great for anyone wanting to understand what happens behind the scenes in frameworks like TensorFlow or PyTorch.',
    author: {
      id: 'user4',
      name: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    type: 'resource',
    votes: 45,
    replies: 8,
    tags: ['machine-learning', 'neural-networks', 'python', 'tutorial'],
    createdAt: '2 days ago',
    communityId: 'machine-learning'
  },
  {
    id: 'post5',
    title: 'Best resources for learning TypeScript in 2024',
    content: 'I\'ve compiled a list of the most helpful resources for learning TypeScript this year, from beginner to advanced. Includes books, courses, YouTube channels, and practice projects.',
    author: {
      id: 'user5',
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
    },
    type: 'resource',
    votes: 29,
    replies: 12,
    tags: ['typescript', 'learning', 'resources'],
    createdAt: '3 days ago',
    communityId: 'javascript'
  },
  {
    id: 'post6',
    title: 'Understanding Python decorators with practical examples',
    content: 'Decorators are a powerful feature in Python, but they can be confusing for beginners. I\'ve written a detailed explanation with step-by-step examples that demonstrate how they work and when to use them.',
    author: {
      id: 'user6',
      name: 'Emily Chen',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    type: 'resource',
    votes: 38,
    replies: 5,
    tags: ['python', 'decorators', 'advanced', 'tutorial'],
    createdAt: '4 days ago',
    communityId: 'python'
  },
  {
    id: 'post7',
    title: 'How to implement JWT authentication in a Node.js API?',
    content: 'I\'m building a REST API with Express and need to implement secure authentication. What\'s the best approach for implementing JWT? Any libraries or patterns you recommend?',
    author: {
      id: 'user7',
      name: 'Thomas Brown',
      avatar: 'https://randomuser.me/api/portraits/men/61.jpg'
    },
    type: 'question',
    votes: 18,
    replies: 9,
    tags: ['node.js', 'authentication', 'jwt', 'express'],
    createdAt: '1 week ago',
    solved: false,
    communityId: 'web-dev'
  }
];

// Community chat channels
export type ChatChannel = {
  id: string;
  name: string;
  description: string;
  communityId: string;
  unreadCount?: number;
  isGeneral?: boolean;
};

export const chatChannels: ChatChannel[] = [
  {
    id: 'js-general',
    name: 'general',
    description: 'General JavaScript discussions',
    communityId: 'javascript',
    isGeneral: true
  },
  {
    id: 'js-help',
    name: 'help',
    description: 'Get help with JavaScript problems',
    communityId: 'javascript',
    unreadCount: 3
  },
  {
    id: 'js-frameworks',
    name: 'frameworks',
    description: 'React, Vue, Angular, and other frameworks',
    communityId: 'javascript'
  },
  {
    id: 'py-general',
    name: 'general',
    description: 'General Python discussions',
    communityId: 'python',
    isGeneral: true
  },
  {
    id: 'py-help',
    name: 'help',
    description: 'Get help with Python problems',
    communityId: 'python',
    unreadCount: 5
  },
  {
    id: 'py-data-science',
    name: 'data-science',
    description: 'Python for data analysis and machine learning',
    communityId: 'python'
  },
  {
    id: 'webdev-general',
    name: 'general',
    description: 'General web development topics',
    communityId: 'web-dev',
    isGeneral: true
  },
  {
    id: 'webdev-frontend',
    name: 'frontend',
    description: 'HTML, CSS, JavaScript, and UX',
    communityId: 'web-dev',
    unreadCount: 2
  },
  {
    id: 'webdev-backend',
    name: 'backend',
    description: 'Server, API, and database discussions',
    communityId: 'web-dev'
  }
];

// Chat messages
export type ChatMessage = {
  id: string;
  channelId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isAI?: boolean;
  reactions?: {
    emoji: string;
    count: number;
    reacted: boolean;
  }[];
};

export const chatMessages: Record<string, ChatMessage[]> = {
  'js-general': [
    {
      id: 'msg1',
      channelId: 'js-general',
      author: {
        id: 'user8',
        name: 'Sophie Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      },
      content: 'Has anyone tried the new JavaScript features in ES2023?',
      timestamp: '10:23 AM',
      reactions: [
        { emoji: '👍', count: 3, reacted: false },
        { emoji: '🎉', count: 1, reacted: false }
      ]
    },
    {
      id: 'msg2',
      channelId: 'js-general',
      author: {
        id: 'user9',
        name: 'Robert Kim',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      content: 'Yes! The new Array methods are so useful. I\'ve been using findLast() a lot.',
      timestamp: '10:25 AM',
    },
    {
      id: 'msg3',
      channelId: 'js-general',
      author: {
        id: 'ai',
        name: 'AI Assistant',
        avatar: '/ai-avatar.png',
      },
      content: 'ES2023 includes several new features including:\n• Array.prototype.findLast() and findLastIndex()\n• Hashbang syntax for executable JavaScript files\n• Symbols as WeakMap keys\n\nHere\'s a quick example of findLast():```js\nconst array = [1, 2, 3, 4, 5];\nconst lastEven = array.findLast(num => num % 2 === 0); // Returns 4\n```',
      timestamp: '10:26 AM',
      isAI: true
    }
  ],
  'py-help': [
    {
      id: 'msg4',
      channelId: 'py-help',
      author: {
        id: 'user10',
        name: 'Andrew Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      },
      content: 'I\'m having issues with pandas dataframe merges. I\'m trying to join two dataframes but getting duplicate rows. Any suggestions?',
      timestamp: '9:15 AM',
      reactions: [
        { emoji: '🤔', count: 2, reacted: true },
      ]
    },
    {
      id: 'msg5',
      channelId: 'py-help',
      author: {
        id: 'user11',
        name: 'Lisa Chen',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      },
      content: 'Check your join keys - you probably need to specify more columns in your merge to create unique matches. Or use drop_duplicates() after merging if that\'s appropriate for your data.',
      timestamp: '9:18 AM',
      reactions: [
        { emoji: '👍', count: 3, reacted: false },
        { emoji: '💯', count: 1, reacted: false }
      ]
    },
    {
      id: 'msg6',
      channelId: 'py-help',
      author: {
        id: 'ai',
        name: 'AI Assistant',
        avatar: '/ai-avatar.png',
      },
      content: 'When dealing with duplicate rows in pandas merges, consider these approaches:\n\n1. Use the `on` parameter to specify exact join columns\n2. Use `merge(..., validate="one_to_one")` to validate your join assumptions\n3. Check for null values in join columns\n4. Inspect the data with:\n```python\ndf1.merge(df2, on="key_column", indicator=True)\n.query(\'_merge=="both"\')\n.value_counts(["key_column"])\n```',
      timestamp: '9:20 AM',
      isAI: true
    }
  ]
};

// Comment data for post detail pages
export type Comment = {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  votes: number;
  isAnswer?: boolean;
  replies?: Comment[];
  codeSnippet?: {
    language: string;
    code: string;
  };
};

export const comments: Comment[] = [
  {
    id: 'comment1',
    postId: 'post1',
    author: {
      id: 'user12',
      name: 'Jason Lee',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    content: 'One of the most effective optimizations I\'ve found is proper usage of React.memo, useMemo, and useCallback hooks to prevent unnecessary re-renders.',
    createdAt: '1 hour ago',
    votes: 15,
    isAnswer: true
  },
  {
    id: 'comment2',
    postId: 'post1',
    author: {
      id: 'user13',
      name: 'Rachel Green',
      avatar: 'https://randomuser.me/api/portraits/women/76.jpg'
    },
    content: 'Have you checked if you have any expensive calculations in your render method? Those should be memoized with useMemo.',
    createdAt: '1.5 hours ago',
    votes: 8,
    codeSnippet: {
      language: 'javascript',
      code: 'const expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);'
    }
  },
  {
    id: 'comment3',
    postId: 'post1',
    author: {
      id: 'ai',
      name: 'AI Assistant',
      avatar: '/ai-avatar.png'
    },
    content: 'React rendering performance can be optimized through several techniques:',
    createdAt: '1 hour ago',
    votes: 12,
    codeSnippet: {
      language: 'javascript',
      code: '// 1. Memoize components with React.memo\nconst MyComponent = React.memo(function MyComponent(props) {\n  /* render using props */\n});\n\n// 2. Use useCallback for event handlers\nconst handleClick = useCallback(() => {\n  // handle the click event\n}, [/* dependencies */]);\n\n// 3. Virtualize long lists\n<VirtualizedList\n  data={longList}\n  renderItem={({ item }) => <Item title={item.title} />}\n/>'
    }
  }
];

// Get a specific community by ID
export function getCommunity(id: string): Community | undefined {
  return communities.find(community => community.id === id);
}

// Get a specific post by ID
export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

// Get posts for a specific community
export function getCommunityPosts(communityId: string): Post[] {
  return posts.filter(post => post.communityId === communityId);
}

// Get chat channels for a specific community
export function getCommunityChannels(communityId: string): ChatChannel[] {
  return chatChannels.filter(channel => channel.communityId === communityId);
}

// Get messages for a specific channel
export function getChannelMessages(channelId: string): ChatMessage[] {
  return chatMessages[channelId] || [];
}

// Get comments for a specific post
export function getPostComments(postId: string): Comment[] {
  return comments.filter(comment => comment.postId === postId);
} 