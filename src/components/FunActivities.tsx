
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  name: string;
  description: string;
  experiments: Experiment[];
}

interface Experiment {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  duration: string;
  thumbnail: string;
  interactive: boolean;
}

const FunActivities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State for interactive experiments
  const [neuralSignalActive, setNeuralSignalActive] = useState(false);
  const [microscopeZoom, setMicroscopeZoom] = useState('10x');
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [diceRolls, setDiceRolls] = useState(0);
  const [diceSuccesses, setDiceSuccesses] = useState(0);
  const [frictionSurface, setFrictionSurface] = useState('wood');
  const [frictionActive, setFrictionActive] = useState(false);
  const [soundFreq, setSoundFreq] = useState(440);
  const [soundAmp, setSoundAmp] = useState(5);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [flameGravity, setFlameGravity] = useState('normal');
  const [pressure, setPressure] = useState(1.0);
  const [temperature, setTemperature] = useState(100);
  const [isBoiling, setIsBoiling] = useState(false);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setSelectedChapter(null);
    setSelectedExperiment(null);
    
    // Auto-scroll to top when switching subjects
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedExperiment(null);
  };

  const handleBackToDashboard = () => {
    setSelectedActivity(null);
    setSelectedChapter(null);
    setSelectedExperiment(null);
  };

  const handleExperimentClick = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
  };

  const handleBackToChapter = () => {
    setSelectedExperiment(null);
  };

  const handleStartExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    // Auto-scroll to show the simulation
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Interactive experiment functions
  const startNeuralSignal = () => {
    setNeuralSignalActive(true);
    setTimeout(() => setNeuralSignalActive(false), 3000);
  };

  const changeMicroscopeZoom = (zoom: string) => {
    setMicroscopeZoom(zoom);
  };

  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const sum = die1 + die2;
    setDiceResults([die1, die2]);
    setDiceRolls(prev => prev + 1);
    if (sum === 7) {
      setDiceSuccesses(prev => prev + 1);
    }
  };

  const startFrictionTest = () => {
    setFrictionActive(true);
    setTimeout(() => setFrictionActive(false), 2000);
  };

  const playSound = () => {
    setSoundPlaying(true);
    setTimeout(() => setSoundPlaying(false), 2000);
  };

  const adjustPressure = () => {
    const newPressure = pressure > 0.3 ? 0.3 : 1.0;
    setPressure(newPressure);
    setTemperature(newPressure < 0.5 ? 60 : 100);
    setIsBoiling(newPressure < 0.5);
  };

  const activities: Activity[] = [
    {
      id: 'biology',
      title: 'Biology',
      description: 'Discover the wonders of life science and living organisms.',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop',
      chapters: [
        {
          id: 'interactive-biology',
          name: 'Interactive Biology Experiments',
          description: 'Explore life science through interactive simulations.',
          experiments: [
            {
              id: 'brain-signals',
              name: 'How Our Brain Sends Signals',
              description: 'Interactive simulation of neural signal transmission.',
              icon: '🧠',
              difficulty: 'Medium',
              duration: '20 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
              interactive: true
            },
            {
              id: 'blood-cells',
              name: 'Observe Red Blood Cells Under a Microscope',
              description: 'Virtual microscope to examine blood cell structure.',
              icon: '🔬',
              difficulty: 'Easy',
              duration: '15 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
              interactive: true
            }
          ]
        }
      ]
    },
    {
      id: 'math-puzzles',
      title: 'Mathematics',
      description: 'Challenge your mind with interactive mathematical experiments.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop',
      chapters: [
        {
          id: 'interactive-math',
          name: 'Interactive Mathematics',
          description: 'Explore mathematical concepts through hands-on simulations.',
          experiments: [
            {
              id: 'taj-mahal-geometry',
              name: 'Building the Taj Mahal with Geometry',
              description: 'Interactive geometric construction of the Taj Mahal.',
              icon: '🕌',
              difficulty: 'Hard',
              duration: '30 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop',
              interactive: true
            },
            {
              id: 'dice-probability',
              name: 'Predicting Dice Outcomes with Probability',
              description: 'Interactive probability simulator with dice experiments.',
              icon: '🎲',
              difficulty: 'Medium',
              duration: '25 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
              interactive: true
            }
          ]
        }
      ]
    },
    {
      id: 'physics-lab',
      title: 'Physics',
      description: 'Discover the laws of physics through interactive experiments.',
      image: 'https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=400&h=200&fit=crop',
      chapters: [
        {
          id: 'interactive-physics',
          name: 'Interactive Physics Experiments',
          description: 'Investigate physics principles through simulations.',
          experiments: [
            {
              id: 'friction-test',
              name: 'Test the Effect of Friction on Surfaces',
              description: 'Interactive friction simulator with different surfaces.',
              icon: '🛷',
              difficulty: 'Medium',
              duration: '20 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
              interactive: true
            },
            {
              id: 'sound-waves',
              name: 'Create and Visualize Sound Waves',
              description: 'Interactive sound wave generator and visualizer.',
              icon: '🌊',
              difficulty: 'Easy',
              duration: '15 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
              interactive: true
            }
          ]
        }
      ]
    },
    {
      id: 'chemistry-lab',
      title: 'Chemistry',
      description: 'Explore exciting chemistry through interactive simulations.',
      image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400&h=200&fit=crop',
      chapters: [
        {
          id: 'interactive-chemistry',
          name: 'Interactive Chemistry Experiments',
          description: 'Conduct virtual chemistry experiments safely.',
          experiments: [
            {
              id: 'flame-direction',
              name: 'Flame Direction Experiment (Upward Behavior)',
              description: 'Interactive simulation of flame behavior and physics.',
              icon: '🔥',
              difficulty: 'Medium',
              duration: '18 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1516410529446-2c777777b7aa?w=300&h=200&fit=crop',
              interactive: true
            },
            {
              id: 'boiling-without-fire',
              name: 'Boiling Water Without Fire (Using Pressure Differences)',
              description: 'Interactive pressure experiment simulator.',
              icon: '💨',
              difficulty: 'Hard',
              duration: '25 minutes',
              thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
              interactive: true
            }
          ]
        }
      ]
    }
  ];

  const renderInteractiveExperiment = (experiment: Experiment) => {
    switch (experiment.id) {
      case 'brain-signals':
        return (
          <div className="bg-blue-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Neural Signal Transmission</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-4 h-4 bg-blue-500 rounded-full ${neuralSignalActive ? 'animate-pulse' : ''}`}></div>
                <div className="flex-1 h-2 bg-gray-200 rounded mx-2 relative overflow-hidden">
                  <div 
                    className={`h-full bg-blue-500 rounded transition-all duration-1000 ${neuralSignalActive ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>
                <div className={`w-4 h-4 rounded-full ${neuralSignalActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
              <p className="text-sm text-gray-600">Watch how electrical signals travel through neurons!</p>
              <p className="text-xs text-blue-600 mt-2">
                {neuralSignalActive ? 'Signal traveling... ⚡' : 'Ready to send signal'}
              </p>
            </div>
            <button 
              onClick={startNeuralSignal}
              disabled={neuralSignalActive}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {neuralSignalActive ? 'Signal Traveling...' : 'Start Neural Simulation'}
            </button>
          </div>
        );
      
      case 'blood-cells':
        return (
          <div className="bg-red-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Virtual Microscope</h4>
            <div className="bg-white p-4 rounded-lg mb-4 border-4 border-gray-800">
              <div className="w-full h-48 bg-pink-100 rounded-lg flex items-center justify-center relative">
                {microscopeZoom === '10x' && (
                  <>
                    <div className="w-8 h-8 bg-red-500 rounded-full opacity-80 absolute top-4 left-4"></div>
                    <div className="w-6 h-6 bg-red-400 rounded-full opacity-70 absolute top-8 right-8"></div>
                    <div className="w-7 h-7 bg-red-600 rounded-full opacity-90 absolute bottom-6 left-1/3"></div>
                  </>
                )}
                {microscopeZoom === '40x' && (
                  <>
                    <div className="w-12 h-12 bg-red-500 rounded-full opacity-80 absolute top-2 left-2"></div>
                    <div className="w-10 h-10 bg-red-400 rounded-full opacity-70 absolute top-6 right-4"></div>
                    <div className="w-11 h-11 bg-red-600 rounded-full opacity-90 absolute bottom-4 left-1/4"></div>
                  </>
                )}
                {microscopeZoom === '100x' && (
                  <>
                    <div className="w-16 h-16 bg-red-500 rounded-full opacity-80 absolute -top-2 -left-2"></div>
                    <div className="w-14 h-14 bg-red-400 rounded-full opacity-70 absolute top-2 right-0"></div>
                    <div className="w-15 h-15 bg-red-600 rounded-full opacity-90 absolute bottom-2 left-1/5"></div>
                  </>
                )}
                <p className="text-center text-gray-600">Red Blood Cells ({microscopeZoom} magnification)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => changeMicroscopeZoom('10x')}
                className={`px-4 py-2 rounded-lg ${microscopeZoom === '10x' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-700 hover:text-white`}
              >
                10x
              </button>
              <button 
                onClick={() => changeMicroscopeZoom('40x')}
                className={`px-4 py-2 rounded-lg ${microscopeZoom === '40x' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-700 hover:text-white`}
              >
                40x
              </button>
              <button 
                onClick={() => changeMicroscopeZoom('100x')}
                className={`px-4 py-2 rounded-lg ${microscopeZoom === '100x' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-700 hover:text-white`}
              >
                100x
              </button>
            </div>
          </div>
        );
      
      case 'taj-mahal-geometry':
        return (
          <div className="bg-yellow-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Taj Mahal Geometry Builder</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <svg width="300" height="200" className="mx-auto">
                <rect x="100" y="120" width="100" height="80" fill="#f0f0f0" stroke="#000" strokeWidth="2"/>
                <polygon points="150,120 100,80 200,80" fill="#e0e0e0" stroke="#000" strokeWidth="2"/>
                <circle cx="150" cy="100" r="15" fill="#d0d0d0" stroke="#000" strokeWidth="2"/>
                <rect x="80" y="150" width="20" height="50" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
                <rect x="200" y="150" width="20" height="50" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
                <text x="150" y="190" textAnchor="middle" className="text-xs">Taj Mahal Structure</text>
              </svg>
              <p className="text-center text-sm text-gray-600 mt-2">
                Geometric shapes: Rectangle (base), Triangle (roof), Circle (dome)
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                Add Dome ⭕
              </button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                Add Minarets 🏛️
              </button>
            </div>
          </div>
        );
      
      case 'dice-probability':
        return (
          <div className="bg-green-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Dice Probability Simulator</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white border-2 border-black rounded-lg flex items-center justify-center text-2xl">
                  {diceResults.length > 0 ? diceResults[0] : '🎲'}
                </div>
                <div className="w-16 h-16 bg-white border-2 border-black rounded-lg flex items-center justify-center text-2xl">
                  {diceResults.length > 0 ? diceResults[1] : '🎲'}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Predicted: Sum of 7 (16.7% chance)
                  {diceResults.length > 0 && (
                    <span className="ml-2 font-bold">
                      Actual: {diceResults[0] + diceResults[1]} 
                      {diceResults[0] + diceResults[1] === 7 ? ' ✅' : ' ❌'}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  Rolls: {diceRolls} | Successes: {diceSuccesses} 
                  {diceRolls > 0 && (
                    <span className="ml-1">
                      ({((diceSuccesses / diceRolls) * 100).toFixed(1)}%)
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button 
              onClick={rollDice}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Roll Dice & Test Prediction 🎲
            </button>
          </div>
        );
      
      case 'friction-test':
        return (
          <div className="bg-purple-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Friction Surface Tester</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="mb-4">
                <div className={`w-full h-12 rounded relative ${
                  frictionSurface === 'ice' ? 'bg-blue-200' : 
                  frictionSurface === 'wood' ? 'bg-yellow-700' : 'bg-gray-500'
                }`}>
                  <div 
                    className={`w-8 h-8 bg-blue-500 rounded absolute top-2 transition-all duration-1000 ${
                      frictionActive 
                        ? (frictionSurface === 'ice' ? 'left-64' : frictionSurface === 'wood' ? 'left-32' : 'left-16')
                        : 'left-4'
                    }`}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Wooden Block on {frictionSurface.charAt(0).toUpperCase() + frictionSurface.slice(1)} Surface
                  {frictionActive && (
                    <span className="ml-2 text-blue-600">
                      {frictionSurface === 'ice' ? '⚡ Low friction - Fast slide!' : 
                       frictionSurface === 'wood' ? '🐌 Medium friction' : '🛑 High friction - Slow movement'}
                    </span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setFrictionSurface('ice')}
                  className={`px-3 py-2 rounded text-xs ${frictionSurface === 'ice' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  ❄️ Ice
                </button>
                <button 
                  onClick={() => setFrictionSurface('wood')}
                  className={`px-3 py-2 rounded text-xs ${frictionSurface === 'wood' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  🪵 Wood
                </button>
                <button 
                  onClick={() => setFrictionSurface('concrete')}
                  className={`px-3 py-2 rounded text-xs ${frictionSurface === 'concrete' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  🧱 Concrete
                </button>
              </div>
            </div>
            <button 
              onClick={startFrictionTest}
              disabled={frictionActive}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {frictionActive ? 'Testing Friction...' : 'Start Friction Test'}
            </button>
          </div>
        );
      
      case 'sound-waves':
        return (
          <div className="bg-cyan-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Sound Wave Visualizer</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <svg width="300" height="100" className="mx-auto">
                <path 
                  d={`M0,50 ${Array.from({length: 30}, (_, i) => {
                    const x = i * 10;
                    const y = 50 + Math.sin((x / 50) * soundFreq / 100) * soundAmp;
                    return `L${x},${y}`;
                  }).join(' ')}`}
                  stroke="#06b6d4" 
                  strokeWidth={soundPlaying ? "4" : "2"} 
                  fill="none"
                  className={soundPlaying ? "animate-pulse" : ""}
                />
                <text x="150" y="90" textAnchor="middle" className="text-xs">
                  Sound Wave Pattern {soundPlaying ? '🔊' : '🔇'}
                </text>
              </svg>
              <div className="mt-4 flex justify-center gap-4">
                <label className="text-sm">
                  Frequency: 
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    value={soundFreq}
                    onChange={(e) => setSoundFreq(Number(e.target.value))}
                    className="ml-2"
                  />
                  <span className="ml-1">{soundFreq}Hz</span>
                </label>
                <label className="text-sm">
                  Amplitude: 
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={soundAmp}
                    onChange={(e) => setSoundAmp(Number(e.target.value))}
                    className="ml-2"
                  />
                  <span className="ml-1">{soundAmp}</span>
                </label>
              </div>
            </div>
            <button 
              onClick={playSound}
              disabled={soundPlaying}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
            >
              {soundPlaying ? '🔊 Playing Sound...' : '🎵 Generate Sound & Visualize'}
            </button>
          </div>
        );
      
      case 'flame-direction':
        return (
          <div className="bg-orange-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Flame Direction Physics</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-4 h-16 bg-gray-600 rounded-t"></div>
                  <div className={`w-8 h-12 bg-orange-400 rounded-full absolute -top-6 -left-2 ${
                    flameGravity === 'zero' ? 'rounded-full' : 'rounded-full transform -rotate-12'
                  } animate-pulse`}></div>
                  <div className={`w-6 h-8 bg-red-500 rounded-full absolute -top-8 -left-1 ${
                    flameGravity === 'zero' ? 'rounded-full' : 'rounded-full transform -rotate-12'
                  } animate-pulse`}></div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                {flameGravity === 'normal' 
                  ? 'Flames point upward due to buoyancy - hot gases rise! 🔥⬆️'
                  : 'In zero gravity, flames form spheres! 🔥⭕'
                }
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <button 
                  onClick={() => setFlameGravity('normal')}
                  className={`px-3 py-1 rounded text-xs ${flameGravity === 'normal' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  🌍 Normal Gravity
                </button>
                <button 
                  onClick={() => setFlameGravity('zero')}
                  className={`px-3 py-1 rounded text-xs ${flameGravity === 'zero' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  🚀 Zero Gravity
                </button>
              </div>
            </div>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
              Start Flame Experiment 🔥
            </button>
          </div>
        );
      
      case 'boiling-without-fire':
        return (
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">Pressure Boiling Experiment</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="flex justify-center">
                <div className="relative w-24 h-32 border-2 border-gray-600 rounded-lg">
                  <div className="absolute bottom-0 w-full h-16 bg-blue-300 rounded-b-lg"></div>
                  {isBoiling && (
                    <>
                      <div className="absolute top-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{left: '10%'}}></div>
                      <div className="absolute top-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{left: '70%', animationDelay: '0.5s'}}></div>
                      <div className="absolute top-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{left: '40%', animationDelay: '1s'}}></div>
                    </>
                  )}
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                {isBoiling ? 'Water boiling at reduced pressure! 💨' : 'Water at normal pressure'}
              </p>
              <div className="mt-2 text-center">
                <span className={`text-xs px-2 py-1 rounded ${pressure < 0.5 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  Pressure: {pressure.toFixed(1)} atm
                </span>
                <span className={`text-xs px-2 py-1 rounded ml-2 ${temperature < 80 ? 'bg-red-100' : 'bg-orange-100'}`}>
                  Temp: {temperature}°C
                </span>
              </div>
            </div>
            <button 
              onClick={adjustPressure}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              {pressure > 0.5 ? 'Reduce Pressure & Watch 📉' : 'Reset to Normal Pressure 📈'}
            </button>
          </div>
        );
      
      default:
        return <div>Interactive experiment coming soon!</div>;
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {!selectedActivity ? (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fun Labs 🚀</h2>
          <p className="text-gray-600 mb-6">
            Explore exciting activities and experiments to learn and have fun!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 hover:border-blue-300 cursor-pointer transition-all hover:shadow-md group"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Explore Now
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : !selectedChapter ? (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{selectedActivity.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {selectedActivity.chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => handleChapterClick(chapter)}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:border-purple-300 cursor-pointer transition-all hover:shadow-md group"
              >
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {chapter.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  Explore Now
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : !selectedExperiment ? (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedChapter(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Chapters
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{selectedChapter.name}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedChapter.experiments.map((experiment) => (
              <div
                key={experiment.id}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:border-purple-300 transition-all hover:shadow-md group"
              >
                <img
                  src={experiment.thumbnail}
                  alt={experiment.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <div className="text-3xl mb-3">{experiment.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {experiment.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{experiment.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {experiment.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">{experiment.duration}</span>
                </div>
                <button
                  onClick={() => handleStartExperiment(experiment)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Start Experiment
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBackToChapter}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Experiments
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{selectedExperiment.name}</h2>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedExperiment.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedExperiment.name}</h3>
              <p className="text-gray-600 mb-4">{selectedExperiment.description}</p>
            </div>

            {renderInteractiveExperiment(selectedExperiment)}
          </div>
        </div>
      )}
    </div>
  );
};

export default FunActivities;
