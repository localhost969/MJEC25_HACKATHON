import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface SkillsSectionProps {
  initialSkills: Skill[];
  onUpdate: (newSkills: Skill[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ initialSkills, onUpdate }) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    id: '',
    name: '',
    level: 'Intermediate'
  });

  const handleAddClick = () => {
    setIsAdding(true);
    setNewSkill({
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate'
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveSkill = () => {
    if (newSkill.name.trim() !== '') {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setIsAdding(false);
      onUpdate(updatedSkills);
    }
  };

  const handleDeleteSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
      [name]: value
    });
  };

  const getLevelBadgeColor = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      case 'Expert':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
              <input
                type="text"
                name="name"
                value={newSkill.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. JavaScript, Project Management, UX Design"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
              <select
                name="level"
                value={newSkill.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={handleCancelAdd}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSkill}
              className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm text-white hover:bg-blue-700"
              disabled={!newSkill.name.trim()}
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md"
          >
            <span className="text-gray-800">{skill.name}</span>
            <span className={`ml-2 text-xs font-medium rounded-full px-2 py-0.5 ${getLevelBadgeColor(skill.level)}`}>
              {skill.level}
            </span>
            <button
              onClick={() => handleDeleteSkill(skill.id)}
              className="ml-2 text-gray-400 hover:text-red-600"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}

        {skills.length === 0 && !isAdding && (
          <div className="w-full text-center py-6 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No skills added yet</p>
            <button
              onClick={handleAddClick}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add your skills
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection; 