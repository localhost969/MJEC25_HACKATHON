import React, { useState } from 'react';
import { ChatMessage, ChatChannel as ChatChannelType } from '../../lib/communityData';
import { PaperAirplaneIcon, FaceSmileIcon, PaperClipIcon } from '@heroicons/react/24/outline';

interface ChatChannelProps {
  channel: ChatChannelType;
  messages: ChatMessage[];
}

const ChatChannel: React.FC<ChatChannelProps> = ({ channel, messages }) => {
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to the server
    // For this demo, we just clear the input
    setNewMessage('');
  };

  // Function to format code blocks in messages
  const formatMessageContent = (content: string) => {
    if (!content.includes('```')) return content;
    
    const parts = content.split(/(```(?:.*?)\n(?:[\s\S]*?)```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(.*?)\n([\s\S]*?)```/);
        if (match) {
          const [, language, code] = match;
          return (
            <div key={index} className="my-2 bg-gray-900 rounded-md overflow-hidden">
              <div className="px-4 py-1 bg-gray-800 text-gray-400 text-xs">{language || 'code'}</div>
              <pre className="p-4 text-sm text-gray-300 overflow-auto">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
      }
      
      // Regular text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      {/* Channel header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">#{channel.name}</h2>
          <p className="text-sm text-gray-500">{channel.description}</p>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start group">
            <img 
              src={message.author.avatar} 
              alt={message.author.name} 
              className="h-9 w-9 rounded-full mr-3 mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <span className={`font-medium ${message.isAI ? 'text-blue-600' : 'text-gray-900'}`}>
                  {message.author.name}
                  {message.isAI && <span className="ml-1 text-xs font-normal bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">AI</span>}
                </span>
                <span className="ml-2 text-xs text-gray-500">{message.timestamp}</span>
                <div className="opacity-0 group-hover:opacity-100 ml-2 flex-shrink-0 flex">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-800 whitespace-pre-line">
                {formatMessageContent(message.content)}
              </div>
              
              {/* Reactions */}
              {message.reactions && message.reactions.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {message.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${
                        reaction.reacted 
                          ? 'bg-blue-50 border-blue-200 text-blue-600' 
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-1">{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  ))}
                  <button className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-50 border border-gray-200 text-gray-400 hover:bg-gray-100">
                    <span>+</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-end">
          <div className="flex-1 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div className="px-3 py-2">
              <textarea 
                className="w-full border-0 focus:ring-0 resize-none max-h-32 text-sm"
                placeholder={`Message #${channel.name}`}
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className="px-3 py-2 border-t bg-gray-50 flex justify-between items-center">
              <div className="flex space-x-2">
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaceSmileIcon className="h-5 w-5" />
                </button>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                  !newMessage.trim()
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatChannel; 