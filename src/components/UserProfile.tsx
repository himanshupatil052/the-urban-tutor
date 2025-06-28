
import React, { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const avatars = [
  'photo-1649972904349-6e44c42644a7', // woman with laptop
  'photo-1486312338219-ce68d2c6f44d', // person with MacBook
  'photo-1582562124811-c09040d0a901', // orange tabby cat
  'photo-1535268647677-300dbf3d78d1'  // grey kitten
];

const UserProfile: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [showAvatars, setShowAvatars] = useState(false);
  const [userName] = useState('Alex');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowAvatars(!showAvatars)}
            className="relative group"
          >
            <img
              src={`https://images.unsplash.com/${selectedAvatar}?w=80&h=80&fit=crop&crop=face`}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-3 border-blue-200 group-hover:border-blue-400 transition-colors"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 group-hover:bg-blue-600 transition-colors">
              <ChevronDown size={12} />
            </div>
          </button>

          {showAvatars && (
            <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-10 animate-scale-in">
              <p className="text-sm font-medium text-gray-700 mb-3">Choose your avatar:</p>
              <div className="grid grid-cols-2 gap-2">
                {avatars.map((avatar, index) => (
                  <button
                    key={avatar}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatars(false);
                    }}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedAvatar === avatar ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={`https://images.unsplash.com/${avatar}?w=48&h=48&fit=crop&crop=face`}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {getGreeting()}, {userName}! 👋
          </h3>
          <p className="text-gray-600 text-sm">Ready to learn something new today?</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
