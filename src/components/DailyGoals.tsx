
import React, { useState } from 'react';
import { Target, Flame, CheckCircle, Circle } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  completed: boolean;
}

const DailyGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: 'Complete 2 video lessons', completed: true },
    { id: 2, title: 'Solve 5 math problems', completed: true },
    { id: 3, title: 'Take chemistry quiz', completed: false },
    { id: 4, title: 'Review biology notes', completed: false },
  ]);

  const [streak] = useState(7);
  const completedGoals = goals.filter(g => g.completed).length;
  const progressPercentage = (completedGoals / goals.length) * 100;

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-green-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Daily Goals</h3>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center gap-4 mb-6 p-3 bg-orange-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" size={20} />
          <span className="font-bold text-orange-700">{streak} day streak!</span>
        </div>
        <div className="text-xs text-orange-600">Keep it up! 🔥</div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress ({completedGoals}/{goals.length})
          </span>
          <span className="text-sm font-bold text-green-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              goal.completed 
                ? 'bg-green-50 hover:bg-green-100' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {goal.completed ? (
              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
            ) : (
              <Circle className="text-gray-400 flex-shrink-0" size={20} />
            )}
            
            <span className={`text-sm ${
              goal.completed 
                ? 'text-gray-600 line-through' 
                : 'text-gray-800'
            }`}>
              {goal.title}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      {progressPercentage === 100 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center">
          <p className="text-purple-700 font-semibold text-sm">
            🎉 All goals completed! You're amazing!
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyGoals;
