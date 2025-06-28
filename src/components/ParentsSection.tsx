
import React from 'react';
import { X, Clock, BookOpen, TrendingUp, Star } from 'lucide-react';

interface ParentsSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ParentsSection: React.FC<ParentsSectionProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const studyData = {
    subjects: [
      { name: 'Mathematics', chapters: 12, timeSpent: '45 min', progress: 85 },
      { name: 'Physics', chapters: 8, timeSpent: '32 min', progress: 72 },
      { name: 'Chemistry', chapters: 6, timeSpent: '28 min', progress: 60 },
      { name: 'Biology', chapters: 4, timeSpent: '15 min', progress: 40 }
    ],
    dailyTime: '2h 30m',
    weeklyAverage: '17h 45m',
    quizPerformance: 78
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Parents Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Today's Study Time</p>
                  <p className="text-xl font-bold text-blue-600">{studyData.dailyTime}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Weekly Average</p>
                  <p className="text-xl font-bold text-green-600">{studyData.weeklyAverage}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Star className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Quiz Performance</p>
                  <p className="text-xl font-bold text-purple-600">{studyData.quizPerformance}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Overview */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Subject Progress</h3>
            <div className="space-y-4">
              {studyData.subjects.map((subject, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-gray-600" size={20} />
                      <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                    </div>
                    <span className="text-sm text-gray-600">{subject.timeSpent} today</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Chapters Viewed</p>
                      <p className="font-semibold text-gray-800">{subject.chapters} chapters</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="font-semibold text-gray-800">{subject.progress}%</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions Panel */}
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Suggestions for Parents</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Encourage Alex to spend more time on Biology - currently at 40% progress</li>
              <li>• Great progress in Mathematics! Consider introducing advanced topics</li>
              <li>• Schedule regular breaks during study sessions for better retention</li>
              <li>• Quiz performance is good - maybe try more challenging practice tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsSection;
