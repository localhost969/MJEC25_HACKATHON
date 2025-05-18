import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import ChatSidebar from '../../../../components/community/ChatSidebar';
import ChatChannel from '../../../../components/community/ChatChannel';
import { 
  getCommunity, 
  getCommunityChannels,
  getChannelMessages 
} from '../../../../lib/communityData';

export default function CommunityChat() {
  const router = useRouter();
  const { id, channelId } = router.query;
  
  // This would normally be fetched from an API
  const communityId = id as string;
  const activeChannelId = channelId as string;
  
  const community = getCommunity(communityId);
  const channels = getCommunityChannels(communityId);
  const activeChannel = channels.find(channel => channel.id === activeChannelId);
  const messages = getChannelMessages(activeChannelId);
  
  // If the data isn't loaded yet or invalid params
  if (!community || !channels || !activeChannel) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-gray-500">Loading channel...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="text-3xl mr-2">{community.icon}</span>
            {community.name} Chat
          </h1>
          <p className="text-sm text-gray-500">Chat with community members in real-time</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-14rem)]">
          {/* Chat sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <ChatSidebar 
              channels={channels} 
              communityId={communityId}
              activeChannelId={activeChannelId}
            />
          </div>
          
          {/* Chat main area */}
          <div className="flex-1">
            <ChatChannel 
              channel={activeChannel} 
              messages={messages}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 