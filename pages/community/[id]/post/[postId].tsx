import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import PostDetail from '../../../../components/community/PostDetail';
import CommunitySidebar from '../../../../components/community/CommunitySidebar';
import { 
  getCommunity, 
  getPostById, 
  getPostComments 
} from '../../../../lib/communityData';

export default function PostDetailPage() {
  const router = useRouter();
  const { id, postId } = router.query;
  
  // Convert query params to strings
  const communityId = id as string;
  const postIdentifier = postId as string;
  
  // Get community, post, and comments data
  const community = getCommunity(communityId);
  const post = getPostById(postIdentifier);
  const comments = getPostComments(postIdentifier);
  
  // If the data isn't loaded yet or invalid params
  if (!community || !post) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-gray-500">Loading post...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1">
            <PostDetail post={post} comments={comments} />
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