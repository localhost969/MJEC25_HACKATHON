import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  BookmarkIcon, 
  ClockIcon, 
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  EllipsisVerticalIcon,
  ChevronRightIcon,
  StarIcon,
  FireIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, BookmarkIcon as BookmarkSolidIcon, FireIcon as FireSolidIcon } from '@heroicons/react/24/solid';

// Simple tooltip component for our ResourceCard
const Tooltip = ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute z-50 hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 -mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded">
      {content}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
  </div>
);

// Simple toast function
const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
  console.log(`Toast: ${type} - ${title} - ${message || ''}`);
  alert(`${title}${message ? `\n${message}` : ''}`);
};

interface ResourceProps {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  lastUpdated: string;
  href: string;
  isFavorite?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  type?: 'video' | 'article' | 'course' | 'documentation' | 'tool';
  imageUrl?: string;
  rating?: number;
  tags?: string[];
  onToggleFavorite: (id: string) => void;
  onToggleRating?: (id: string, rating: number) => void;
}

export const ResourceCard: React.FC<ResourceProps> = ({ 
  id,
  title, 
  category, 
  description, 
  icon, 
  lastUpdated, 
  href, 
  isFavorite = false,
  difficulty,
  type,
  imageUrl,
  rating = 0,
  tags = [],
  onToggleFavorite,
  onToggleRating
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = () => {
    switch(type) {
      case 'video': return '🎥';
      case 'article': return '📝';
      case 'course': return '🎓';
      case 'documentation': return '📚';
      case 'tool': return '🛠️';
      default: return '📄';
    }
  };
  
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(href);
    showToast('success', 'Link copied!', 'The link has been copied to your clipboard.');
    setIsMenuOpen(false);
  };
  
  const shareResource = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: href
      }).catch(console.error);
    } else {
      copyToClipboard();
    }
    setIsMenuOpen(false);
  };
  
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all ${
        isHovered ? 'scale-[1.01]' : 'scale-100'
      } ${isExpanded ? 'scale-100' : ''}`}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverRating(0);
      }}
      layout
    >
      {/* Card Header with Image */}
      {imageUrl && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-700 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60"></div>
          {type && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md backdrop-blur-sm flex items-center gap-1">
              <span>{getTypeIcon()}</span>
              <span className="capitalize">{type}</span>
            </div>
          )}
          {difficulty && (
            <div className={`absolute top-3 right-3 px-2 py-1 text-xs capitalize font-medium rounded-full ${getDifficultyColor()}`}>
              {difficulty}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        {/* Resource Icon and Category */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-md mr-3">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
              <p className="text-xs text-gray-500">{category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 relative">
            <Tooltip content="Save resource">
              <button 
                onClick={() => onToggleFavorite(id)} 
                className={`p-1.5 rounded-full ${isFavorite ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
              >
                {isFavorite ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
              </button>
            </Tooltip>
            
            <Tooltip content="More options">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative"
              >
                <EllipsisVerticalIcon className="w-5 h-5" />
              </button>
            </Tooltip>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                <div className="py-1">
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                    Copy link
                  </button>
                  <button 
                    onClick={shareResource}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className={`text-sm text-gray-700 mt-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {description}
        </p>
        
        {/* Expand Button */}
        {description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs flex items-center text-blue-600 hover:text-blue-800 mt-1 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <ChevronRightIcon className={`w-3 h-3 ml-0.5 transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        )}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <Tooltip content={tags.slice(3).join(', ')}>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs cursor-help">
                  +{tags.length - 3} more
                </span>
              </Tooltip>
            )}
          </div>
        )}
        
        {/* Rating */}
        {onToggleRating && (
          <div className="flex items-center mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-0.5 focus:outline-none"
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => onToggleRating(id, star)}
                >
                  {star <= (hoverRating || rating) ? (
                    <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <StarIcon className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              {rating > 0 ? `(${rating.toFixed(1)})` : '(Rate)'}
            </span>
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center">
            <ClockIcon className="w-3 h-3 mr-1" />
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </div>
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Visit
            <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
