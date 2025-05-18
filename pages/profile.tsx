import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProfileHeader from '../components/profile/ProfileHeader';
import ExperienceSection from '../components/profile/ExperienceSection';
import EducationSection from '../components/profile/EducationSection';
import SkillsSection from '../components/profile/SkillsSection';
import { Experience } from '../components/profile/ExperienceSection';
import { Education } from '../components/profile/EducationSection';
import { Skill } from '../components/profile/SkillsSection';

// Default data
const defaultProfileData = {
  name: 'Rohit Kumar',
  title: 'Senior Software Engineer',
  location: 'Bangalore, Karnataka',
  bio: 'Passionate software engineer with over 8 years of experience in full-stack development. Specialized in React, Node.js, and cloud architecture. Love solving complex problems and building user-friendly applications.',
  profileImage: '/placeholder-profile.jpg',
  coverImage: '/placeholder-cover.jpg',
};

const defaultExperiences: Experience[] = [
  {
    id: '1',
    company: 'Infosys',
    title: 'Senior Software Engineer',
    location: 'Bangalore, Karnataka',
    startDate: '2020-03-15',
    endDate: '',
    description: 'Leading development of core products using React, Node.js, and AWS. Implemented CI/CD pipelines and mentored junior developers.',
    current: true
  },
  {
    id: '2',
    company: 'Wipro Technologies',
    title: 'Software Developer',
    location: 'Hyderabad, Telangana',
    startDate: '2017-06-01',
    endDate: '2020-02-28',
    description: 'Developed and maintained multiple web applications with focus on performance and scalability. Worked with React, Angular, and Express.js.',
    current: false
  },
  {
    id: '3',
    company: 'TCS',
    title: 'Associate Software Engineer',
    location: 'Pune, Maharashtra',
    startDate: '2014-07-15',
    endDate: '2017-05-30',
    description: 'Worked on frontend development using JavaScript and jQuery. Built responsive user interfaces and implemented API integrations.',
    current: false
  }
];

const defaultEducations: Education[] = [
  {
    id: '1',
    school: 'Indian Institute of Technology, Bangalore',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    startDate: '2010-07-01',
    endDate: '2014-05-30',
    grade: '8.9 CGPA',
    activities: 'Technical Club, Coding competitions, Web development committee',
    current: false
  },
  {
    id: '2',
    school: 'National Institute of Technology, Hyderabad',
    degree: 'Master of Technology',
    field: 'Data Science and Machine Learning',
    startDate: '2015-07-01',
    endDate: '2017-05-30',
    grade: '9.2 CGPA',
    activities: 'AI Research Group, Teaching Assistant for Programming courses',
    current: false
  }
];

const defaultSkills: Skill[] = [
  { id: '1', name: 'JavaScript', level: 'Expert' },
  { id: '2', name: 'React', level: 'Expert' },
  { id: '3', name: 'Node.js', level: 'Advanced' },
  { id: '4', name: 'TypeScript', level: 'Advanced' },
  { id: '5', name: 'AWS', level: 'Intermediate' },
  { id: '6', name: 'Docker', level: 'Intermediate' },
  { id: '7', name: 'MongoDB', level: 'Advanced' },
  { id: '8', name: 'GraphQL', level: 'Intermediate' }
];

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [educations, setEducations] = useState<Education[]>(defaultEducations);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        // Load profile data
        const savedProfileData = localStorage.getItem('profileData');
        if (savedProfileData) {
          setProfileData(JSON.parse(savedProfileData));
        }

        // Load experiences
        const savedExperiences = localStorage.getItem('experiences');
        if (savedExperiences) {
          setExperiences(JSON.parse(savedExperiences));
        }

        // Load educations
        const savedEducations = localStorage.getItem('educations');
        if (savedEducations) {
          setEducations(JSON.parse(savedEducations));
        }

        // Load skills
        const savedSkills = localStorage.getItem('skills');
        if (savedSkills) {
          setSkills(JSON.parse(savedSkills));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromLocalStorage();
  }, []);

  // Save profile data to localStorage when it changes
  const handleProfileUpdate = (newProfileData: typeof profileData) => {
    setProfileData(newProfileData);
    localStorage.setItem('profileData', JSON.stringify(newProfileData));
  };

  // Save experiences to localStorage when they change
  const handleExperiencesUpdate = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    localStorage.setItem('experiences', JSON.stringify(newExperiences));
  };

  // Save educations to localStorage when they change
  const handleEducationsUpdate = (newEducations: Education[]) => {
    setEducations(newEducations);
    localStorage.setItem('educations', JSON.stringify(newEducations));
  };

  // Save skills to localStorage when they change
  const handleSkillsUpdate = (newSkills: Skill[]) => {
    setSkills(newSkills);
    localStorage.setItem('skills', JSON.stringify(newSkills));
  };

    // Adding a client-side only guard to prevent hydration errors  const [mounted, setMounted] = useState(false);  useEffect(() => {    setMounted(true);  }, []);  if (!mounted) {    return null;  }  if (isLoading) {    return (      <Layout>        <div className="max-w-4xl mx-auto p-4 flex justify-center items-center min-h-[60vh]">          <div className="animate-pulse text-gray-500">Loading profile...</div>        </div>      </Layout>    );  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <ProfileHeader 
          initialData={profileData} 
          onUpdate={handleProfileUpdate}
        />
        
        <div className="grid grid-cols-1 gap-6">
          <ExperienceSection 
            initialExperiences={experiences} 
            onUpdate={handleExperiencesUpdate}
          />
          <EducationSection 
            initialEducation={educations} 
            onUpdate={handleEducationsUpdate}
          />
          <SkillsSection 
            initialSkills={skills} 
            onUpdate={handleSkillsUpdate}
          />
        </div>
      </div>
    </Layout>
  );
}
