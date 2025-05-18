export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationLink: string;
  logo: string;
  postedAt: string;
}

// Mock data for jobs
export const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Infosys',
    location: 'Bangalore, Karnataka (Remote)',
    salary: '₹12,00,000 - ₹18,00,000',
    description: 'Infosys is seeking a skilled Frontend Developer to join our growing team. You will be responsible for building user interfaces for our web applications using React and TypeScript.',
    requirements: [
      'Proficiency in React and TypeScript',
      '3+ years of frontend development experience',
      'Strong understanding of responsive design',
      'Experience with state management (Redux, Mobx, etc.)',
      'Familiarity with REST APIs and GraphQL'
    ],
    responsibilities: [
      'Develop and maintain user interfaces for web applications',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Write clean, maintainable, and efficient code',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and team discussions'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/frontend-developer',
    logo: 'https://logowik.com/content/uploads/images/infosys-new-20211.jpg',
    postedAt: '2 days ago'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'Wipro',
    location: 'Hyderabad, Telangana',
    salary: '₹14,00,000 - ₹20,00,000',
    description: 'Wipro is looking for a Backend Engineer to develop and maintain our core APIs and services. You will work with a team of engineers to build scalable and reliable backend systems.',
    requirements: [
      'Proficiency in Node.js, Python, or Java',
      '4+ years of backend development experience',
      'Experience with database design and optimization',
      'Understanding of microservices architecture',
      'Knowledge of cloud platforms (AWS, Azure, GCP)'
    ],
    responsibilities: [
      'Design and implement RESTful APIs',
      'Optimize database queries and data structures',
      'Implement authentication and authorization systems',
      'Monitor and troubleshoot performance issues',
      'Contribute to system architecture decisions'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/backend-engineer',
    logo: 'https://logowik.com/content/uploads/images/wipro-new5353.jpg',
    postedAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'TCS',
    location: 'Pune, Maharashtra (Hybrid)',
    salary: '₹16,00,000 - ₹24,00,000',
    description: 'TCS is hiring a Full Stack Developer to work on our flagship product. You will be involved in all aspects of development, from database design to frontend implementation.',
    requirements: [
      'Experience with both frontend and backend technologies',
      'Proficiency in React, Node.js, and SQL/NoSQL databases',
      '5+ years of full stack development experience',
      'Understanding of CI/CD pipelines',
      'Experience with Agile methodologies'
    ],
    responsibilities: [
      'Develop end-to-end features for web applications',
      'Implement database schemas and APIs',
      'Build responsive and interactive user interfaces',
      'Write unit and integration tests',
      'Mentor junior developers'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/full-stack-developer',
    logo: 'https://logowik.com/content/uploads/images/tata-consultancy-services-tcs-new3349.jpg',
    postedAt: '3 days ago'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cognizant',
    location: 'Chennai, Tamil Nadu',
    salary: '₹18,00,000 - ₹25,00,000',
    description: 'Cognizant is seeking a DevOps Engineer to help us build and maintain our infrastructure. You will be responsible for automating deployment processes and ensuring system reliability.',
    requirements: [
      'Experience with cloud platforms (AWS, Azure, GCP)',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Proficiency in scripting languages (Bash, Python)',
      'Understanding of CI/CD tools (Jenkins, GitHub Actions)',
      '3+ years of DevOps experience'
    ],
    responsibilities: [
      'Automate deployment and scaling processes',
      'Implement monitoring and alerting systems',
      'Troubleshoot and resolve infrastructure issues',
      'Optimize system performance and cost',
      'Collaborate with development teams to improve workflows'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/devops-engineer',
    logo: 'https://logowik.com/content/uploads/images/cognizant1865.jpg',
    postedAt: '1 day ago'
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'Tech Mahindra',
    location: 'Gurgaon, Haryana (Remote)',
    salary: '₹10,00,000 - ₹16,00,000',
    description: 'Tech Mahindra is looking for a talented UI/UX Designer to create beautiful and intuitive user interfaces for our digital products. You will work closely with product managers and developers to deliver exceptional user experiences.',
    requirements: [
      'Strong portfolio demonstrating UI/UX design skills',
      'Proficiency in design tools (Figma, Adobe XD)',
      '3+ years of UI/UX design experience',
      'Understanding of user research and testing',
      'Knowledge of accessibility standards'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Develop user personas and journey maps',
      'Collaborate with developers on implementation',
      'Define and enforce design guidelines'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/ui-ux-designer',
    logo: 'https://logowik.com/content/uploads/images/tech-mahindra-new3542.jpg',
    postedAt: '5 days ago'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'Zomato',
    location: 'Gurugram, Haryana (Hybrid)',
    salary: '₹22,00,000 - ₹30,00,000',
    description: 'Zomato is seeking a Data Scientist to join our analytics team. You will work on developing algorithms and statistical models to extract insights from our large datasets and help drive business decisions.',
    requirements: [
      'Masters or PhD in Computer Science, Statistics, or related field',
      'Strong programming skills in Python, R, or similar',
      'Experience with machine learning libraries (TensorFlow, PyTorch)',
      'Knowledge of SQL and data visualization tools',
      'Minimum 3 years of experience in data science'
    ],
    responsibilities: [
      'Develop and implement machine learning models',
      'Extract insights from complex datasets',
      'Create data visualizations and dashboards',
      'Collaborate with business stakeholders to identify opportunities',
      'Present findings and recommendations to leadership'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/data-scientist',
    logo: 'https://logowik.com/content/uploads/images/zomato4188.jpg',
    postedAt: '3 days ago'
  },
  {
    id: '7',
    title: 'Product Manager',
    company: 'Flipkart',
    location: 'Bangalore, Karnataka',
    salary: '₹25,00,000 - ₹40,00,000',
    description: 'Flipkart is looking for a Product Manager to lead the development of our e-commerce platforms. You will work with cross-functional teams to define product vision, strategy, and roadmap.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Excellent communication and interpersonal abilities',
      'Experience with Agile development methodologies',
      'Understanding of e-commerce business models'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work with engineering, design, and business teams',
      'Analyze market trends and competitive landscape',
      'Track product metrics and optimize performance'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/product-manager',
    logo: 'https://logowik.com/content/uploads/images/flipkart7489.jpg',
    postedAt: '1 week ago'
  },
  {
    id: '8',
    title: 'Mobile App Developer',
    company: 'Ola',
    location: 'Bangalore, Karnataka (Remote)',
    salary: '₹15,00,000 - ₹25,00,000',
    description: 'Ola is hiring a Mobile App Developer to build and maintain our Android and iOS applications. You will be responsible for developing high-quality mobile applications and ensuring great user experiences.',
    requirements: [
      'Proficiency in Android (Kotlin/Java) or iOS (Swift)',
      '3+ years of mobile app development experience',
      'Experience with RESTful APIs and JSON',
      'Knowledge of mobile UI design principles',
      'Familiarity with version control systems'
    ],
    responsibilities: [
      'Develop and maintain mobile applications',
      'Collaborate with design and backend teams',
      'Ensure performance and reliability of applications',
      'Identify and fix bugs and performance issues',
      'Stay up-to-date with latest mobile development trends'
    ],
    applicationLink: 'https://linkedin.com/jobs/view/mobile-app-developer',
    logo: 'https://logowik.com/content/uploads/images/ola-cabs1234.jpg',
    postedAt: '2 days ago'
  }
];

// Service functions for job data
export const getJobs = async (): Promise<Job[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobs), 500);
  });
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
  // In a real app, this would fetch a specific job from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobs.find(job => job.id === id)), 300);
  });
}; 