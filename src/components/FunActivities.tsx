import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  FlaskConical, 
  Zap, 
  Calculator,
  ArrowLeft,
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
  explanation: string;
}

const FunActivities: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string>('biology');
  
  // DNA Extraction State
  const [dnaStep, setDnaStep] = useState(0);
  const [dnaProgress, setDnaProgress] = useState(0);
  const [showDnaStrands, setShowDnaStrands] = useState(false);
  
  // Mix Lab State
  const [mixLabReagents, setMixLabReagents] = useState<string[]>([]);
  const [beakerColor, setBeakerColor] = useState('transparent');
  const [beakerAnimation, setBeakerAnimation] = useState('');
  const [reactionResult, setReactionResult] = useState('');
  const [showBubbles, setShowBubbles] = useState(false);
  
  // Projectile Motion State
  const [angle, setAngle] = useState([45]);
  const [power, setPower] = useState([50]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [trajectory, setTrajectory] = useState<{x: number, y: number}[]>([]);
  
  // Roller Coaster Builder State
  const [selectedTrackPiece, setSelectedTrackPiece] = useState('');
  const [placedTracks, setPlacedTracks] = useState<{id: string, type: string, x: number, y: number, rotation: number}[]>([]);
  const [isTestingRide, setIsTestingRide] = useState(false);
  const [totalTrackLength, setTotalTrackLength] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [loopCount, setLoopCount] = useState(0);

  const experiments: { [key: string]: Experiment } = {
    'dna-extraction': {
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
      explanation: 'Soap breaks cell membranes, salt helps DNA come together, and cold alcohol makes DNA visible by precipitating it out of solution.'
    },
    'mix-lab': {
      id: 'mix-lab',
      title: 'Mix Lab',
      storyline: "Welcome to the Chemistry Mix Lab! You're a young chemist with access to common household reagents. Discover what happens when you mix them!",
      objective: 'Learn chemical reactions, pH changes, and gas production through safe experimentation',
      materials: ['Vinegar (Acetic Acid)', 'Baking Soda (Sodium Bicarbonate)', 'Hydrogen Peroxide', 'Potassium Iodide', 'Lemon Juice (Citric Acid)', 'Dish Soap'],
      instructions: [
        'Drag reagents from the right into the beaker',
        'Observe color changes and reactions',
        'Mix up to 3 reagents for clear results',
        'Use the Reset button to try new combinations',
        'Follow safety guidelines for real experiments'
      ],
      explanation: 'Different chemical combinations produce various reactions: acids and bases neutralize, peroxide creates foam, and various precipitations occur.'
    },
    'projectile-motion': {
      id: 'projectile-motion',
      title: 'Projectile Motion Simulator',
      storyline: "You're designing a cannon for a medieval castle defense. Test different angles and power to hit your target!",
      objective: 'Understand projectile motion, angle optimization, and physics of trajectories',
      materials: ['Virtual cannon', 'Angle adjuster', 'Power controls', 'Target'],
      instructions: [
        'Adjust the launch angle using the slider (0°-90°)',
        'Set the power level (low to high)',
        'Click Launch to fire the projectile',
        'Observe the curved trajectory path',
        'Try different combinations to hit targets',
        'Reset and experiment with optimal angles'
      ],
      explanation: 'Projectiles follow parabolic paths due to gravity. 45° typically gives maximum range, but optimal angle depends on target height and distance.'
    },
    'roller-coaster-builder': {
      id: 'roller-coaster-builder',
      title: 'Build Your Dream Roller Coaster',
      storyline: "You're a theme park engineer tasked with designing the most exciting roller coaster! Use different track pieces to create an amazing ride!",
      objective: 'Learn geometry, distance calculations, angles, and basic physics through roller coaster design',
      materials: ['Straight Track', 'Curved Track', 'Loop', 'Drop', 'Support Pillar'],
      instructions: [
        'Select track pieces from the left panel',
        'Drag pieces onto the grid to build your coaster',
        'Connect pieces to form a complete track',
        'Watch the math calculations update in real-time',
        'Click "Test Ride" to see the cart animation',
        'Optimize for speed, safety, and fun!'
      ],
      explanation: 'Roller coasters use physics principles like gravity, momentum, and centripetal force. The track length, angles, and height differences all affect the ride experience.'
    }
  };

  const subjectExperiments = {
    biology: ['dna-extraction'],
    chemistry: ['mix-lab'],
    physics: ['projectile-motion'],
    mathematics: ['roller-coaster-builder']
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

  const handleStartExperiment = (experimentId: string, subject: string) => {
    setSelectedExperiment(experiments[experimentId]);
    setCurrentSubject(subject);
    
    // Reset all states
    setDnaStep(0);
    setDnaProgress(0);
    setShowDnaStrands(false);
    setMixLabReagents([]);
    setBeakerColor('transparent');
    setBeakerAnimation('');
    setReactionResult('');
    setShowBubbles(false);
    setAngle([45]);
    setPower([50]);
    setIsLaunching(false);
    setTrajectory([]);
    setSelectedTrackPiece('');
    setPlacedTracks([]);
    setIsTestingRide(false);
    setTotalTrackLength(0);
    setEstimatedTime(0);
    setLoopCount(0);
  };

  const handleBackToLabs = () => {
    setSelectedExperiment(null);
    // Don't reset currentSubject - keep it to return to same category
  };

  // DNA Extraction Functions
  const handleDnaStep = (step: number) => {
    setDnaStep(step);
    setDnaProgress((step / 5) * 100);
    if (step === 5) {
      setTimeout(() => setShowDnaStrands(true), 1000);
    }
  };

  // Mix Lab Functions
  const availableReagents = [
    { name: 'Vinegar (Acetic Acid)', color: 'bg-pink-200', id: 'vinegar' },
    { name: 'Baking Soda (Sodium Bicarbonate)', color: 'bg-blue-200', id: 'baking-soda' },
    { name: 'Hydrogen Peroxide', color: 'bg-cyan-200', id: 'hydrogen-peroxide' },
    { name: 'Potassium Iodide', color: 'bg-yellow-200', id: 'potassium-iodide' },
    { name: 'Lemon Juice (Citric Acid)', color: 'bg-yellow-300', id: 'lemon-juice' },
    { name: 'Dish Soap', color: 'bg-purple-200', id: 'dish-soap' }
  ];

  const handleReagentDrop = (reagentId: string) => {
    if (mixLabReagents.includes(reagentId) || mixLabReagents.length >= 3) {
      if (mixLabReagents.length >= 3) {
        setReactionResult('Try mixing 2–3 ingredients for clear results.');
      }
      return;
    }

    const newReagents = [...mixLabReagents, reagentId];
    setMixLabReagents(newReagents);

    // Apply reaction rules
    const reactionKey = newReagents.sort().join('+');
    applyReaction(reactionKey, newReagents);
  };

  const applyReaction = (reactionKey: string, reagents: string[]) => {
    setShowBubbles(false);
    setBeakerAnimation('');

    if (reactionKey === 'baking-soda+vinegar') {
      setBeakerColor('bg-pink-100');
      setShowBubbles(true);
      setBeakerAnimation('animate-pulse');
      setReactionResult('FIZZ: CO₂ released. NaHCO₃ + CH₃COOH → NaCH₃COO + H₂O + CO₂. You observed gas bubbles!');
    } else if (reactionKey === 'dish-soap+hydrogen-peroxide+potassium-iodide') {
      setBeakerColor('bg-orange-200');
      setShowBubbles(true);
      setBeakerAnimation('animate-bounce');
      setReactionResult('ELEPHANT TOOTHPASTE: Catalytic decomposition creates oxygen foam!');
    } else if (reactionKey === 'baking-soda+lemon-juice') {
      setBeakerColor('bg-yellow-100');
      setShowBubbles(true);
      setReactionResult('CITRIC FIZZ: Citric acid + sodium bicarbonate produces CO₂ bubbles!');
    } else if (reactionKey === 'dish-soap+hydrogen-peroxide') {
      setBeakerColor('bg-cyan-100');
      setShowBubbles(true);
      setReactionResult('FOAMY BUBBLES: Soap creates stable foam with oxygen from H₂O₂ decomposition!');
    } else if (reactionKey === 'potassium-iodide+vinegar') {
      setBeakerColor('bg-amber-200');
      setReactionResult('IODINE PRECIPITATION: Iodine forms, creating brown/yellow solution!');
    } else {
      setReactionResult('No visible reaction — try different ingredients. Try adding Vinegar or Baking Soda!');
    }
  };

  const resetMixLab = () => {
    setMixLabReagents([]);
    setBeakerColor('transparent');
    setBeakerAnimation('');
    setReactionResult('');
    setShowBubbles(false);
  };

  // Projectile Motion Functions
  const launchProjectile = () => {
    setIsLaunching(true);
    setTrajectory([]);

    const angleRad = (angle[0] * Math.PI) / 180;
    const velocity = power[0] / 2;
    const g = 9.8;
    const points: {x: number, y: number}[] = [];

    for (let t = 0; t <= 5; t += 0.1) {
      const x = velocity * Math.cos(angleRad) * t * 20;
      const y = Math.max(0, velocity * Math.sin(angleRad) * t * 20 - 0.5 * g * t * t * 20);
      points.push({ x, y });
      if (y <= 0 && t > 0) break;
    }

    let i = 0;
    const animateTrajectory = () => {
      if (i < points.length) {
        setTrajectory(points.slice(0, i + 1));
        i++;
        setTimeout(animateTrajectory, 50);
      } else {
        setIsLaunching(false);
      }
    };
    animateTrajectory();
  };

  const resetProjectile = () => {
    setTrajectory([]);
    setIsLaunching(false);
  };

  // Roller Coaster Builder Functions
  const trackPieces = [
    { type: 'straight', name: 'Straight Track', icon: '━', length: 5 },
    { type: 'curved', name: 'Curved Track', icon: '╭', length: 7 },
    { type: 'loop', name: 'Loop', icon: '○', length: 10 },
    { type: 'drop', name: 'Drop', icon: '╲', length: 8 },
    { type: 'support', name: 'Support Pillar', icon: '▌', length: 0 }
  ];

  const handleTrackPlace = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTrackPiece) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const piece = trackPieces.find(p => p.type === selectedTrackPiece);
    const newTrack = {
      id: Date.now().toString(),
      type: selectedTrackPiece,
      x,
      y,
      rotation: 0
    };

    const newTracks = [...placedTracks, newTrack];
    setPlacedTracks(newTracks);
    setSelectedTrackPiece('');

    // Calculate stats
    const totalLength = newTracks.reduce((sum, track) => {
      const trackPiece = trackPieces.find(p => p.type === track.type);
      return sum + (trackPiece?.length || 0);
    }, 0);
    setTotalTrackLength(totalLength);
    setEstimatedTime(Math.round(totalLength * 0.8));
    setLoopCount(newTracks.filter(track => track.type === 'loop').length);
  };

  const testRide = () => {
    if (placedTracks.length === 0) return;
    setIsTestingRide(true);
    setTimeout(() => setIsTestingRide(false), 3000);
  };

  const resetRollerCoaster = () => {
    setPlacedTracks([]);
    setSelectedTrackPiece('');
    setIsTestingRide(false);
    setTotalTrackLength(0);
    setEstimatedTime(0);
    setLoopCount(0);
  };

  if (selectedExperiment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={handleBackToLabs}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back to Labs
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {selectedExperiment.title}
            </h1>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Safety Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simulation mode: For real experiments, use adult supervision, gloves, and goggles. Do not ingest any materials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📖 Storyline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedExperiment.storyline}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Objective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedExperiment.objective}</p>
              </CardContent>
            </Card>

            {/* DNA Extraction Simulator */}
            {selectedExperiment.id === 'dna-extraction' && (
              <Card>
                <CardHeader>
                  <CardTitle>🧬 DNA Extraction Simulator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Laboratory Setup</h3>
                      <div className="relative">
                        <div className="w-32 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg mx-auto mb-4 relative overflow-hidden">
                          {dnaStep >= 1 && (
                            <div className="absolute bottom-0 w-full h-1/3 bg-yellow-200 transition-all duration-500">
                              {dnaStep >= 2 && <div className="absolute top-0 w-full h-full bg-yellow-300 opacity-50"></div>}
                              {dnaStep >= 4 && <div className="absolute top-0 w-full h-1/4 bg-blue-100"></div>}
                              {showDnaStrands && (
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                                  <div className="w-1 h-8 bg-white animate-pulse rounded-full"></div>
                                  <div className="w-1 h-6 bg-white/80 animate-pulse rounded-full ml-1 -mt-6"></div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                          {dnaStep === 0 && "Empty beaker"}
                          {dnaStep === 1 && "Mashed banana added"}
                          {dnaStep === 2 && "Salt, soap, and water mixed"}
                          {dnaStep === 3 && "Mixture filtered"}
                          {dnaStep === 4 && "Alcohol layer added"}
                          {dnaStep === 5 && showDnaStrands && "DNA strands visible!"}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm font-medium mb-2">Progress: {Math.round(dnaProgress)}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${dnaProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Experiment Steps</h3>
                      <div className="space-y-3">
                        <Button 
                          onClick={() => handleDnaStep(1)}
                          disabled={dnaStep >= 1}
                          className="w-full justify-start"
                          variant={dnaStep >= 1 ? "secondary" : "default"}
                        >
                          Step 1: Add Banana & Mash
                        </Button>
                        <Button 
                          onClick={() => handleDnaStep(2)}
                          disabled={dnaStep < 1 || dnaStep >= 2}
                          className="w-full justify-start"
                          variant={dnaStep >= 2 ? "secondary" : "default"}
                        >
                          Step 2: Add Salt, Soap & Water
                        </Button>
                        <Button 
                          onClick={() => handleDnaStep(3)}
                          disabled={dnaStep < 2 || dnaStep >= 3}
                          className="w-full justify-start"
                          variant={dnaStep >= 3 ? "secondary" : "default"}
                        >
                          Step 3: Filter Mixture
                        </Button>
                        <Button 
                          onClick={() => handleDnaStep(4)}
                          disabled={dnaStep < 3 || dnaStep >= 4}
                          className="w-full justify-start"
                          variant={dnaStep >= 4 ? "secondary" : "default"}
                        >
                          Step 4: Add Chilled Alcohol
                        </Button>
                        <Button 
                          onClick={() => handleDnaStep(5)}
                          disabled={dnaStep < 4 || dnaStep >= 5}
                          className="w-full justify-start"
                          variant={dnaStep >= 5 ? "secondary" : "default"}
                        >
                          Step 5: Extract DNA Strands
                        </Button>
                      </div>

                      {showDnaStrands && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800">✅ DNA Extracted!</h4>
                          <p className="text-sm text-green-700 mt-2">
                            You successfully extracted DNA! The white strands you see contain the genetic information of the banana.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mix Lab Simulator */}
            {selectedExperiment.id === 'mix-lab' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    ⚗️ Mix Lab Simulator
                    <Button onClick={resetMixLab} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Laboratory Beaker</h3>
                      <div className="relative">
                        <div className={`w-32 h-40 border-4 border-gray-300 rounded-b-full mx-auto relative overflow-hidden ${beakerColor} ${beakerAnimation}`}>
                          {showBubbles && (
                            <div className="absolute inset-0">
                              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/4 animate-bounce"></div>
                              <div className="w-1 h-1 bg-white rounded-full absolute top-1/3 left-1/2 animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-white rounded-full absolute top-3/4 right-1/4 animate-bounce delay-200"></div>
                              <div className="w-1 h-1 bg-white rounded-full absolute top-1/4 right-1/3 animate-bounce delay-300"></div>
                            </div>
                          )}
                        </div>
                        <div className="text-center text-sm text-muted-foreground mt-2">
                          Reagents added: {mixLabReagents.length}/3
                        </div>
                        {mixLabReagents.length > 0 && (
                          <div className="text-center text-xs mt-1">
                            {mixLabReagents.map(r => availableReagents.find(a => a.id === r)?.name).join(', ')}
                          </div>
                        )}
                      </div>

                      {reactionResult && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">{reactionResult}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Available Reagents</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {availableReagents.map((reagent) => (
                          <div
                            key={reagent.id}
                            className={`p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all hover:border-primary ${reagent.color} ${
                              mixLabReagents.includes(reagent.id) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={() => handleReagentDrop(reagent.id)}
                          >
                            <div className="text-sm font-medium">{reagent.name}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Click on reagents to add them to the beaker. Mix 2-3 for best results!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projectile Motion Simulator */}
            {selectedExperiment.id === 'projectile-motion' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    🎯 Projectile Motion Simulator
                    <Button onClick={resetProjectile} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Launch Controls</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Angle: {angle[0]}°</label>
                            <Slider
                              value={angle}
                              onValueChange={setAngle}
                              min={0}
                              max={90}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Power: {power[0]}%</label>
                            <Slider
                              value={power}
                              onValueChange={setPower}
                              min={10}
                              max={100}
                              step={5}
                              className="mt-2"
                            />
                          </div>
                          <Button 
                            onClick={launchProjectile}
                            disabled={isLaunching}
                            className="w-full"
                          >
                            {isLaunching ? 'Launching...' : 'Launch Projectile'}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Trajectory Display</h3>
                        <div className="relative w-full h-64 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full">
                            {trajectory.length > 1 && (
                              <path
                                d={`M 10,${256 - 10} ${trajectory.map(point => `L ${Math.min(point.x + 10, 400)},${Math.max(256 - point.y - 10, 10)}`).join(' ')}`}
                                stroke="#ef4444"
                                strokeWidth="3"
                                fill="none"
                                className="animate-pulse"
                              />
                            )}
                            {trajectory.length > 0 && (
                              <circle
                                cx={Math.min(trajectory[trajectory.length - 1].x + 10, 400)}
                                cy={Math.max(256 - trajectory[trajectory.length - 1].y - 10, 10)}
                                r="6"
                                fill="#dc2626"
                                className="animate-pulse"
                              />
                            )}
                          </svg>
                          <div className="absolute bottom-2 left-2 text-xs text-gray-600">
                            Ground Level
                          </div>
                        </div>
                      </div>
                    </div>

                    {trajectory.length > 0 && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800">📊 Results</h4>
                        <p className="text-sm text-purple-700 mt-2">
                          Maximum height: {Math.max(...trajectory.map(p => p.y)).toFixed(1)} units<br/>
                          Total distance: {Math.max(...trajectory.map(p => p.x)).toFixed(1)} units<br/>
                          Optimal angle for maximum range is typically 45°!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Roller Coaster Builder */}
            {selectedExperiment.id === 'roller-coaster-builder' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    🎢 Roller Coaster Builder
                    <div className="flex gap-2">
                      <Button onClick={testRide} variant="outline" size="sm" disabled={placedTracks.length === 0 || isTestingRide}>
                        {isTestingRide ? '🚗 Testing...' : '🚗 Test Ride'}
                      </Button>
                      <Button onClick={resetRollerCoaster} variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Track Pieces</h3>
                      <div className="space-y-2">
                        {trackPieces.map((piece) => (
                          <div
                            key={piece.type}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:border-primary ${
                              selectedTrackPiece === piece.type ? 'border-primary bg-primary/10' : 'border-gray-300'
                            }`}
                            onClick={() => setSelectedTrackPiece(piece.type)}
                          >
                            <div className="text-2xl text-center">{piece.icon}</div>
                            <div className="text-xs text-center mt-1">{piece.name}</div>
                            <div className="text-xs text-center text-muted-foreground">
                              {piece.length > 0 ? `${piece.length} units` : 'Support'}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Select a track piece, then click on the grid to place it!
                      </p>
                    </div>

                    <div className="md:col-span-3">
                      <h3 className="font-semibold mb-4">Coaster Grid</h3>
                      <div 
                        className={`relative w-full h-96 bg-gradient-to-b from-blue-100 to-yellow-100 rounded-lg border-2 border-dashed border-gray-300 cursor-crosshair ${isTestingRide ? 'animate-pulse' : ''}`}
                        onClick={handleTrackPlace}
                      >
                        {/* Grid pattern */}
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="border-b border-gray-300" style={{ height: '5%' }}></div>
                          ))}
                        </div>

                        {/* Placed tracks */}
                        {placedTracks.map((track) => (
                          <div
                            key={track.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl cursor-move ${isTestingRide && track.type !== 'support' ? 'animate-bounce' : ''}`}
                            style={{ 
                              left: track.x, 
                              top: track.y, 
                              transform: `translate(-50%, -50%) rotate(${track.rotation}deg)`,
                              color: track.type === 'loop' ? '#f59e0b' : track.type === 'drop' ? '#ef4444' : '#3b82f6'
                            }}
                          >
                            {trackPieces.find(p => p.type === track.type)?.icon}
                          </div>
                        ))}

                        {/* Test ride cart animation */}
                        {isTestingRide && placedTracks.length > 0 && (
                          <div 
                            className="absolute w-6 h-6 bg-red-500 rounded-full animate-ping"
                            style={{ left: placedTracks[0].x, top: placedTracks[0].y }}
                          >
                            🚗
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 text-xs text-gray-600">
                          Track pieces: {placedTracks.length}
                        </div>
                      </div>

                      {/* Math Statistics */}
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800">📏 Track Length</h4>
                          <p className="text-lg font-bold text-blue-600">{totalTrackLength} units</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800">⏱️ Estimated Time</h4>
                          <p className="text-lg font-bold text-green-600">{estimatedTime}s</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <h4 className="font-semibold text-orange-800">🔄 Loops</h4>
                          <p className="text-lg font-bold text-orange-600">{loopCount}</p>
                        </div>
                      </div>

                      {placedTracks.length > 0 && (
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-800">🎢 Coaster Stats</h4>
                          <p className="text-sm text-purple-700 mt-2">
                            Your coaster has {placedTracks.length} pieces with a total length of {totalTrackLength} units. 
                            The estimated ride time is {estimatedTime} seconds with {loopCount} thrilling loops!
                            {totalTrackLength > 50 && " That's one epic roller coaster! 🎉"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>💡 Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedExperiment.explanation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📋 Materials Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedExperiment.materials.map((material, index) => (
                    <Badge key={index} variant="secondary" className="justify-center p-2">
                      {material}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            🔬 Fun Labs
          </h1>
          <p className="text-muted-foreground">
            Explore interactive science experiments across four exciting subjects!
          </p>
        </div>

        <Tabs value={currentSubject} onValueChange={setCurrentSubject} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {Object.entries(subjectIcons).map(([subject, icon]) => (
              <TabsTrigger key={subject} value={subject} className="flex items-center gap-2">
                {icon}
                <span className="capitalize">{subject}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(subjectExperiments).map(([subject, experimentIds]) => (
            <TabsContent key={subject} value={subject}>
              <div className="grid gap-6">
                {experimentIds.map(experimentId => {
                  const experiment = experiments[experimentId];
                  return (
                    <Card key={experiment.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${subjectColors[subject as keyof typeof subjectColors]} text-white`}>
                              {subjectIcons[subject as keyof typeof subjectIcons]}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{experiment.title}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {experiment.storyline}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">🎯 Learning Objective:</h4>
                            <p className="text-sm text-muted-foreground">{experiment.objective}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Interactive Simulation</Badge>
                            <Badge variant="outline">{experiment.materials.length} Materials</Badge>
                            <Badge variant="outline">{experiment.instructions.length} Steps</Badge>
                          </div>
                          
                          <Button 
                            onClick={() => handleStartExperiment(experiment.id, subject)}
                            className="w-full"
                            size="lg"
                          >
                            Start Experiment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FunActivities;