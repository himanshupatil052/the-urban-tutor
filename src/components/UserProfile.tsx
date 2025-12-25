import React, { useState } from 'react';
import { Shuffle, ChevronDown, Settings, Users } from 'lucide-react';
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

interface UserProfileProps {
  onParentsClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onParentsClick }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(funnyAvatars[0]);
  const [showAvatars, setShowAvatars] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('Himanshu');

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
      <div className="bg-white rounded-xl px-3 sm:px-4 py-3 shadow-sm border border-gray-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-4">
        {/* Left: Avatar + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowAvatars(!showAvatars)}
              className="relative group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl sm:text-2xl border-2 border-blue-200 group-hover:border-blue-400 transition-colors">
                {selectedAvatar.emoji}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 group-hover:bg-blue-600 transition-colors">
                <ChevronDown size={10} />
              </div>
            </button>

            {showAvatars && (
              <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 z-20 w-64 sm:w-80 left-0 animate-scale-in">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Choose your avatar:</p>
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
                
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {funnyAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setShowAvatars(false);
                      }}
                      className={`group relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-sm ${
                        selectedAvatar.id === avatar.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      title={avatar.name}
                    >
                      <span className="text-xl sm:text-2xl mb-1">{avatar.emoji}</span>
                      <span className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded text-[10px]">
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm sm:text-lg font-bold text-gray-800 truncate">
              {getGreeting()}, {userName}! 👋
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm truncate">Ready to learn something new today?</p>
          </div>
        </div>

        {/* Right: Playing as + Parents Section */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden xs:flex items-center gap-1 sm:gap-2 bg-blue-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
            <span className="text-[10px] sm:text-xs text-gray-500">Playing as:</span>
            <span className="text-[10px] sm:text-xs font-medium text-blue-600">{selectedAvatar.name}</span>
          </div>
          
          {onParentsClick && (
            <button
              onClick={onParentsClick}
              className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
            >
              <Users size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Parents</span>
            </button>
          )}
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
