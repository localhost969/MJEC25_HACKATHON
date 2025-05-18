import React from 'react';
import Link from 'next/link';
import {   UsersIcon,   CalendarIcon,   ShieldCheckIcon,   ChatBubbleLeftRightIcon,  QuestionMarkCircleIcon,  DocumentTextIcon,  LinkIcon,  InformationCircleIcon} from '@heroicons/react/24/outline';
import { getCommunityChannels } from '../../lib/communityData';

export type Community = {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  createdAt: string;
  rules: string[];
  moderators: {
    id: string;
    name: string;
    avatar: string;
  }[];
};

interface CommunitySidebarProps {
  community: Community;
  activePage: 'posts' | 'chat' | 'about' | 'members';
}

const CommunitySidebar: React.FC<CommunitySidebarProps> = ({ 
  community, 
  activePage 
}) => {
  // Get the default chat channel for this community
  const channels = getCommunityChannels(community.id);
  const defaultChannel = channels.find(channel => channel.isGeneral) || channels[0];
  
  return (
    <div className="space-y-4">
      {/* Community Info Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 flex items-center">
          <div className="bg-white rounded-full p-2 text-4xl">
            {community.icon}
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-white">{community.name}</h2>
            <div className="flex items-center text-blue-100 text-sm">
              <UsersIcon className="h-4 w-4 mr-1" />
              <span>{community.members.toLocaleString()} members</span>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <p className="text-sm text-gray-600">{community.description}</p>
          <div className="mt-3 text-xs text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Created {community.createdAt}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-3">
          <button className="w-full py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Join Community
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Navigation</h3>
        </div>
        <nav className="divide-y divide-gray-200">
          <Link 
            href={`/community/${community.id}`}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
              activePage === 'posts' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <DocumentTextIcon className="h-5 w-5 mr-3" />
            <span className="font-medium">Posts</span>
          </Link>
          <Link 
            href={`/community/${community.id}/chat/${defaultChannel?.id || ''}`}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
              activePage === 'chat' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-3" />
            <span className="font-medium">Chat Channels</span>
          </Link>
          <Link 
            href={`/community/${community.id}/members`}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
              activePage === 'members' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <UsersIcon className="h-5 w-5 mr-3" />
            <span className="font-medium">Members</span>
          </Link>
          <Link 
            href={`/community/${community.id}/about`}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
              activePage === 'about' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <InformationCircleIcon className="h-5 w-5 mr-3" />
            <span className="font-medium">About</span>
          </Link>
        </nav>
        <div className="px-4 py-3 border-t border-gray-200">
          <Link 
            href={`/community/${community.id}/new`} 
            className="flex justify-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            + Create New Post
          </Link>
        </div>
      </div>

      {/* Community Rules */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Community Rules</h3>
        </div>
        <div className="px-4 py-3">
          <ul className="space-y-2 text-sm">
            {community.rules.map((rule, index) => (
              <li key={index} className="flex">
                <span className="font-medium text-gray-700 mr-2">{index + 1}.</span>
                <span className="text-gray-600">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Moderators */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Moderators</h3>
        </div>
        <div className="px-4 py-3">
          <ul className="space-y-3">
            {community.moderators.map((mod) => (
              <li key={mod.id} className="flex items-center">
                <img src={mod.avatar} alt={mod.name} className="h-8 w-8 rounded-full" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{mod.name}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <ShieldCheckIcon className="h-3.5 w-3.5 mr-1 text-green-500" />
                    <span>Moderator</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar; 