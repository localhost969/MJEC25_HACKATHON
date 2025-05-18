import React from 'react';
import Link from 'next/link';
import { 
  ChatBubbleLeftIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  BookmarkIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

export type PostType = 'question' | 'discussion' | 'resource';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  type: PostType;
  votes: number;
  replies: number;
  tags: string[];
  createdAt: string;
  solved?: boolean;
  communityId: string;
};

interface PostCardProps {
  post: Post;
}

const PostTypeIcon = ({ type, solved }: { type: PostType; solved?: boolean }) => {
  switch (type) {
    case 'question':
      return solved ? (
        <CheckCircleIcon className="h-6 w-6 text-green-500" />
      ) : (
        <QuestionMarkCircleIcon className="h-6 w-6 text-blue-500" />
      );
    case 'discussion':
      return <DocumentTextIcon className="h-6 w-6 text-purple-500" />;
    case 'resource':
      return <LinkIcon className="h-6 w-6 text-orange-500" />;
    default:
      return null;
  }
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="p-4">
        <div className="flex items-start">
          {/* Vote column */}
          <div className="flex flex-col items-center mr-4">
            <button className="text-gray-400 hover:text-blue-500">
              <ArrowUpIcon className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-gray-700 my-1">{post.votes}</span>
            <button className="text-gray-400 hover:text-red-500">
              <ArrowDownIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content column */}
          <div className="flex-1">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <PostTypeIcon type={post.type} solved={post.solved} />
              </div>
              <div className="flex-1">
                <Link href={`/community/${post.communityId}/post/${post.id}`} className="hover:underline">
                  <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                </Link>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.content}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <div className="flex-shrink-0">
                <img className="h-6 w-6 rounded-full" src={post.author.avatar} alt="" />
              </div>
              <div className="ml-2">
                <span className="font-medium text-gray-900">{post.author.name}</span>
                <span className="mx-1">•</span>
                <span>{post.createdAt}</span>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center">
                <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                <span>{post.replies} replies</span>
                <button className="ml-4 text-gray-400 hover:text-blue-500">
                  <BookmarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 