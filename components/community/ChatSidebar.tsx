import React from 'react';
import Link from 'next/link';
import { ChatChannel } from '../../lib/communityData';
import { PlusIcon, HashtagIcon } from '@heroicons/react/24/outline';

interface ChatSidebarProps {
  channels: ChatChannel[];
  communityId: string;
  activeChannelId?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  channels, 
  communityId,
  activeChannelId 
}) => {
  // Sort channels - general first, then alphabetically
  const sortedChannels = [...channels].sort((a, b) => {
    if (a.isGeneral && !b.isGeneral) return -1;
    if (!a.isGeneral && b.isGeneral) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Channels</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="p-2">
        <div className="relative">
          <input 
            type="text"
            placeholder="Search channels"
            className="w-full bg-gray-100 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2 text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1">
        <div className="text-xs font-medium text-gray-500 px-2 py-1.5 uppercase">Text Channels</div>
        <div className="space-y-0.5">
          {sortedChannels.map((channel) => (
            <Link
              key={channel.id}
              href={`/community/${communityId}/chat/${channel.id}`}
              className={`flex items-center px-2 py-1.5 rounded-md group ${
                activeChannelId === channel.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HashtagIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{channel.name}</span>
              {channel.unreadCount && channel.unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {channel.unreadCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-200 p-3">
        <button
          className="flex items-center justify-center w-full py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar; 