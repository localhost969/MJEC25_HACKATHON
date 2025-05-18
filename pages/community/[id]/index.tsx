import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import PostCard from '../../../components/community/PostCard';
import CommunitySidebar from '../../../components/community/CommunitySidebar';
import { 
  PlusIcon, 
  AdjustmentsHorizontalIcon, 
  ArrowTrendingUpIcon, 
  FireIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { getCommunity, getCommunityPosts } from '../../../lib/communityData';
import Link from 'next/link';

export default function CommunityDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [sortOption, setSortOption] = useState<'trending' | 'new' | 'top'>('trending');
  const [filterOption, setFilterOption] = useState<'all' | 'questions' | 'discussions' | 'resources'>('all');

  // This would normally be fetched from an API
  const communityId = id as string;
  const community = getCommunity(communityId);
  const communityPosts = getCommunityPosts(communityId);
  
  // If the community doesn't exist or data isn't loaded yet
  if (!community || !communityPosts) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-gray-500">Loading community...</p>
        </div>
      </Layout>
    );
  }
  
  // Filter posts based on selected filter
  const filteredPosts = filterOption === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.type === filterOption.slice(0, -1));
    
  // Sort posts based on selected option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'new':
        return a.createdAt.localeCompare(b.createdAt);
      case 'top':
        return b.votes - a.votes;
      case 'trending':
      default:
        const aScore = a.votes + a.replies * 2;
        const bScore = b.votes + b.replies * 2;
        return bScore - aScore;
    }
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1">
            {/* Page header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-2">{community.icon}</span>
                {community.name}
              </h1>
              <Link
                href={`/community/${communityId}/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1.5" />
                New Post
              </Link>
            </div>
            
            {/* Filters bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSortOption('trending')}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                      sortOption === 'trending' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FireIcon className="h-4 w-4 mr-1.5" />
                    Trending
                  </button>
                  <button 
                    onClick={() => setSortOption('new')}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                      sortOption === 'new' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <SparklesIcon className="h-4 w-4 mr-1.5" />
                    New
                  </button>
                  <button 
                    onClick={() => setSortOption('top')}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                      sortOption === 'top' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1.5" />
                    Top
                  </button>
                </div>
                
                <div className="relative inline-block text-left">
                  <button 
                    className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1.5" />
                    Filter: {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  </button>
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
                    <div className="py-1">
                      <button 
                        onClick={() => setFilterOption('all')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        All Posts
                      </button>
                      <button 
                        onClick={() => setFilterOption('questions')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'questions' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        Questions
                      </button>
                      <button 
                        onClick={() => setFilterOption('discussions')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'discussions' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        Discussions
                      </button>
                      <button 
                        onClick={() => setFilterOption('resources')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'resources' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        Resources
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Posts list */}
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No posts found matching your filters.</p>
                  <Link 
                    href={`/community/${communityId}/new`}
                    className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Create the first post
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-80 flex-shrink-0">
            <CommunitySidebar 
              community={community} 
              activePage="posts" 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 