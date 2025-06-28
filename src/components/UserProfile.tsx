
import React, { useState } from 'react';
import { Shuffle, ChevronDown, Settings } from 'lucide-react';
import StudentSettings from './StudentSettings';

const funnyAvatars = [
  { id: 'cat1', emoji: '🐱', name: 'Cool Cat' },
  { id: 'dog1', emoji: '🐶', name: 'Happy Dog' },
  { id: 'panda', emoji: '🐼', name: 'Study Panda' },
  { id: 'fox', emoji: '🦊', name: 'Smart Fox' },
  { id: 'bear', emoji: '🐻', name: 'Teddy Bear' },
  { id: 'monkey', emoji: '🐵', name: 'Cheeky Monkey' },
  { id: 'lion', emoji: '🦁', name: 'Brave Lion' },
  { id: 'tiger', emoji: '🐯', name: 'Tiger Student' },
  { id: 'unicorn', emoji: '🦄', name: 'Magic Unicorn' },
  { id: 'robot', emoji: '🤖', name: 'Study Bot' },
  { id: 'alien', emoji: '👽', name: 'Space Learner' },
  { id: 'wizard', emoji: '🧙‍♂️', name: 'Math Wizard' }
];

const UserProfile: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(funnyAvatars[0]);
  const [showAvatars, setShowAvatars] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('Alex');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRandomAvatar = () => {
    const randomAvatar = funnyAvatars[Math.floor(Math.random() * funnyAvatars.length)];
    setSelectedAvatar(randomAvatar);
    setShowAvatars(false);
  };

  const handleSettingsSave = (data: { name: string; grade: string; preferences: string[] }) => {
    setUserName(data.name);
    console.log('Settings saved:', data);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowAvatars(!showAvatars)}
              className="relative group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-3xl border-3 border-blue-200 group-hover:border-blue-400 transition-colors shadow-sm">
                {selectedAvatar.emoji}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 group-hover:bg-blue-600 transition-colors shadow-sm">
                <ChevronDown size={12} />
              </div>
            </button>

            {showAvatars && (
              <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-20 w-80 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700">Choose your avatar:</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={getRandomAvatar}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-full transition-colors"
                    >
                      <Shuffle size={12} />
                      Random
                    </button>
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setShowAvatars(false);
                      }}
                      className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 bg-gray-50 px-2 py-1 rounded-full transition-colors"
                    >
                      <Settings size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {funnyAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setShowAvatars(false);
                      }}
                      className={`group relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-sm ${
                        selectedAvatar.id === avatar.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      title={avatar.name}
                    >
                      <span className="text-2xl mb-1">{avatar.emoji}</span>
                      <span className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded text-[10px]">
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {getGreeting()}, {userName}! 👋
            </h3>
            <p className="text-gray-600 text-sm mb-2">Ready to learn something new today?</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Playing as:</span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {selectedAvatar.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <StudentSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentName={userName}
        onSave={handleSettingsSave}
      />
    </>
  );
};

export default UserProfile;
