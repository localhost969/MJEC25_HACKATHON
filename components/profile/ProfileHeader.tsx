import React, { useState } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';

interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  profileImage: string;
  coverImage: string;
}

interface ProfileHeaderProps {
  initialData: ProfileData;
  onUpdate: (data: ProfileData) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ initialData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialData);
  const [tempData, setTempData] = useState(initialData);

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    onUpdate(tempData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData({
          ...tempData,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData({
          ...tempData,
          coverImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={profileData.coverImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        
        {isEditing && (
          <div className="absolute bottom-2 right-2">
            <label htmlFor="cover-upload" className="cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-50">
                <CameraIcon className="h-5 w-5 text-gray-600" />
              </div>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
              />
            </label>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="p-6 relative">
        {/* Profile Image */}
        <div className="absolute -top-20 left-6 w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
          <img 
            src={profileData.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          
          {isEditing && (
            <label htmlFor="profile-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
              <CameraIcon className="h-8 w-8 text-white" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>
          )}
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex justify-end">
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm text-white hover:bg-blue-700"
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              <PencilIcon className="h-4 w-4 mr-1" />
              Edit
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="mt-12">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={tempData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={tempData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={tempData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-lg text-gray-700 mt-1">{profileData.title}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.location}</p>
              
              <div className="mt-4">
                <p className="text-gray-700 whitespace-pre-line">{profileData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 