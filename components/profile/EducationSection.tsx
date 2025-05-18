import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
  activities: string;
  current: boolean;
}

interface EducationSectionProps {
  initialEducation: Education[];
  onUpdate: (newEducations: Education[]) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ initialEducation, onUpdate }) => {
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: '',
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    activities: '',
    current: false
  });

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentEducation({
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: '',
      activities: '',
      current: false
    });
  };

  const handleEditClick = (edu: Education) => {
    setEditingId(edu.id);
    setCurrentEducation(edu);
  };

  const handleDeleteClick = (id: string) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      const updatedEducation = [...education, currentEducation];
      setEducation(updatedEducation);
      setIsAdding(false);
      onUpdate(updatedEducation);
    } else if (editingId) {
      const updatedEducation = education.map(edu => 
        edu.id === editingId ? currentEducation : edu
      );
      setEducation(updatedEducation);
      setEditingId(null);
      onUpdate(updatedEducation);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEducation({
      ...currentEducation,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEducation({
      ...currentEducation,
      current: e.target.checked,
      endDate: e.target.checked ? '' : currentEducation.endDate
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
        <h2 className="text-xl font-bold text-gray-900">Education</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input
                type="text"
                name="school"
                value={currentEducation.school}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                name="degree"
                value={currentEducation.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                name="field"
                value={currentEducation.field}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <input
                type="text"
                name="grade"
                value={currentEducation.grade}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={currentEducation.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {!currentEducation.current && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={currentEducation.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="current-education"
                type="checkbox"
                checked={currentEducation.current}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="current-education" className="ml-2 block text-sm text-gray-700">
                I am currently studying here
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Activities and Societies</label>
            <textarea
              name="activities"
              value={currentEducation.activities}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Clubs, sports, leadership roles, etc."
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
        {education.map((edu) => (
          <div key={edu.id} className="flex">
            <div className="mr-4 flex-shrink-0">
              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-lg font-bold text-gray-500">
                  {edu.school.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">{edu.school}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(edu)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(edu.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-md text-gray-700">{edu.degree} {edu.field && `- ${edu.field}`}</p>
              <p className="text-sm text-gray-500">
                {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
              </p>
              {edu.grade && <p className="text-sm text-gray-600 mt-1">Grade: {edu.grade}</p>}
              {edu.activities && <p className="text-sm text-gray-600 mt-1">{edu.activities}</p>}
            </div>
          </div>
        ))}

        {education.length === 0 && !isAdding && (
          <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No education added yet</p>
            <button
              onClick={handleAddClick}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add your education
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSection; 