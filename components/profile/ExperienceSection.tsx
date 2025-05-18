import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface ExperienceSectionProps {
  initialExperiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ initialExperiences, onUpdate }) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: '',
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  });

  // Update experiences when initialExperiences changes
  useEffect(() => {
    setExperiences(initialExperiences);
  }, [initialExperiences]);

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentExperience({
      id: Date.now().toString(),
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    });
  };

  const handleEditClick = (experience: Experience) => {
    setEditingId(experience.id);
    setCurrentExperience(experience);
  };

  const handleDeleteClick = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      const updatedExperiences = [...experiences, currentExperience];
      setExperiences(updatedExperiences);
      setIsAdding(false);
      onUpdate(updatedExperiences);
    } else if (editingId) {
      const updatedExperiences = experiences.map(exp => 
        exp.id === editingId ? currentExperience : exp
      );
      setExperiences(updatedExperiences);
      setEditingId(null);
      onUpdate(updatedExperiences);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExperience({
      ...currentExperience,
      current: e.target.checked,
      endDate: e.target.checked ? '' : currentExperience.endDate
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={currentExperience.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={currentExperience.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={currentExperience.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={currentExperience.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="current-job"
                type="checkbox"
                checked={currentExperience.current}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="current-job" className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>

          {!currentExperience.current && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={currentExperience.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={currentExperience.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="flex">
            <div className="mr-4 flex-shrink-0">
              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-lg font-bold text-gray-500">
                  {experience.company.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">{experience.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(experience)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(experience.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-md text-gray-700">{experience.company}</p>
              <p className="text-sm text-gray-500">{experience.location}</p>
              <p className="text-sm text-gray-500">
                {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
              </p>
              <div className="mt-2 text-gray-700">{experience.description}</div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && !isAdding && (
          <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No experience added yet</p>
            <button
              onClick={handleAddClick}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add your work experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection; 