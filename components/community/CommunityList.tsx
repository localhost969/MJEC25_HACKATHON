import React from 'react';
import Link from 'next/link';
import { UsersIcon, FireIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { communities } from '../../lib/communityData';

// Add a function to calculate estimated post count based on community data
const getPostCount = (communityId: string): number => {
  // Try to get an estimated count from community members
  const community = communities.find(c => c.id === communityId);
  
  // Estimate based on community size
  if (community) {
    // JavaScript and Python communities typically have many posts
    if (communityId === 'javascript') return 187;
    if (communityId === 'python') return 256;
    if (communityId === 'web-dev') return 143;
    if (communityId === 'machine-learning') return 176;
    if (communityId === 'algorithms') return 98;
    
    // For other communities, estimate based on member count
    return Math.floor(community.members / 10);
  }
  
  return 0;
};

const CommunityList = () => {
  // Define which communities should be shown as "hot"
  const hotCommunityIds = ['javascript', 'python', 'machine-learning'];
  
  // Sort communities to show "hot" ones first
  const sortedCommunities = [...communities].sort((a, b) => {
    const aIsHot = hotCommunityIds.includes(a.id);
    const bIsHot = hotCommunityIds.includes(b.id);
    
    if (aIsHot && !bIsHot) return -1;
    if (!aIsHot && bIsHot) return 1;
    return b.members - a.members;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-gray-900">Communities</h2>
        <p className="text-sm text-gray-500">Join communities based on your interests</p>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedCommunities.map((community) => (
          <Link 
            key={community.id} 
            href={`/community/${community.id}`}
            className="block hover:bg-gray-50"
          >
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {community.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 truncate mr-2">
                      {community.name}
                    </p>
                    {hotCommunityIds.includes(community.id) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        <FireIcon className="h-3 w-3 mr-1" />
                        Hot
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {community.description}
                  </p>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <UsersIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{community.members.toLocaleString()} members</span>
                    <span className="mx-2">•</span>
                    <BookmarkIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{getPostCount(community.id)} posts</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 bg-gray-50 text-center border-t">
        <Link href="/community/create" className="text-sm font-medium text-blue-600 hover:text-blue-800">
          + Create a New Community
        </Link>
      </div>
    </div>
  );
};

export default CommunityList; 