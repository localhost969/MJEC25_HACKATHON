import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagIcon, XMarkIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface SelectTagsProps {
  availableTags: Tag[];
  selectedTags: string[];
  onChange: (selectedIds: string[]) => void;
  canCreateTags?: boolean;
  maxTags?: number;
  placeholder?: string;
  className?: string;
}

export const SelectTags = ({
  availableTags,
  selectedTags,
  onChange,
  canCreateTags = false,
  maxTags = Infinity,
  placeholder = 'Select or create tags...',
  className = ''
}: SelectTagsProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedTagObjects = availableTags.filter(tag => selectedTags.includes(tag.id));
  const filteredTags = availableTags.filter(tag => 
    !selectedTags.includes(tag.id) && 
    tag.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isDropdownOpen) setIsDropdownOpen(true);
  };

  const handleTagSelect = (tagId: string) => {
    if (selectedTags.length < maxTags) {
      onChange([...selectedTags, tagId]);
      setInputValue('');
    }
  };

  const handleTagRemove = (tagId: string) => {
    onChange(selectedTags.filter(id => id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && canCreateTags) {
      e.preventDefault();
      
      // Check if tag already exists
      const existingTag = availableTags.find(
        tag => tag.name.toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      if (existingTag) {
        if (!selectedTags.includes(existingTag.id)) {
          handleTagSelect(existingTag.id);
        }
      } else {
        // In a real app, you would add the tag to your database here
        console.log('Creating new tag:', inputValue);
        // For this example, we'll just simulate adding the tag
        const newTagId = `new-${Date.now()}`;
        const newTag = { id: newTagId, name: inputValue.trim() };
        // This is simplified - in a real app you would update the availableTags list
        handleTagSelect(newTagId);
      }
      
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      handleTagRemove(selectedTags[selectedTags.length - 1]);
    }
  };

  const getTagColor = (color?: string) => {
    return {
      backgroundColor: color || '#e5e7eb',
      color: color ? (
        // Determine text color based on background brightness
        getLuminance(color) > 0.5 ? '#1f2937' : 'white'
      ) : '#4b5563'
    };
  };

  // Calculate luminance to determine if text should be dark or light
  const getLuminance = (hexColor: string) => {
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Calculate luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div 
        className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        onClick={() => inputRef.current?.focus()}
      >
        {selectedTagObjects.map(tag => (
          <div
            key={tag.id}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-sm"
            style={getTagColor(tag.color)}
          >
            <span>{tag.name}</span>
            <button
              type="button"
              className="focus:outline-none hover:bg-black/10 rounded-full p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                handleTagRemove(tag.id);
              }}
            >
              <XMarkIcon className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? placeholder : ''}
          className="flex-grow min-w-[120px] outline-none text-sm py-1"
          disabled={selectedTags.length >= maxTags}
        />
      </div>
      
      <AnimatePresence>
        {isDropdownOpen && (filteredTags.length > 0 || (canCreateTags && inputValue.trim())) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            <ul className="py-1">
              {inputValue.trim() && canCreateTags && !availableTags.some(
                tag => tag.name.toLowerCase() === inputValue.toLowerCase()
              ) && (
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm"
                  onClick={() => {
                    const newTagId = `new-${Date.now()}`;
                    handleTagSelect(newTagId);
                    setInputValue('');
                  }}
                >
                  <PlusIcon className="w-4 h-4 text-blue-600" />
                  <span>Create "<strong>{inputValue}</strong>"</span>
                </li>
              )}
              
              {filteredTags.map(tag => (
                <li
                  key={tag.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-sm"
                  onClick={() => {
                    handleTagSelect(tag.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color || '#9ca3af' }}
                    ></span>
                    <span>{tag.name}</span>
                  </div>
                  
                  {selectedTags.includes(tag.id) && (
                    <CheckIcon className="w-4 h-4 text-blue-600" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
