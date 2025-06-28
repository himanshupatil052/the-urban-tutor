
import React, { useState } from 'react';
import { FlaskConical, Calculator, Atom, Dna } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  subject: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const activities: Activity[] = [
  {
    id: 'chemistry-lab',
    title: 'Virtual Chemistry Lab',
    subject: 'Chemistry',
    icon: FlaskConical,
    color: 'bg-green-500',
    description: 'Mix chemicals and see reactions'
  },
  {
    id: 'math-puzzles',
    title: 'Math Puzzles',
    subject: 'Mathematics',
    icon: Calculator,
    color: 'bg-blue-500',
    description: 'Solve visual math problems'
  },
  {
    id: 'physics-sim',
    title: 'Physics Simulator',
    subject: 'Physics',
    icon: Atom,
    color: 'bg-purple-500',
    description: 'Experiment with forces and motion'
  },
  {
    id: 'bio-explorer',
    title: 'Biology Explorer',
    subject: 'Biology',
    icon: Dna,
    color: 'bg-orange-500',
    description: 'Explore cells and organisms'
  }
];

const ChemistryLab: React.FC = () => {
  const [chemicals, setChemicals] = useState([
    { id: 1, name: 'H₂O', color: 'bg-blue-400', dragging: false },
    { id: 2, name: 'NaCl', color: 'bg-white border-2 border-gray-300', dragging: false },
    { id: 3, name: 'HCl', color: 'bg-yellow-400', dragging: false }
  ]);
  
  const [beakerContents, setBeakerContents] = useState<any[]>([]);
  const [reaction, setReaction] = useState('');

  const handleDrop = (chemicalId: number) => {
    const chemical = chemicals.find(c => c.id === chemicalId);
    if (chemical) {
      setBeakerContents(prev => [...prev, chemical]);
      
      // Simple reaction simulation
      if (beakerContents.length === 1) {
        setReaction('Mixing... 🧪');
        setTimeout(() => {
          setReaction('Reaction complete! ✨');
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-green-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-green-800">Virtual Chemistry Lab</h3>
      
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <p className="text-sm text-green-700 mb-3">Drag chemicals into the beaker:</p>
          {chemicals.map(chemical => (
            <div
              key={chemical.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('chemical', chemical.id.toString())}
              className={`${chemical.color} p-3 rounded-lg cursor-move hover:scale-105 transition-transform text-center font-mono text-sm shadow-md`}
            >
              {chemical.name}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const chemicalId = parseInt(e.dataTransfer.getData('chemical'));
              handleDrop(chemicalId);
            }}
            className="w-24 h-32 bg-gradient-to-t from-gray-200 to-transparent border-4 border-gray-400 rounded-b-full relative overflow-hidden"
          >
            {beakerContents.map((chemical, index) => (
              <div
                key={index}
                className={`absolute bottom-0 w-full h-8 ${chemical.color} opacity-70`}
                style={{ bottom: `${index * 8}px` }}
              />
            ))}
          </div>
          <p className="text-center mt-2 text-sm font-medium text-green-700">
            {reaction || 'Drop chemicals here!'}
          </p>
        </div>
      </div>
    </div>
  );
};

const MathPuzzle: React.FC = () => {
  const [equation, setEquation] = useState('2 + ? = 8');
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);

  const checkAnswer = () => {
    const isCorrect = answer === '6';
    setCorrect(isCorrect);
    
    setTimeout(() => {
      if (isCorrect) {
        const newEquations = ['3 × ? = 15', '? - 4 = 7', '10 ÷ ? = 2'];
        setEquation(newEquations[Math.floor(Math.random() * newEquations.length)]);
        setAnswer('');
        setCorrect(null);
      }
    }, 1500);
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">Math Puzzle</h3>
      
      <div className="text-center">
        <div className="text-3xl font-mono mb-4 text-blue-900">{equation}</div>
        
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-20 h-12 text-center text-xl border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="?"
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Check
          </button>
        </div>
        
        {correct !== null && (
          <div className={`mt-3 text-lg font-semibold ${correct ? 'text-green-600' : 'text-red-600'}`}>
            {correct ? '🎉 Correct!' : '❌ Try again!'}
          </div>
        )}
      </div>
    </div>
  );
};

const FunActivities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const renderActivity = () => {
    switch (selectedActivity) {
      case 'chemistry-lab':
        return <ChemistryLab />;
      case 'math-puzzles':
        return <MathPuzzle />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Fun Activities</h2>
      
      {selectedActivity ? (
        <div>
          <button
            onClick={() => setSelectedActivity(null)}
            className="text-blue-600 hover:text-blue-800 mb-4 text-sm"
          >
            ← Back to activities
          </button>
          {renderActivity()}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                onClick={() => setSelectedActivity(activity.id)}
                className="group cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`${activity.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{activity.subject}</p>
                <p className="text-gray-500 text-xs">{activity.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FunActivities;
