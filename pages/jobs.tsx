import { useEffect } from 'react';
import Layout from '../components/Layout';
import JobList from '../components/jobs/JobList';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

export default function JobsPage() {
  // Add lazy loading for the JobList component
  useEffect(() => {
    // Preload external libraries for virtualization when needed
    const preloadLibraries = async () => {
      if (typeof window !== 'undefined') {
        try {
          await import('react-window');
          await import('react-virtualized-auto-sizer');
        } catch (error) {
          console.error('Error preloading libraries:', error);
        }
      }
    };

    preloadLibraries();
  }, []);

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
            <p className="text-gray-600 mt-1">
              Find top jobs from industry-leading companies
            </p>
          </div>
        </div>

        <JobList />
      </div>
    </Layout>
  );
}
