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
  Upload
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
  interactiveType: 'quiz' | 'simulation' | 'input' | 'video';
}

const FunActivities: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [experimentProgress, setExperimentProgress] = useState<{ [key: string]: number }>({});
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [simulationStates, setSimulationStates] = useState<{ [key: string]: any }>({});

  const experiments: { [key: string]: Experiment[] } = {
    biology: [
      {
        id: 'dna-extraction',
        title: 'DNA Extraction from a Banana',
        storyline: "You're a young scientist working for \"FunLabs Bio Research.\" A strange plant mutation was discovered. Your job is to extract its DNA and find out why it's changing.",
        objective: 'Understand DNA in cells; learn basic molecular biology skills',
        materials: ['Banana', 'Dish soap', 'Salt', 'Warm water', 'Rubbing alcohol', 'Ziplock bag', 'Coffee filter', 'Glass'],
        instructions: [
          'Mash the banana in a ziplock bag',
          'Add soap, salt, and warm water to the bag',
          'Mix gently for 2 minutes',
          'Filter the mixture through coffee filter',
          'Slowly add cold rubbing alcohol',
          'Observe the DNA strands forming at the surface'
        ],
        howToDo: 'Use in-app video demo + quiz + allow photo uploads',
        explanation: 'Soap breaks cell walls, salt clumps DNA together, and alcohol makes DNA visible as it separates from water.',
        interactiveType: 'quiz'
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
  };

  const handleProgressStep = (experimentId: string) => {
    const currentProgress = experimentProgress[experimentId] || 0;
    setExperimentProgress({ ...experimentProgress, [experimentId]: Math.min(100, currentProgress + 20) });
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