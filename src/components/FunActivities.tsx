import React, { useState } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import TextToSpeech from './TextToSpeech';

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
  instructions: string[];
}

const FunActivities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setSelectedChapter(null);
    setSelectedExperiment(null);
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

  const activities: Activity[] = [
    {
      id: 'science-lab',
      title: 'Science Lab',
      description: 'Explore exciting science experiments and learn about the world around you.',
      image: '/images/science-lab.jpg',
      chapters: [
        {
          id: 'chemistry',
          name: 'Chemistry Experiments',
          description: 'Conduct cool chemistry experiments and learn about reactions and compounds.',
          experiments: [
            {
              id: 'volcano',
              name: 'Baking Soda Volcano',
              description: 'Create a classic volcano eruption using baking soda and vinegar.',
              icon: '🌋',
              difficulty: 'Easy',
              duration: '30 minutes',
              instructions: [
                'Pour vinegar into a plastic bottle.',
                'Add baking soda to the bottle.',
                'Watch the volcano erupt!'
              ]
            },
            {
              id: 'crystal',
              name: 'Crystal Growing',
              description: 'Grow your own crystals using borax and hot water.',
              icon: '💎',
              difficulty: 'Medium',
              duration: '24 hours',
              instructions: [
                'Mix borax with hot water until dissolved.',
                'Suspend a string in the solution.',
                'Wait for crystals to form on the string.'
              ]
            }
          ]
        },
        {
          id: 'physics',
          name: 'Physics Experiments',
          description: 'Discover the principles of physics with these hands-on experiments.',
          experiments: [
            {
              id: 'balloon-rocket',
              name: 'Balloon Rocket',
              description: 'Launch a balloon rocket using air pressure.',
              icon: '🎈',
              difficulty: 'Easy',
              duration: '15 minutes',
              instructions: [
                'Inflate a balloon and tape it to a straw.',
                'Thread a string through the straw.',
                'Release the balloon and watch it fly!'
              ]
            },
            {
              id: 'egg-drop',
              name: 'Egg Drop Challenge',
              description: 'Design a contraption to protect an egg from breaking when dropped.',
              icon: '🥚',
              difficulty: 'Hard',
              duration: '1 hour',
              instructions: [
                'Gather materials like cardboard, tape, and cotton balls.',
                'Build a protective structure around the egg.',
                'Drop the egg from a height and see if it survives.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'art-studio',
      title: 'Art Studio',
      description: 'Unleash your creativity with fun art projects and activities.',
      image: '/images/art-studio.jpg',
      chapters: [
        {
          id: 'painting',
          name: 'Painting Projects',
          description: 'Create beautiful paintings using different techniques and materials.',
          experiments: [
            {
              id: 'watercolor',
              name: 'Watercolor Painting',
              description: 'Experiment with watercolor paints to create stunning landscapes and portraits.',
              icon: '🎨',
              difficulty: 'Easy',
              duration: '45 minutes',
              instructions: [
                'Wet the watercolor paper with water.',
                'Apply watercolor paints to create your artwork.',
                'Let the painting dry completely.'
              ]
            },
            {
              id: 'acrylic',
              name: 'Acrylic Pouring',
              description: 'Create abstract art by pouring acrylic paints onto a canvas.',
              icon: '🖼️',
              difficulty: 'Medium',
              duration: '1 hour',
              instructions: [
                'Mix acrylic paints with pouring medium.',
                'Pour the paints onto a canvas in layers.',
                'Tilt the canvas to create unique patterns.'
              ]
            }
          ]
        },
        {
          id: 'sculpture',
          name: 'Sculpture Projects',
          description: 'Build 3D sculptures using clay, paper, and other materials.',
          experiments: [
            {
              id: 'clay',
              name: 'Clay Sculpture',
              description: 'Mold clay into different shapes and create your own sculptures.',
              icon: '🗿',
              difficulty: 'Easy',
              duration: '1 hour',
              instructions: [
                'Soften the clay by kneading it.',
                'Shape the clay into your desired form.',
                'Let the sculpture dry and harden.'
              ]
            },
            {
              id: 'paper-mache',
              name: 'Paper Mache Sculpture',
              description: 'Create a paper mache sculpture using newspaper and glue.',
              icon: '📰',
              difficulty: 'Medium',
              duration: '2 days',
              instructions: [
                'Tear newspaper into strips.',
                'Mix glue with water to create a paste.',
                'Cover a balloon or wire frame with paper mache and let it dry.'
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {!selectedActivity ? (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fun Labs 🚀</h2>
          <p className="text-gray-600 mb-6">
            Explore exciting activities and experiments to learn and have fun!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedChapter.experiments.map((experiment) => (
              <div
                key={experiment.id}
                onClick={() => handleExperimentClick(experiment)}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:border-purple-300 cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl mb-3">{experiment.icon}</div>
                  <TextToSpeech text={experiment.name} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {experiment.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{experiment.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {experiment.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">{experiment.duration}</span>
                </div>
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{selectedExperiment.name}</h3>
                <TextToSpeech text={selectedExperiment.name} size={20} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-gray-600">{selectedExperiment.description}</p>
                <TextToSpeech text={selectedExperiment.description} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h4 className="font-semibold text-gray-800">Instructions:</h4>
                <TextToSpeech text="Follow these step-by-step instructions to complete the experiment" />
              </div>
              <div className="space-y-3">
                {selectedExperiment.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-gray-700">{instruction}</span>
                      <TextToSpeech text={instruction} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
                Start Experiment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunActivities;
