import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Microscope, 
  FlaskConical, 
  Zap, 
  Calculator,
  Play,
  CheckCircle,
  Target,
  Lightbulb,
  BookOpen,
  Camera,
  Upload,
  RotateCcw,
  Shield
} from 'lucide-react';

interface Experiment {
  id: string;
  title: string;
  storyline: string;
  objective: string;
  materials: string[];
  instructions: string[];
  howToDo: string;
  explanation: string;
  interactiveType: 'quiz' | 'simulation' | 'input' | 'video' | 'neutralization' | 'dna-extraction' | 'mix-lab';
}

interface MixLabState {
  reagentsAdded: string[];
  beakerColor: string;
  animation: string;
  bubbles: boolean;
  resultText: string;
  quizQuestion: string;
  quizOptions: string[];
  quizAnswer: string;
  showQuiz: boolean;
}

interface DnaExtractionState {
  currentStep: number;
  materialsUsed: string[];
  beakerContent: string;
  showStrands: boolean;
  extractionProgress: number;
  resultText: string;
  showQuiz: boolean;
}

const FunActivities: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [experimentProgress, setExperimentProgress] = useState<{ [key: string]: number }>({});
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [simulationStates, setSimulationStates] = useState<{ [key: string]: any }>({});
  const [neutralizationStates, setNeutralizationStates] = useState<{ [key: string]: { naohAdded: boolean; hclAdded: boolean; beakerColor: string; reactionComplete: boolean } }>({});
  const [mixLabStates, setMixLabStates] = useState<{ [key: string]: MixLabState }>({});
  const [dnaExtractionStates, setDnaExtractionStates] = useState<{ [key: string]: DnaExtractionState }>({});

  const experiments: { [key: string]: Experiment[] } = {
    biology: [
      {
        id: 'dna-extraction',
        title: 'DNA Extraction from a Banana',
        storyline: "You're a junior scientist at FunLabs Bio Research. A mutated plant was found — extract DNA from a banana sample to help investigate the change.",
        objective: 'Show that cells contain DNA and that DNA can be extracted and seen',
        materials: ['Banana', 'Ziplock bag', 'Dish soap', 'Salt', 'Warm water', 'Coffee filter', 'Chilled rubbing alcohol', 'Glass/cup', 'Wooden stick'],
        instructions: [
          'Add banana to ziplock and mash to break cells',
          'Add salt, warm water, and dish soap to release DNA',
          'Mash/shake the mixture thoroughly',
          'Filter the slurry to collect clear liquid',
          'Slowly pour chilled alcohol to precipitate DNA',
          'Use wooden stick to extract visible DNA strands'
        ],
        howToDo: 'Interactive drag-and-drop simulation with step-by-step animations',
        explanation: 'Soap breaks cell membranes, salt helps DNA come together, and cold alcohol makes DNA visible by precipitating it out of solution.',
        interactiveType: 'dna-extraction'
      },
      {
        id: 'ph-indicator',
        title: 'pH Indicator Using Red Cabbage',
        storyline: "You've joined a water testing agency! But test kits are missing. Can you make your own pH indicator?",
        objective: 'Understand acids/bases and pH using natural indicators',
        materials: ['Red cabbage', 'Hot water', 'Lemon juice', 'Vinegar', 'Baking soda', 'Soap', 'Clear cups'],
        instructions: [
          'Chop red cabbage and soak in hot water',
          'Strain to get purple cabbage juice',
          'Pour juice into separate cups',
          'Add different substances to each cup',
          'Observe color changes',
          'Record pH levels based on colors'
        ],
        howToDo: 'Simulate color changes; add quiz to predict outcome',
        explanation: 'Anthocyanins in cabbage change color with pH - red for acids, green for bases.',
        interactiveType: 'simulation'
      },
      {
        id: 'yeast-fermentation',
        title: 'Yeast + Sugar = CO₂',
        storyline: 'A soda company needs your help. Which sugar gives the best fizz using yeast?',
        objective: 'Learn fermentation, gas production, reaction observation',
        materials: ['Active yeast', 'Different sugars', 'Warm water', 'Balloons', 'Plastic bottles'],
        instructions: [
          'Add yeast to warm water in bottles',
          'Add different types of sugar to each bottle',
          'Attach balloons to bottle openings',
          'Wait and observe balloon inflation',
          'Measure and compare results',
          'Record which sugar works best'
        ],
        howToDo: 'Simulate balloon inflation based on sugar used + quiz',
        explanation: 'Yeast consumes sugar and produces CO₂ gas, which inflates the balloon. Different sugars ferment at different rates.',
        interactiveType: 'simulation'
      }
    ],
    chemistry: [
      {
        id: 'mix-lab',
        title: 'Mix Lab',
        storyline: "Welcome to the Chemistry Mix Lab! You're a young chemist with access to common household reagents. Discover what happens when you mix them!",
        objective: 'Learn chemical reactions, pH changes, and gas production through safe experimentation',
        materials: ['Vinegar (acetic acid)', 'Baking Soda (sodium bicarbonate)', 'Red Cabbage Indicator', 'Sugar', 'Yeast', 'Milk'],
        instructions: [
          'Drag reagents from the right into the beaker',
          'Observe color changes and reactions',
          'Mix up to 3 reagents for clear results',
          'Complete the quiz after each reaction',
          'Use the Reset button to try new combinations',
          'Follow safety guidelines for real experiments'
        ],
        howToDo: 'Interactive drag-and-drop with animated reactions and educational quizzes',
        explanation: 'Different chemical combinations produce various reactions: acids and bases neutralize, yeast ferments sugars, and pH indicators change colors.',
        interactiveType: 'mix-lab'
      },
      {
        id: 'density-tower',
        title: 'Liquid Density Tower',
        storyline: "You're a chemist creating a rainbow potion for a magic show. Layer liquids by density!",
        objective: 'Understand density and liquid properties',
        materials: ['Honey', 'Corn syrup', 'Dish soap', 'Water', 'Vegetable oil', 'Rubbing alcohol', 'Food coloring'],
        instructions: [
          'Pour honey into bottom of tall container',
          'Slowly layer corn syrup on top',
          'Add colored water carefully',
          'Pour oil slowly down the side',
          'Top with colored alcohol',
          'Observe the beautiful density tower'
        ],
        howToDo: 'Interactive layer builder with drag-and-drop liquids',
        explanation: 'Liquids with higher density sink below those with lower density, creating distinct layers.',
        interactiveType: 'simulation'
      },
      {
        id: 'color-changing-milk',
        title: 'Dancing Colors in Milk',
        storyline: 'You discovered a magic milk that changes colors! Investigate this phenomenon as a food scientist.',
        objective: 'Learn about surface tension and molecular interactions',
        materials: ['Whole milk', 'Food coloring', 'Cotton swabs', 'Liquid dish soap'],
        instructions: [
          'Pour milk into a shallow dish',
          'Add drops of different food coloring',
          'Dip cotton swab in dish soap',
          'Touch the soapy swab to the milk',
          'Watch the colors dance and swirl',
          'Try different locations and observe patterns'
        ],
        howToDo: 'Animated simulation of color movement patterns',
        explanation: 'Soap breaks surface tension and interacts with fat molecules, causing the colorful dance effect.',
        interactiveType: 'simulation'
      },
      {
        id: 'crystal-garden',
        title: 'Crystal Garden Growth',
        storyline: 'You\'re growing crystals for a jewelry exhibition. Create the most beautiful crystal formations!',
        objective: 'Understand crystallization and solution concentration',
        materials: ['Salt or sugar', 'Hot water', 'String', 'Pencil', 'Glass jar', 'Food coloring'],
        instructions: [
          'Dissolve salt/sugar in hot water until saturated',
          'Tie string to pencil, lower into solution',
          'Add food coloring for beauty',
          'Leave undisturbed for several days',
          'Observe crystal formation daily',
          'Document growth patterns'
        ],
        howToDo: 'Time-lapse crystal growth simulation with progress tracking',
        explanation: 'As water evaporates, dissolved minerals form organized crystal structures due to molecular attraction.',
        interactiveType: 'simulation'
      }
    ],
    physics: [
      {
        id: 'balloon-rocket',
        title: 'Balloon Rocket',
        storyline: "You've joined NASA's Junior Propulsion Team. Test your rocket design!",
        objective: 'Learn Newton\'s Third Law of Motion',
        materials: ['Balloon', 'String', 'Straw', 'Tape'],
        instructions: [
          'Thread string through straw',
          'Stretch string across room and secure',
          'Inflate balloon but don\'t tie it',
          'Tape balloon to straw',
          'Release balloon and observe motion',
          'Measure distance traveled'
        ],
        howToDo: 'Predict balloon size performance, quiz after demo',
        explanation: 'Air rushing out pushes balloon forward - Newton\'s third law: for every action, there\'s an equal and opposite reaction.',
        interactiveType: 'quiz'
      },
      {
        id: 'electromagnet',
        title: 'Simple Electromagnet',
        storyline: 'You\'re in the 1800s trying to send a telegraph. Build an electromagnet!',
        objective: 'Learn relationship between electricity and magnetism',
        materials: ['Iron nail', 'Copper wire', 'Battery', 'Paper clips'],
        instructions: [
          'Wrap copper wire around iron nail',
          'Leave wire ends free',
          'Connect wire ends to battery terminals',
          'Test magnetism with paper clips',
          'Count how many clips it attracts',
          'Disconnect battery and test again'
        ],
        howToDo: 'Video demo with magnetic field visualization',
        explanation: 'Electric current flowing through wire creates a magnetic field, turning the nail into a temporary magnet.',
        interactiveType: 'simulation'
      },
      {
        id: 'refraction-pencil',
        title: 'Refraction Pencil Illusion',
        storyline: 'You\'re an optical illusionist. Can you "break" a pencil using just water?',
        objective: 'Understand light refraction and optical illusions',
        materials: ['Pencil', 'Clear glass', 'Water'],
        instructions: [
          'Place pencil in empty glass',
          'Observe pencil from the side',
          'Slowly pour water into glass',
          'Watch pencil appear to bend',
          'Move viewing angle and observe changes',
          'Try with different objects'
        ],
        howToDo: 'Show zoom animation of light bending, quiz on why it looks broken',
        explanation: 'Light travels slower in water than air, causing it to bend (refract) and create the illusion of a broken pencil.',
        interactiveType: 'simulation'
      }
    ],
    mathematics: [
      {
        id: 'parabola-toss',
        title: 'Parabola Basketball Toss',
        storyline: 'You\'re designing a basketball game. Can you track and predict the ball\'s perfect curve?',
        objective: 'Understand parabolas and projectile motion in real life',
        materials: ['Basketball', 'Phone/camera', 'Graph paper', 'Measuring tape'],
        instructions: [
          'Set up measurement grid on wall',
          'Record ball toss with slow-motion video',
          'Plot height vs horizontal distance points',
          'Connect points to see parabolic curve',
          'Try different throwing angles',
          'Predict optimal angle for scoring'
        ],
        howToDo: 'Let students trace motion on screen or input data points',
        explanation: 'Projectile motion follows a parabolic path described by quadratic equations: y = ax² + bx + c',
        interactiveType: 'input'
      },
      {
        id: 'pi-discovery',
        title: 'Pi Discovery with Circles',
        storyline: 'A time-traveling mathematician challenges you to prove that π is the same for all circles!',
        objective: 'Discover that π = Circumference ÷ Diameter for any circle',
        materials: ['String', 'Ruler', 'Various circular objects', 'Calculator'],
        instructions: [
          'Measure diameter of circular object',
          'Wrap string around circumference',
          'Measure the string length',
          'Calculate circumference ÷ diameter',
          'Repeat with different sized circles',
          'Observe that ratio is always ~3.14159'
        ],
        howToDo: 'Input measurement numbers, auto-calculate Pi, show animation of results',
        explanation: 'The ratio of circumference to diameter is constant for all circles, defining the mathematical constant π ≈ 3.14159',
        interactiveType: 'input'
      },
      {
        id: 'dice-probability',
        title: 'Dice & Probability Candy Graph',
        storyline: 'You\'re creating a board game. Use candy pieces to discover which dice sums are most likely!',
        objective: 'Learn probability distribution and frequency analysis',
        materials: ['Two dice', 'Candy pieces or colored markers', 'Graph chart', 'Pencil'],
        instructions: [
          'Create chart with sums 2-12',
          'Roll two dice 50 times',
          'Place candy piece for each sum rolled',
          'Build candy bar graph',
          'Identify most and least common sums',
          'Calculate probability of each sum'
        ],
        howToDo: 'Digital dice roller, interactive graph builder, quiz on most likely sums',
        explanation: 'Some sums (like 7) have more combinations than others, making them more probable. This introduces statistical thinking.',
        interactiveType: 'simulation'
      }
    ]
  };

  const subjectIcons = {
    biology: <Microscope className="w-6 h-6" />,
    chemistry: <FlaskConical className="w-6 h-6" />,
    physics: <Zap className="w-6 h-6" />,
    mathematics: <Calculator className="w-6 h-6" />
  };

  const subjectColors = {
    biology: 'from-green-500 to-emerald-600',
    chemistry: 'from-blue-500 to-cyan-600',
    physics: 'from-purple-500 to-violet-600',
    mathematics: 'from-orange-500 to-red-600'
  };

  const handleStartExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setExperimentProgress({ ...experimentProgress, [experiment.id]: 0 });
    if (experiment.interactiveType === 'neutralization') {
      setNeutralizationStates({
        ...neutralizationStates,
        [experiment.id]: { naohAdded: false, hclAdded: false, beakerColor: 'transparent', reactionComplete: false }
      });
    }
    if (experiment.interactiveType === 'mix-lab') {
      setMixLabStates({
        ...mixLabStates,
        [experiment.id]: {
          reagentsAdded: [],
          beakerColor: 'transparent',
          animation: '',
          bubbles: false,
          resultText: '',
          quizQuestion: '',
          quizOptions: [],
          quizAnswer: '',
          showQuiz: false
        }
      });
    }
    if (experiment.interactiveType === 'dna-extraction') {
      setDnaExtractionStates({
        ...dnaExtractionStates,
        [experiment.id]: {
          currentStep: 0,
          materialsUsed: [],
          beakerContent: 'empty',
          showStrands: false,
          extractionProgress: 0,
          resultText: '',
          showQuiz: false
        }
      });
    }
  };

  const handleProgressStep = (experimentId: string) => {
    const currentProgress = experimentProgress[experimentId] || 0;
    setExperimentProgress({ ...experimentProgress, [experimentId]: Math.min(100, currentProgress + 20) });
  };

  const handleDragDrop = (experimentId: string, substance: 'naoh' | 'hcl') => {
    const currentState = neutralizationStates[experimentId] || { naohAdded: false, hclAdded: false, beakerColor: 'transparent', reactionComplete: false };
    
    if (substance === 'naoh' && !currentState.naohAdded) {
      const newState = { ...currentState, naohAdded: true, beakerColor: 'blue' };
      setNeutralizationStates({ ...neutralizationStates, [experimentId]: newState });
    } else if (substance === 'hcl' && !currentState.hclAdded) {
      const newState = { 
        ...currentState, 
        hclAdded: true, 
        beakerColor: currentState.naohAdded ? 'transparent' : 'pink',
        reactionComplete: currentState.naohAdded 
      };
      setNeutralizationStates({ ...neutralizationStates, [experimentId]: newState });
    }
  };

  const handleMixLabDrop = (experimentId: string, reagent: string) => {
    const currentState = mixLabStates[experimentId];
    if (!currentState || currentState.reagentsAdded.includes(reagent)) return;
    
    if (currentState.reagentsAdded.length >= 3) {
      alert('Try mixing 2–3 ingredients for clear results.');
      return;
    }

    const newReagents = [...currentState.reagentsAdded, reagent];
    let newState = { ...currentState, reagentsAdded: newReagents };

    // Apply reaction rules
    const reactionKey = newReagents.sort().join('+');
    
    if (reactionKey === 'Baking Soda+Vinegar') {
      newState = {
        ...newState,
        beakerColor: 'rgba(255, 192, 203, 0.6)',
        animation: 'bubbles-vigorous',
        bubbles: true,
        resultText: 'FIZZ: CO2 released. NaHCO3 + CH3COOH → NaCH3COO + H2O + CO2. You observed gas bubbles!',
        quizQuestion: 'Which gas was released?',
        quizOptions: ['Oxygen', 'Carbon dioxide', 'Hydrogen'],
        quizAnswer: 'Carbon dioxide',
        showQuiz: true
      };
    } else if (reactionKey === 'Red Cabbage Indicator+Vinegar') {
      newState = {
        ...newState,
        beakerColor: 'rgba(255, 0, 0, 0.7)',
        resultText: 'Indicator turned red: acidic solution (low pH). Anthocyanin in cabbage shifts to red in acid.',
        quizQuestion: 'Acidic indicator color?',
        quizOptions: ['Blue', 'Red', 'Green'],
        quizAnswer: 'Red',
        showQuiz: true
      };
    } else if (reactionKey === 'Baking Soda+Red Cabbage Indicator') {
      newState = {
        ...newState,
        beakerColor: 'rgba(0, 128, 255, 0.7)',
        resultText: 'Indicator turned blue/green: basic solution (high pH).',
        quizQuestion: 'Base makes cabbage indicator look?',
        quizOptions: ['Red', 'Blue/green', 'Yellow'],
        quizAnswer: 'Blue/green',
        showQuiz: true
      };
    } else if (reactionKey === 'Sugar+Yeast') {
      newState = {
        ...newState,
        beakerColor: 'rgba(139, 69, 19, 0.4)',
        animation: 'bubbles-slow',
        bubbles: true,
        resultText: 'Yeast ferments sugar producing CO2 — fermentation.',
        showQuiz: false
      };
    } else if (reactionKey === 'Milk+Vinegar') {
      newState = {
        ...newState,
        beakerColor: 'rgba(255, 255, 224, 0.8)',
        animation: 'curdle',
        resultText: 'Milk curdles: acid denatures milk proteins (casein).',
        showQuiz: false
      };
    } else if (reactionKey === 'Baking Soda+Red Cabbage Indicator+Vinegar') {
      newState = {
        ...newState,
        beakerColor: 'rgba(128, 0, 128, 0.5)',
        animation: 'bubbles-vigorous',
        bubbles: true,
        resultText: 'Neutralization: acid + base react, pH moves toward neutral; CO2 produced.',
        showQuiz: false
      };
    } else {
      newState = {
        ...newState,
        resultText: 'No visible reaction — try different ingredients. Try adding Vinegar or Baking Soda or Red Cabbage Indicator.',
        showQuiz: false
      };
    }

    setMixLabStates({ ...mixLabStates, [experimentId]: newState });
  };

  const handleDnaExtractionStep = (experimentId: string, action: string, material?: string) => {
    const currentState = dnaExtractionStates[experimentId];
    if (!currentState) return;

    let newState = { ...currentState };

    switch (action) {
      case 'add-banana':
        if (material === 'Banana') {
          newState = {
            ...newState,
            materialsUsed: [...newState.materialsUsed, 'Banana'],
            beakerContent: 'mashed-banana',
            currentStep: 1,
            extractionProgress: 16.7
          };
        }
        break;
      
      case 'add-ingredients':
        if (material && ['Salt', 'Warm water', 'Dish soap'].includes(material) && !newState.materialsUsed.includes(material)) {
          const newMaterials = [...newState.materialsUsed, material];
          const hasAllIngredients = ['Salt', 'Warm water', 'Dish soap'].every(ing => newMaterials.includes(ing));
          newState = {
            ...newState,
            materialsUsed: newMaterials,
            beakerContent: hasAllIngredients ? 'mixture' : newState.beakerContent,
            currentStep: hasAllIngredients ? 2 : newState.currentStep,
            extractionProgress: hasAllIngredients ? 33.4 : newState.extractionProgress
          };
        }
        break;
      
      case 'mash':
        if (newState.currentStep >= 2) {
          newState = {
            ...newState,
            currentStep: 3,
            extractionProgress: 50
          };
        }
        break;
      
      case 'filter':
        if (material === 'Coffee filter' && newState.currentStep >= 3) {
          newState = {
            ...newState,
            materialsUsed: [...newState.materialsUsed, 'Coffee filter'],
            beakerContent: 'filtered-liquid',
            currentStep: 4,
            extractionProgress: 66.7
          };
        }
        break;
      
      case 'add-alcohol':
        if (material === 'Chilled rubbing alcohol' && newState.currentStep >= 4) {
          newState = {
            ...newState,
            materialsUsed: [...newState.materialsUsed, 'Chilled rubbing alcohol'],
            beakerContent: 'dna-visible',
            showStrands: true,
            currentStep: 5,
            extractionProgress: 83.4
          };
        }
        break;
      
      case 'extract':
        if (material === 'Wooden stick' && newState.currentStep >= 5) {
          newState = {
            ...newState,
            materialsUsed: [...newState.materialsUsed, 'Wooden stick'],
            currentStep: 6,
            extractionProgress: 100,
            resultText: '✔ You extracted DNA! Soap broke the cell membranes, salt helped DNA come together, and cold alcohol made the DNA come out of solution as visible strands.',
            showQuiz: true
          };
        }
        break;
    }

    setDnaExtractionStates({ ...dnaExtractionStates, [experimentId]: newState });
  };

  const resetMixLab = (experimentId: string) => {
    setMixLabStates({
      ...mixLabStates,
      [experimentId]: {
        reagentsAdded: [],
        beakerColor: 'transparent',
        animation: '',
        bubbles: false,
        resultText: '',
        quizQuestion: '',
        quizOptions: [],
        quizAnswer: '',
        showQuiz: false
      }
    });
  };

  const resetDnaExtraction = (experimentId: string) => {
    setDnaExtractionStates({
      ...dnaExtractionStates,
      [experimentId]: {
        currentStep: 0,
        materialsUsed: [],
        beakerContent: 'empty',
        showStrands: false,
        extractionProgress: 0,
        resultText: '',
        showQuiz: false
      }
    });
  };

  const renderInteractiveElement = (experiment: Experiment) => {
    switch (experiment.interactiveType) {
      case 'quiz':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="w-4 h-4" />
              Quick Quiz
            </h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="mb-3">What happens when you add soap to the mixture?</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">A) It makes bubbles</Button>
                <Button variant="outline" className="w-full justify-start">B) It breaks down cell walls</Button>
                <Button variant="outline" className="w-full justify-start">C) It adds color</Button>
              </div>
            </div>
          </div>
        );
      
      case 'simulation':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Play className="w-4 h-4" />
              Interactive Simulation
            </h4>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-blue-200">
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">🧪</div>
                <p className="text-sm text-muted-foreground">Click to start simulation</p>
                <Button onClick={() => handleProgressStep(experiment.id)}>
                  Run Experiment
                </Button>
                <Progress value={experimentProgress[experiment.id] || 0} className="w-full" />
              </div>
            </div>
          </div>
        );
      
      case 'input':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Record Your Data
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Measurement 1:</label>
                <Input placeholder="Enter value" />
              </div>
              <div>
                <label className="text-sm font-medium">Measurement 2:</label>
                <Input placeholder="Enter value" />
              </div>
            </div>
            <Button onClick={() => handleProgressStep(experiment.id)} className="w-full">
              Calculate Result
            </Button>
          </div>
        );

      case 'neutralization':
        const neutralState = neutralizationStates[experiment.id] || { naohAdded: false, hclAdded: false, beakerColor: 'transparent', reactionComplete: false };
        return (
          <div className="space-y-6">
            <h4 className="font-semibold flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Acid-Base Neutralization Lab
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Beaker */}
              <div className="flex flex-col items-center space-y-4">
                <h5 className="text-sm font-medium">Reaction Beaker</h5>
                <div className="relative">
                  <div className="w-32 h-40 border-4 border-gray-400 rounded-b-full bg-gray-50 flex items-end justify-center overflow-hidden">
                    <div 
                      className={`w-full transition-all duration-700 ease-in-out ${
                        neutralState.beakerColor === 'blue' ? 'bg-blue-400 h-20' :
                        neutralState.beakerColor === 'pink' ? 'bg-pink-400 h-20' :
                        neutralState.beakerColor === 'transparent' && neutralState.reactionComplete ? 'bg-gray-100 h-20' : 'h-0'
                      }`}
                    />
                  </div>
                  <div className="text-xs text-center mt-2 text-muted-foreground">
                    {neutralState.beakerColor === 'transparent' && neutralState.reactionComplete ? 'Colorless Solution' : 
                     neutralState.beakerColor === 'blue' ? 'Blue Base Solution' :
                     neutralState.beakerColor === 'pink' ? 'Pink Acid Solution' : 'Empty Beaker'}
                  </div>
                </div>
              </div>

              {/* Reagents */}
              <div className="flex flex-col space-y-4">
                <h5 className="text-sm font-medium">Drag Reagents to Beaker</h5>
                
                {!neutralState.naohAdded && (
                  <div 
                    className="bg-blue-500 text-white p-4 rounded-lg cursor-move hover:bg-blue-600 transition-colors text-center font-semibold"
                    draggable
                    onDragEnd={() => handleDragDrop(experiment.id, 'naoh')}
                    onClick={() => handleDragDrop(experiment.id, 'naoh')}
                  >
                    NaOH (Base)
                    <div className="text-xs mt-1 opacity-80">Sodium Hydroxide</div>
                  </div>
                )}

                {!neutralState.hclAdded && (
                  <div 
                    className="bg-pink-500 text-white p-4 rounded-lg cursor-move hover:bg-pink-600 transition-colors text-center font-semibold"
                    draggable
                    onDragEnd={() => handleDragDrop(experiment.id, 'hcl')}
                    onClick={() => handleDragDrop(experiment.id, 'hcl')}
                  >
                    HCl (Acid)
                    <div className="text-xs mt-1 opacity-80">Hydrochloric Acid</div>
                  </div>
                )}

                {neutralState.naohAdded && neutralState.hclAdded && (
                  <div className="text-center p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="text-green-700 font-semibold mb-2">✅ Neutralization Complete!</div>
                    <div className="text-sm text-green-600">
                      NaOH (base) + HCl (acid) = NaCl (salt) + H₂O (water)
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              Click or drag the reagents into the beaker to observe the neutralization reaction
            </div>
          </div>
        );

      case 'mix-lab':
        const mixLabState = mixLabStates[experiment.id] || { reagentsAdded: [], beakerColor: 'transparent', animation: '', bubbles: false, resultText: '', quizQuestion: '', quizOptions: [], quizAnswer: '', showQuiz: false };
        const availableReagents = ['Vinegar', 'Baking Soda', 'Red Cabbage Indicator', 'Sugar', 'Yeast', 'Milk'];
        const reagentColors = {
          'Vinegar': 'bg-pink-400',
          'Baking Soda': 'bg-blue-300',
          'Red Cabbage Indicator': 'bg-purple-500',
          'Sugar': 'bg-yellow-300',
          'Yeast': 'bg-amber-600',
          'Milk': 'bg-stone-100 text-gray-800'
        };

        return (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Chemistry Mix Lab
            </h4>
            
            {/* Safety Notice */}
            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Shield className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-yellow-800">Simulation mode: For physical experiments, use adult supervision, gloves, and goggles. Do not ingest chemicals.</p>
            </div>

            <div className="flex gap-6">
              {/* Beaker Area */}
              <div className="flex-1 space-y-4">
                <div className="relative w-40 h-48 mx-auto">
                  <div className="absolute inset-0 border-4 border-gray-400 rounded-b-full bg-white/50"></div>
                  <div 
                    className={`absolute bottom-1 left-1 right-1 rounded-b-full transition-all duration-1000 ${
                      mixLabState.animation === 'bubbles-vigorous' ? 'animate-pulse' : 
                      mixLabState.animation === 'bubbles-slow' ? 'animate-pulse' : ''
                    }`}
                    style={{ 
                      backgroundColor: mixLabState.beakerColor,
                      height: mixLabState.beakerColor === 'transparent' ? '0%' : '60%'
                    }}
                  >
                    {mixLabState.bubbles && (
                      <div className="absolute inset-0 flex items-end justify-center pb-2">
                        <div className="text-2xl animate-bounce">🫧</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Reagents Added */}
                {mixLabState.reagentsAdded.length > 0 && (
                  <div className="text-xs text-center">
                    <p className="font-medium">Added: {mixLabState.reagentsAdded.join(' + ')}</p>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => resetMixLab(experiment.id)}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {/* Reagent Tiles */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Drag reagents:</p>
                {availableReagents.filter(reagent => !mixLabState.reagentsAdded.includes(reagent)).map(reagent => (
                  <div 
                    key={reagent}
                    className={`w-36 h-10 ${reagentColors[reagent]} rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity text-white`}
                    onClick={() => handleMixLabDrop(experiment.id, reagent)}
                  >
                    {reagent}
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            {mixLabState.resultText && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900">{mixLabState.resultText}</p>
                
                {mixLabState.showQuiz && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium">{mixLabState.quizQuestion}</p>
                    <div className="space-y-1">
                      {mixLabState.quizOptions.map((option, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="sm"
                          className={`w-full justify-start text-xs ${
                            option === mixLabState.quizAnswer ? 'bg-green-100 border-green-300' : ''
                          }`}
                        >
                          {String.fromCharCode(97 + index)}) {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'dna-extraction':
        const dnaState = dnaExtractionStates[experiment.id] || { currentStep: 0, materialsUsed: [], beakerContent: 'empty', showStrands: false, extractionProgress: 0, resultText: '', showQuiz: false };
        const dnaMaterials = ['Banana', 'Salt', 'Warm water', 'Dish soap', 'Coffee filter', 'Chilled rubbing alcohol', 'Wooden stick'];

        return (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              DNA Extraction Lab
            </h4>
            
            {/* Safety Notice */}
            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Shield className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-yellow-800">Simulation mode: For real experiments, use adult supervision, gloves, and goggles. Do not ingest any materials.</p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(dnaState.extractionProgress)}%</span>
              </div>
              <Progress value={dnaState.extractionProgress} className="w-full" />
            </div>

            <div className="flex gap-6">
              {/* Workspace */}
              <div className="flex-1 space-y-4">
                <div className="relative w-40 h-48 mx-auto">
                  {/* Ziplock/Beaker representation */}
                  <div className="absolute inset-0 border-4 border-gray-400 rounded-lg bg-white/50">
                    {dnaState.beakerContent === 'mashed-banana' && (
                      <div className="absolute bottom-2 left-2 right-2 h-16 bg-yellow-200 rounded"></div>
                    )}
                    {dnaState.beakerContent === 'mixture' && (
                      <div className="absolute bottom-2 left-2 right-2 h-20 bg-yellow-300 rounded opacity-80"></div>
                    )}
                    {dnaState.beakerContent === 'filtered-liquid' && (
                      <div className="absolute bottom-2 left-2 right-2 h-12 bg-yellow-100 rounded"></div>
                    )}
                    {dnaState.beakerContent === 'dna-visible' && (
                      <div className="absolute bottom-2 left-2 right-2 h-16 bg-gradient-to-t from-yellow-100 to-transparent rounded">
                        {dnaState.showStrands && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-lg animate-pulse">
                            🧬
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Step Instructions */}
                <div className="text-center space-y-2">
                  {dnaState.currentStep === 0 && <p className="text-sm">Step 1: Add banana to start</p>}
                  {dnaState.currentStep === 1 && <p className="text-sm">Step 2: Add salt, water, and soap</p>}
                  {dnaState.currentStep === 2 && <p className="text-sm">Step 3: Mash the mixture</p>}
                  {dnaState.currentStep === 3 && <p className="text-sm">Step 4: Filter the mixture</p>}
                  {dnaState.currentStep === 4 && <p className="text-sm">Step 5: Add chilled alcohol</p>}
                  {dnaState.currentStep === 5 && <p className="text-sm">Step 6: Extract DNA strands</p>}
                  
                  {dnaState.currentStep === 2 && (
                    <Button size="sm" onClick={() => handleDnaExtractionStep(experiment.id, 'mash')}>
                      Mash/Shake
                    </Button>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => resetDnaExtraction(experiment.id)}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {/* Material Tiles */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Materials:</p>
                {dnaMaterials.filter(material => !dnaState.materialsUsed.includes(material)).map(material => (
                  <div 
                    key={material}
                    className="w-36 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-colors"
                    onClick={() => {
                      if (material === 'Banana') {
                        handleDnaExtractionStep(experiment.id, 'add-banana', material);
                      } else if (['Salt', 'Warm water', 'Dish soap'].includes(material)) {
                        handleDnaExtractionStep(experiment.id, 'add-ingredients', material);
                      } else if (material === 'Coffee filter') {
                        handleDnaExtractionStep(experiment.id, 'filter', material);
                      } else if (material === 'Chilled rubbing alcohol') {
                        handleDnaExtractionStep(experiment.id, 'add-alcohol', material);
                      } else if (material === 'Wooden stick') {
                        handleDnaExtractionStep(experiment.id, 'extract', material);
                      }
                    }}
                  >
                    {material}
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            {dnaState.resultText && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-900">{dnaState.resultText}</p>
                
                {dnaState.showQuiz && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium">Why do we add alcohol at the end?</p>
                    <div className="space-y-1">
                      {['To make it smell good', 'To make DNA visible by making it come out of solution', 'To change color'].map((option, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="sm"
                          className={`w-full justify-start text-xs ${
                            option.includes('DNA visible') ? 'bg-green-100 border-green-300' : ''
                          }`}
                        >
                          {String.fromCharCode(97 + index)}) {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Document Your Results
            </h4>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload photos of your experiment</p>
            </div>
          </div>
        );
    }
  };

  if (selectedExperiment) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{selectedExperiment.title}</h2>
          <Button variant="outline" onClick={() => setSelectedExperiment(null)}>
            Back to Labs
          </Button>
        </div>

        <div className="space-y-6">
          {/* Storyline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Mission Briefing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">{selectedExperiment.storyline}</p>
            </CardContent>
          </Card>

          {/* Objective */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objective
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{selectedExperiment.objective}</p>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Materials Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {selectedExperiment.materials.map((material, index) => (
                  <Badge key={index} variant="secondary" className="justify-center">
                    {material}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Step-by-Step Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {selectedExperiment.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Interactive Element */}
          <Card>
            <CardContent className="pt-6">
              {renderInteractiveElement(selectedExperiment)}
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Scientific Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{selectedExperiment.explanation}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">🧪 Fun Labs - Interactive Experiments</h2>
        <p className="text-muted-foreground text-lg">
          Embark on scientific adventures with hands-on experiments across all subjects!
        </p>
      </div>

      <Tabs defaultValue="biology" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {Object.entries(subjectIcons).map(([subject, icon]) => (
            <TabsTrigger key={subject} value={subject} className="flex items-center gap-2">
              {icon}
              <span className="capitalize hidden sm:inline">{subject}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(experiments).map(([subject, subjectExperiments]) => (
          <TabsContent key={subject} value={subject}>
            <div className={`bg-gradient-to-r ${subjectColors[subject as keyof typeof subjectColors]} text-white rounded-xl p-6 mb-6`}>
              <div className="flex items-center gap-3 mb-3">
                {subjectIcons[subject as keyof typeof subjectIcons]}
                <h3 className="text-2xl font-bold capitalize">{subject} Lab</h3>
              </div>
              <p className="text-white/90">
                Discover the wonders of {subject} through exciting hands-on experiments!
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {subjectExperiments.map((experiment, index) => (
                <Card key={experiment.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {experiment.title}
                      </CardTitle>
                      <Badge variant="outline">Experiment {index + 1}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {experiment.storyline}
                    </p>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">OBJECTIVE:</p>
                      <p className="text-sm">{experiment.objective}</p>
                    </div>
                    <Button 
                      onClick={() => handleStartExperiment(experiment)}
                      className="w-full"
                    >
                      Start Mission
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FunActivities;