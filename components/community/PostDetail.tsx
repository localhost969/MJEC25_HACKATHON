import React, { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ShareIcon,
  BookmarkIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { Post } from './PostCard';
import { Comment } from '../../lib/communityData';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
}

const PostDetail: React.FC<PostDetailProps> = ({ post, comments }) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    
    // In a real app, this would send the comment to the server
    // For this demo, we just clear the input
    setNewComment('');
  };
  
  // Function to format code blocks
  const formatContent = (content: string) => {
    if (!content.includes('```')) return content;
    
    const parts = content.split(/(```.*?\n[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(.*?)\n([\s\S]*?)```/);
        if (match) {
          const [, language, code] = match;
          return (
            <div key={index} className="my-3 bg-gray-900 rounded-md overflow-hidden">
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
    <div className="bg-white rounded-lg shadow-sm">
      {/* Post header */}
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-5 w-5 rounded-full mr-1.5"
            />
            <span className="font-medium text-gray-900">{post.author.name}</span>
          </div>
          <span>{post.createdAt}</span>
          {post.type === 'question' && (
            <span className={`flex items-center ${post.solved ? 'text-green-600' : 'text-blue-600'}`}>
              {post.solved ? (
                <>
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Solved
                </>
              ) : (
                <>
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                  Needs Answer
                </>
              )}
            </span>
          )}
        </div>
      </div>
      
      {/* Post content */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex">
          {/* Voting */}
          <div className="flex flex-col items-center mr-4">
            <button className="text-gray-400 hover:text-blue-500">
              <ArrowUpIcon className="h-6 w-6" />
            </button>
            <span className="my-1 font-medium text-gray-700">{post.votes}</span>
            <button className="text-gray-400 hover:text-red-500">
              <ArrowDownIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="prose max-w-none text-gray-800">
              <p className="whitespace-pre-line">{formatContent(post.content)}</p>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end space-x-2 text-sm">
              <button className="text-gray-500 flex items-center hover:text-gray-700">
                <ShareIcon className="h-4 w-4 mr-1.5" />
                Share
              </button>
              <button className="text-gray-500 flex items-center hover:text-gray-700">
                <BookmarkIcon className="h-4 w-4 mr-1.5" />
                Save
              </button>
              <button className="text-gray-500 flex items-center hover:text-gray-700">
                <PencilSquareIcon className="h-4 w-4 mr-1.5" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments section */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {post.replies} {post.replies === 1 ? 'Reply' : 'Replies'}
        </h2>
        
        {/* New comment form */}
        <div className="mb-6">
          <form onSubmit={handleSubmitComment}>
            <div className="mb-3">
              <label htmlFor="comment" className="sr-only">
                Add a comment
              </label>
              <textarea
                id="comment"
                rows={4}
                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                placeholder="Add your answer or comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                  !newComment.trim()
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Post Response
              </button>
            </div>
          </form>
        </div>
        
        {/* Comments list */}
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className={`border-t pt-6 ${comment.isAnswer ? 'border-green-200 bg-green-50 p-4 rounded-lg -mt-4' : ''}`}>
                <div className="flex">
                  {/* Voting */}
                  <div className="flex flex-col items-center mr-4">
                    <button className="text-gray-400 hover:text-blue-500">
                      <ArrowUpIcon className="h-5 w-5" />
                    </button>
                    <span className="my-1 text-sm font-medium text-gray-700">{comment.votes}</span>
                    <button className="text-gray-400 hover:text-red-500">
                      <ArrowDownIcon className="h-5 w-5" />
                    </button>
                    {comment.isAnswer && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-2" />
                    )}
                  </div>
                  
                  {/* Comment content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <img 
                        src={comment.author.avatar} 
                        alt={comment.author.name} 
                        className="h-6 w-6 rounded-full mr-2"
                      />
                      <div className="flex items-center text-sm">
                        <span className={`font-medium ${comment.author.id === 'ai' ? 'text-blue-600' : 'text-gray-900'}`}>
                          {comment.author.name}
                          {comment.author.id === 'ai' && <span className="ml-1 text-xs font-normal bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">AI</span>}
                        </span>
                        <span className="mx-1.5 text-gray-500">•</span>
                        <span className="text-gray-500">{comment.createdAt}</span>
                      </div>
                      {comment.isAnswer && (
                        <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 text-xs font-medium rounded">
                          Accepted Answer
                        </span>
                      )}
                    </div>
                    
                    <div className="prose max-w-none text-sm text-gray-800 mb-2">
                      <p>{comment.content}</p>
                    </div>
                    
                    {comment.codeSnippet && (
                      <div className="my-3 bg-gray-900 rounded-md overflow-hidden">
                        <div className="px-4 py-1 bg-gray-800 text-gray-400 text-xs">{comment.codeSnippet.language}</div>
                        <pre className="p-4 text-sm text-gray-300 overflow-auto">
                          <code>{comment.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}
                    
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <button className="flex items-center hover:text-gray-700">
                        <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                      <button className="flex items-center hover:text-gray-700">
                        <ShareIcon className="h-4 w-4 mr-1" />
                        Share
                      </button>
                      {post.type === 'question' && !comment.isAnswer && (
                        <button className="flex items-center text-green-600 hover:text-green-700">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Mark as Answer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Be the first to respond to this post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail; 