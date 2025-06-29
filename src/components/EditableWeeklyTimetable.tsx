
import React, { useState } from 'react';
import { Clock, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface TimetableEntry {
  id: string;
  day: string;
  subject: string;
  time: string;
  color: string;
}

const initialTimetable: TimetableEntry[] = [
  { id: '1', day: 'Mon', subject: 'Mathematics', time: '9:00 AM', color: 'bg-blue-500' },
  { id: '2', day: 'Tue', subject: 'Physics', time: '10:00 AM', color: 'bg-purple-500' },
  { id: '3', day: 'Wed', subject: 'Chemistry', time: '9:00 AM', color: 'bg-green-500' },
  { id: '4', day: 'Thu', subject: 'Biology', time: '11:00 AM', color: 'bg-orange-500' },
  { id: '5', day: 'Fri', subject: 'Mathematics', time: '9:00 AM', color: 'bg-blue-500' },
];

const subjectColors = [
  { name: 'Mathematics', color: 'bg-blue-500' },
  { name: 'Physics', color: 'bg-purple-500' },
  { name: 'Chemistry', color: 'bg-green-500' },
  { name: 'Biology', color: 'bg-orange-500' },
  { name: 'English', color: 'bg-red-500' },
  { name: 'History', color: 'bg-yellow-500' },
];

const EditableWeeklyTimetable: React.FC = () => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(initialTimetable);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    day: 'Mon',
    subject: 'Mathematics',
    time: '9:00 AM',
    color: 'bg-blue-500'
  });

  const today = new Date().getDay();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = weekdays[today];

  const handleEdit = (id: string) => {
    setEditingEntry(id);
  };

  const handleSave = (id: string, updatedEntry: Partial<TimetableEntry>) => {
    setTimetable(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updatedEntry } : entry
    ));
    setEditingEntry(null);
  };

  const handleDelete = (id: string) => {
    setTimetable(prev => prev.filter(entry => entry.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setTimetable(prev => [...prev, { id: newId, ...newEntry }]);
    setShowAddForm(false);
    setNewEntry({
      day: 'Mon',
      subject: 'Mathematics',
      time: '9:00 AM',
      color: 'bg-blue-500'
    });
  };

  const EditableRow: React.FC<{ entry: TimetableEntry }> = ({ entry }) => {
    const [editData, setEditData] = useState(entry);

    return (
      <div className="p-3 rounded-lg border-l-4 bg-blue-50 border-blue-500 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${editData.color}`} />
            <div className="flex gap-2 flex-1">
              <select
                value={editData.subject}
                onChange={(e) => {
                  const selectedSubject = subjectColors.find(s => s.name === e.target.value);
                  setEditData({
                    ...editData,
                    subject: e.target.value,
                    color: selectedSubject?.color || 'bg-blue-500'
                  });
                }}
                className="text-sm font-medium bg-white border border-gray-300 rounded px-2 py-1"
              >
                {subjectColors.map(subject => (
                  <option key={subject.name} value={subject.name}>{subject.name}</option>
                ))}
              </select>
              <select
                value={editData.day}
                onChange={(e) => setEditData({ ...editData, day: e.target.value })}
                className="text-xs bg-white border border-gray-300 rounded px-2 py-1"
              >
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <input
                type="time"
                value={editData.time.replace(' AM', '').replace(' PM', '')}
                onChange={(e) => {
                  const time = new Date(`2000-01-01 ${e.target.value}`);
                  const formattedTime = time.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  });
                  setEditData({ ...editData, time: formattedTime });
                }}
                className="text-xs bg-white border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => handleSave(entry.id, editData)}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <Save size={14} />
            </button>
            <button
              onClick={() => setEditingEntry(null)}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Weekly Timetable</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
        >
          <Plus size={14} />
          Add Lesson
        </button>
      </div>

      <div className="space-y-3">
        {showAddForm && (
          <div className="p-3 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-medium text-blue-800">Add New Lesson</h4>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <select
                value={newEntry.subject}
                onChange={(e) => {
                  const selectedSubject = subjectColors.find(s => s.name === e.target.value);
                  setNewEntry({
                    ...newEntry,
                    subject: e.target.value,
                    color: selectedSubject?.color || 'bg-blue-500'
                  });
                }}
                className="text-sm bg-white border border-gray-300 rounded px-2 py-1"
              >
                {subjectColors.map(subject => (
                  <option key={subject.name} value={subject.name}>{subject.name}</option>
                ))}
              </select>
              <select
                value={newEntry.day}
                onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
                className="text-xs bg-white border border-gray-300 rounded px-2 py-1"
              >
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <input
                type="time"
                onChange={(e) => {
                  const time = new Date(`2000-01-01 ${e.target.value}`);
                  const formattedTime = time.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  });
                  setNewEntry({ ...newEntry, time: formattedTime });
                }}
                className="text-xs bg-white border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {timetable.map((item) => (
          <div key={item.id}>
            {editingEntry === item.id ? (
              <EditableRow entry={item} />
            ) : (
              <div
                className={`p-3 rounded-lg border-l-4 transition-all duration-200 group cursor-pointer ${
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
                  
                  <div className="flex items-center gap-2">
                    {item.day === currentDay && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        Today
                      </span>
                    )}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditableWeeklyTimetable;
