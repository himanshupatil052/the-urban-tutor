import React, { useState } from 'react';
import { FlaskConical, Calculator, Atom, Dna, ArrowLeft, Beaker, Home } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  subject: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  experiments: Experiment[];
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  type: 'mixing' | 'reaction' | 'puzzle';
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

const chemistryChapters: Chapter[] = [
  {
    id: 'acids-bases',
    title: 'Acids and Bases',
    description: 'Learn about pH levels and neutralization reactions',
    experiments: [
      { id: 'ph-test', title: 'pH Testing Lab', description: 'Test various solutions with virtual pH strips', type: 'mixing' },
      { id: 'neutralization', title: 'Neutralization Reaction', description: 'Mix acids and bases to create neutral solutions', type: 'reaction' },
      { id: 'indicator-puzzle', title: 'Indicator Color Puzzle', description: 'Match colors with pH levels', type: 'puzzle' }
    ]
  },
  {
    id: 'chemical-reactions',
    title: 'Chemical Reactions',
    description: 'Explore different types of chemical reactions',
    experiments: [
      { id: 'combustion', title: 'Combustion Reactions', description: 'Watch virtual burning reactions', type: 'reaction' },
      { id: 'precipitation', title: 'Precipitation Lab', description: 'Create colorful precipitates', type: 'mixing' },
      { id: 'equation-balance', title: 'Balance Chemical Equations', description: 'Solve equation balancing puzzles', type: 'puzzle' }
    ]
  },
  {
    id: 'organic-chemistry',
    title: 'Organic Chemistry',
    description: 'Study carbon compounds and molecular structures',
    experiments: [
      { id: 'molecule-builder', title: 'Molecule Builder', description: 'Build organic molecules from atoms', type: 'puzzle' },
      { id: 'functional-groups', title: 'Functional Groups Lab', description: 'Identify and create functional groups', type: 'mixing' },
      { id: 'isomer-challenge', title: 'Isomer Challenge', description: 'Find different arrangements of the same formula', type: 'puzzle' }
    ]
  }
];

const physicsActivities = [
  {
    id: 'forces-motion',
    title: 'Forces and Motion Lab',
    description: 'Experiment with gravity, friction, and momentum in virtual scenarios',
    type: 'simulation' as const
  },
  {
    id: 'electricity-circuits',
    title: 'Circuit Builder',
    description: 'Build electrical circuits and observe current flow patterns',
    type: 'building' as const
  }
];

const biologyActivities = [
  {
    id: 'cell-explorer',
    title: 'Cell Structure Explorer',
    description: 'Navigate through plant and animal cells to learn their components',
    type: 'exploration' as const
  },
  {
    id: 'ecosystem-builder',
    title: 'Ecosystem Balance Game',
    description: 'Create balanced ecosystems by managing predator-prey relationships',
    type: 'simulation' as const
  }
];

const ChemistryExperiment: React.FC<{ experiment: Experiment; onBack: () => void }> = ({ experiment, onBack }) => {
  const [chemicals, setChemicals] = useState([
    { id: 1, name: 'H₂O', color: 'bg-blue-400', dragging: false },
    { id: 2, name: 'NaCl', color: 'bg-white border-2 border-gray-300', dragging: false },
    { id: 3, name: 'HCl', color: 'bg-yellow-400', dragging: false },
    { id: 4, name: 'NaOH', color: 'bg-pink-400', dragging: false }
  ]);
  
  const [beakerContents, setBeakerContents] = useState<any[]>([]);
  const [reaction, setReaction] = useState('');
  const [score, setScore] = useState(0);

  const handleDrop = (chemicalId: number) => {
    const chemical = chemicals.find(c => c.id === chemicalId);
    if (chemical) {
      setBeakerContents(prev => [...prev, chemical]);
      
      // Enhanced reaction simulation
      const newContents = [...beakerContents, chemical];
      if (newContents.length === 2) {
        setReaction('Mixing chemicals... 🧪');
        setTimeout(() => {
          const reactions = [
            'Perfect reaction! pH neutralized! ✨',
            'Wow! Beautiful color change! 🌈',
            'Great! Precipitate formed! ⭐',
            'Excellent! Gas evolved! 💨'
          ];
          setReaction(reactions[Math.floor(Math.random() * reactions.length)]);
          setScore(prev => prev + 10);
        }, 1500);
      }
    }
  };

  const resetExperiment = () => {
    setBeakerContents([]);
    setReaction('');
  };

  return (
    <div className="bg-green-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-green-600 hover:text-green-800 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Chapters
        </button>
        <div>
          <h3 className="text-xl font-bold text-green-800">{experiment.title}</h3>
          <p className="text-green-600 text-sm">{experiment.description}</p>
        </div>
        <div className="ml-auto bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          Score: {score}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-green-700 font-medium mb-4">Available Chemicals:</p>
          <div className="grid grid-cols-2 gap-3">
            {chemicals.map(chemical => (
              <div
                key={chemical.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('chemical', chemical.id.toString())}
                className={`${chemical.color} p-4 rounded-lg cursor-move hover:scale-105 transition-transform text-center font-mono text-sm shadow-md border-2 border-green-200`}
              >
                {chemical.name}
              </div>
            ))}
          </div>
          
          <button
            onClick={resetExperiment}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full"
          >
            Reset Experiment
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const chemicalId = parseInt(e.dataTransfer.getData('chemical'));
              handleDrop(chemicalId);
            }}
            className="w-32 h-40 bg-gradient-to-t from-gray-200 to-transparent border-4 border-gray-400 rounded-b-full relative overflow-hidden shadow-lg"
          >
            <Beaker className="absolute top-2 left-1/2 transform -translate-x-1/2 text-gray-400" size={24} />
            {beakerContents.map((chemical, index) => (
              <div
                key={index}
                className={`absolute bottom-0 w-full transition-all duration-500 ${chemical.color} opacity-70`}
                style={{ height: `${Math.min(30 + index * 15, 120)}px` }}
              />
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-green-700 font-medium text-sm mb-2">Virtual Beaker</p>
            <p className="text-green-600 text-xs mb-4">
              {reaction || 'Drag chemicals here to start experimenting!'}
            </p>
            
            {beakerContents.length > 0 && (
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-green-800 text-xs font-medium">Contents:</p>
                <p className="text-green-700 text-xs">
                  {beakerContents.map(c => c.name).join(' + ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MathPuzzle: React.FC = () => {
  const [equation, setEquation] = useState('2 + ? = 8');
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const equations = [
    { question: '2 + ? = 8', answer: '6' },
    { question: '3 × ? = 15', answer: '5' },
    { question: '? - 4 = 7', answer: '11' },
    { question: '10 ÷ ? = 2', answer: '5' },
    { question: '? + 9 = 17', answer: '8' }
  ];

  const [currentEquation, setCurrentEquation] = useState(equations[0]);

  const checkAnswer = () => {
    const isCorrect = answer === currentEquation.answer;
    setCorrect(isCorrect);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    setTimeout(() => {
      if (isCorrect) {
        const nextEquation = equations[Math.floor(Math.random() * equations.length)];
        setCurrentEquation(nextEquation);
        setEquation(nextEquation.question);
        setAnswer('');
        setCorrect(null);
      }
    }, 1500);
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-blue-800">Math Puzzle Challenge</h3>
        <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          Score: {score}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-4xl font-mono mb-6 text-blue-900 bg-white p-4 rounded-lg shadow-sm">
          {equation}
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-24 h-14 text-center text-2xl border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none shadow-sm"
            placeholder="?"
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Check Answer
          </button>
        </div>
        
        {correct !== null && (
          <div className={`text-xl font-bold mb-4 ${correct ? 'text-green-600' : 'text-red-600'}`}>
            {correct ? '🎉 Excellent! Keep going!' : '❌ Try again! You can do it!'}
          </div>
        )}
        
        <p className="text-blue-600 text-sm">
          Solve math puzzles to earn points and improve your skills!
        </p>
      </div>
    </div>
  );
};

const PhysicsSimulator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  if (selectedActivity) {
    return (
      <div className="bg-purple-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedActivity(null)}
            className="text-purple-600 hover:text-purple-800 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Physics Labs
          </button>
          <h3 className="text-xl font-bold text-purple-800">Physics Simulation</h3>
        </div>
        <div className="text-center p-8">
          <p className="text-purple-700">Physics simulation coming soon! 🔬</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-purple-600 hover:text-purple-800 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Activities
        </button>
        <h3 className="text-2xl font-bold text-purple-800">Physics Lab</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {physicsActivities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => setSelectedActivity(activity.id)}
            className="bg-white border border-purple-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all group hover:scale-105"
          >
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Atom className="text-purple-600" size={24} />
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-2">{activity.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
              
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BiologyExplorer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  if (selectedActivity) {
    return (
      <div className="bg-orange-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedActivity(null)}
            className="text-orange-600 hover:text-orange-800 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Biology Labs
          </button>
          <h3 className="text-xl font-bold text-orange-800">Biology Explorer</h3>
        </div>
        <div className="text-center p-8">
          <p className="text-orange-700">Biology exploration coming soon! 🧬</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-orange-600 hover:text-orange-800 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Activities
        </button>
        <h3 className="text-2xl font-bold text-orange-800">Biology Explorer</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {biologyActivities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => setSelectedActivity(activity.id)}
            className="bg-white border border-orange-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all group hover:scale-105"
          >
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Dna className="text-orange-600" size={24} />
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-2">{activity.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
              
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FunActivities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const backToDashboard = () => {
    setSelectedActivity(null);
    setSelectedChapter(null);
    setSelectedExperiment(null);
  };

  const renderExperiment = () => {
    if (!selectedExperiment) return null;
    
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={backToDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Home size={16} />
            Back to Dashboard
          </button>
        </div>
        <ChemistryExperiment
          experiment={selectedExperiment}
          onBack={() => setSelectedExperiment(null)}
        />
      </div>
    );
  };

  const renderChapters = () => {
    if (selectedActivity !== 'chemistry-lab') return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedActivity(null)}
              className="text-green-600 hover:text-green-800 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Activities
            </button>
            <h3 className="text-2xl font-bold text-green-800">Chemistry Lab Chapters</h3>
          </div>
          <button
            onClick={backToDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Home size={16} />
            Back to Dashboard
          </button>
        </div>

        <div className="grid gap-4">
          {chemistryChapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter)}
              className="bg-green-50 border border-green-200 rounded-xl p-6 cursor-pointer hover:bg-green-100 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-green-900">
                    {chapter.title}
                  </h4>
                  <p className="text-green-600 mb-4">{chapter.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {chapter.experiments.map((exp) => (
                      <span
                        key={exp.id}
                        className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {exp.title}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="ml-4">
                  <FlaskConical className="text-green-500 group-hover:text-green-600" size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChapterExperiments = () => {
    if (!selectedChapter) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedChapter(null)}
              className="text-green-600 hover:text-green-800 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Chapters
            </button>
            <div>
              <h3 className="text-2xl font-bold text-green-800">{selectedChapter.title}</h3>
              <p className="text-green-600">{selectedChapter.description}</p>
            </div>
          </div>
          <button
            onClick={backToDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Home size={16} />
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedChapter.experiments.map((experiment) => (
            <div
              key={experiment.id}
              onClick={() => setSelectedExperiment(experiment)}
              className="bg-white border border-green-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all group hover:scale-105"
            >
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Beaker className="text-green-600" size={24} />
                </div>
                
                <h4 className="font-semibold text-gray-800 mb-2">{experiment.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{experiment.description}</p>
                
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  experiment.type === 'mixing' ? 'bg-blue-100 text-blue-800' :
                  experiment.type === 'reaction' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {experiment.type.charAt(0).toUpperCase() + experiment.type.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActivity = () => {
    if (selectedExperiment) {
      return renderExperiment();
    }
    
    if (selectedChapter) {
      return renderChapterExperiments();
    }
    
    if (selectedActivity === 'chemistry-lab') {
      return renderChapters();
    }
    
    if (selectedActivity === 'math-puzzles') {
      return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedActivity(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Activities
            </button>
            <button
              onClick={backToDashboard}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Home size={16} />
              Back to Dashboard
            </button>
          </div>
          <MathPuzzle />
        </div>
      );
    }
    
    if (selectedActivity === 'physics-sim') {
      return <PhysicsSimulator onBack={() => setSelectedActivity(null)} />;
    }
    
    if (selectedActivity === 'bio-explorer') {
      return <BiologyExplorer onBack={() => setSelectedActivity(null)} />;
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Fun Activities</h2>
      
      {selectedActivity ? (
        renderActivity()
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
