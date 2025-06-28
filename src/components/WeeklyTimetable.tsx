
import React from 'react';
import { Clock } from 'lucide-react';

const timetable = [
  { day: 'Mon', subject: 'Mathematics', time: '9:00 AM', color: 'bg-blue-500' },
  { day: 'Tue', subject: 'Physics', time: '10:00 AM', color: 'bg-purple-500' },
  { day: 'Wed', subject: 'Chemistry', time: '9:00 AM', color: 'bg-green-500' },
  { day: 'Thu', subject: 'Biology', time: '11:00 AM', color: 'bg-orange-500' },
  { day: 'Fri', subject: 'Mathematics', time: '9:00 AM', color: 'bg-blue-500' },
];

const WeeklyTimetable: React.FC = () => {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = weekdays[today];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Weekly Timetable</h3>
      </div>

      <div className="space-y-3">
        {timetable.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border-l-4 transition-all duration-200 ${
              item.day === currentDay
                ? 'bg-blue-50 border-blue-500 shadow-sm'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.subject}</p>
                  <p className="text-gray-600 text-xs">{item.day} - {item.time}</p>
                </div>
              </div>
              
              {item.day === currentDay && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Today
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTimetable;
