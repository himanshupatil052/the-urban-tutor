
import React from 'react';
import { Badge, Trophy, Star, BookOpen, Target, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const achievements: Achievement[] = [
  {
    id: 'videos-5',
    title: 'Video Explorer',
    description: 'Watched 5 videos',
    icon: BookOpen,
    unlocked: true
  },
  {
    id: 'quiz-perfect',
    title: 'Perfect Score',
    description: 'Scored 100% in 3 quizzes',
    icon: Star,
    unlocked: true
  },
  {
    id: 'subject-complete',
    title: 'Subject Master',
    description: 'Completed 1 subject',
    icon: Trophy,
    unlocked: true
  },
  {
    id: 'streak-7',
    title: 'Study Streak',
    description: 'Studied for 7 days in a row',
    icon: Target,
    unlocked: false,
    progress: 4,
    maxProgress: 7
  },
  {
    id: 'experiments-10',
    title: 'Lab Scientist',
    description: 'Completed 10 experiments',
    icon: Award,
    unlocked: false,
    progress: 6,
    maxProgress: 10
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Completed 20 quizzes',
    icon: Badge,
    unlocked: false,
    progress: 12,
    maxProgress: 20
  }
];

const Achievements: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" size={24} />
        My Achievements
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                </div>
                {achievement.unlocked && (
                  <div className="text-yellow-500">
                    <Star size={16} fill="currentColor" />
                  </div>
                )}
              </div>
              
              <p className={`text-sm mb-2 ${
                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              
              {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
