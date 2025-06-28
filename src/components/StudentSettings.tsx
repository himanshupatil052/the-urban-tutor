
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface StudentSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (data: { name: string; grade: string; preferences: string[] }) => void;
}

const StudentSettings: React.FC<StudentSettingsProps> = ({ 
  isOpen, 
  onClose, 
  currentName, 
  onSave 
}) => {
  const [name, setName] = useState(currentName);
  const [grade, setGrade] = useState('Grade 9');
  const [preferences, setPreferences] = useState<string[]>(['Mathematics', 'Physics']);

  const gradeOptions = [
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 
    'Grade 11', 'Grade 12'
  ];

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'History', 'Geography', 'Computer Science'
  ];

  const handlePreferenceToggle = (subject: string) => {
    setPreferences(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSave = () => {
    onSave({ name, grade, preferences });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Student Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade/Class
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {gradeOptions.map((gradeOption) => (
                <option key={gradeOption} value={gradeOption}>
                  {gradeOption}
                </option>
              ))}
            </select>
          </div>

          {/* Learning Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Subjects
            </label>
            <div className="grid grid-cols-2 gap-2">
              {subjectOptions.map((subject) => (
                <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.includes(subject)}
                    onChange={() => handlePreferenceToggle(subject)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
