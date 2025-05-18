import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { PlusIcon, AdjustmentsHorizontalIcon, ArrowTrendingUpIcon, ClockIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline';
import CommunityList from '../components/community/CommunityList';
import PostCard from '../components/community/PostCard';
import { posts, communities } from '../lib/communityData';

export default function CommunityPage() {
  const [sortOption, setSortOption] = useState<'trending' | 'new' | 'top'>('trending');
  const [filterOption, setFilterOption] = useState<'all' | 'questions' | 'discussions' | 'resources'>('all');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Filter posts based on selected filter
  const filteredPosts = filterOption === 'all' 
    ? posts 
    : posts.filter(post => post.type === filterOption.slice(0, -1));
    
  // Sort posts based on selected option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'new':
        // This is just a simulation for demo purposes
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'top':
        return b.votes - a.votes;
      case 'trending':
      default:
        // Simple algorithm combining votes and recency
        const aScore = a.votes + a.replies * 2;
        const bScore = b.votes + b.replies * 2;
        return bScore - aScore;
    }
  });

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  const handleFilterClick = (filter: 'all' | 'questions' | 'discussions' | 'resources') => {
    setFilterOption(filter);
    setFilterMenuOpen(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1">
            {/* Page header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <Link 
                href="/community/new-post" 
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
                    onClick={toggleFilterMenu}
                    className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1.5" />
                    {filterOption === 'all' ? 'Filter' : 
                      filterOption === 'questions' ? 'Questions' :
                      filterOption === 'discussions' ? 'Discussions' : 'Resources'
                    }
                  </button>
                  <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${filterMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="py-1">
                      <button 
                        onClick={() => handleFilterClick('all')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        All Posts
                      </button>
                      <button 
                        onClick={() => handleFilterClick('questions')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'questions' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Questions
                      </button>
                      <button 
                        onClick={() => handleFilterClick('discussions')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'discussions' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Discussions
                      </button>
                      <button 
                        onClick={() => handleFilterClick('resources')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filterOption === 'resources' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
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
                </div>
              )}
            </div>
            
            {/* Pagination */}
            <nav className="flex items-center justify-between mt-6 border-t border-gray-200 px-4 pt-4">
              <div className="flex-1 flex justify-between">
                <button
                  disabled
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-80 flex-shrink-0 space-y-6">
            <CommunityList />
            
            {/* Active discussions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Hot Discussions</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {posts.filter(post => post.type === 'discussion')
                  .sort((a, b) => b.replies - a.replies)
                  .slice(0, 3)
                  .map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/community/${post.communityId}/post/${post.id}`}
                      className="block p-4 hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span>{post.replies} replies</span>
                        <span className="mx-1">•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}