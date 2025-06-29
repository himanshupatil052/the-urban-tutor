
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserProfile from '@/components/UserProfile';
import EditableWeeklyTimetable from '@/components/EditableWeeklyTimetable';
import DailyGoals from '@/components/DailyGoals';
import FunActivities from '@/components/FunActivities';
import VideoPlayer from '@/components/VideoPlayer';
import ParentsSection from '@/components/ParentsSection';
import { Users } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  completed: boolean;
}

interface Video {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
}

const generateVideos = (subject: string, chapterTitle: string): Video[] => {
  const thumbnails = [
    'photo-1461749280684-dccba630e2f6', // Java programming
    'photo-1486312338219-ce68d2c6f44d', // MacBook Pro
    'photo-1649972904349-6e44c42644a7', // woman with laptop
    'photo-1470071459604-3b5ec3a7fe05', // mountain
    'photo-1501854140801-50d01698950b'  // green mountains
  ];

  return Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `${chapterTitle} - Lesson ${i + 1}: ${[
      'Introduction', 'Basic Concepts', 'Advanced Topics', 
      'Practice Problems', 'Real World Applications', 'Case Studies',
      'Common Mistakes', 'Tips & Tricks', 'Summary & Review'
    ][i]}`,
    duration: `${Math.floor(Math.random() * 20) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    thumbnail: thumbnails[i % thumbnails.length],
    completed: Math.random() > 0.6
  }));
};

const Index = () => {
  const [selectedChapter, setSelectedChapter] = useState<{subject: string, chapter: Chapter} | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showParentsSection, setShowParentsSection] = useState(false);

  const handleChapterSelect = (subject: string, chapter: Chapter) => {
    setSelectedChapter({subject, chapter});
    setVideos(generateVideos(subject, chapter.title));
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideos = () => {
    setSelectedChapter(null);
    setVideos([]);
    setSelectedVideo(null);
  };

  const handleMarkDone = (videoId: number) => {
    setVideos(videos.map(v => 
      v.id === videoId ? { ...v, completed: !v.completed } : v
    ));
    
    if (selectedVideo?.id === videoId) {
      setSelectedVideo({...selectedVideo, completed: !selectedVideo.completed});
    }
  };

  const handleAskAI = () => {
    alert('AI Assistant: How can I help you with this lesson? 🤖');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Sidebar */}
      <Sidebar 
        onChapterSelect={handleChapterSelect}
        selectedChapter={selectedChapter}
      />

      {/* Main Content - Full Width */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="w-full max-w-none">
          {selectedChapter ? (
            <VideoPlayer
              videos={videos}
              onVideoSelect={handleVideoSelect}
              selectedVideo={selectedVideo}
              onClose={handleCloseVideos}
              onMarkDone={handleMarkDone}
              onAskAI={handleAskAI}
            />
          ) : (
            <div className="space-y-6">
              {/* Header with Profile and Parents Section */}
              <div className="flex items-start justify-between gap-4">
                {/* Profile Section */}
                <div className="flex-1">
                  <UserProfile />
                </div>

                {/* Parents Section Button */}
                <button
                  onClick={() => setShowParentsSection(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Users size={20} />
                  <span className="font-medium">Parents Section</span>
                </button>
              </div>

              {/* Welcome to Urban Tutor banner */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 lg:p-8 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold mb-4">Welcome to Urban Tutor! 🎓</h1>
                <p className="text-blue-100 text-base lg:text-lg">
                  Your personalized learning journey starts here. Choose a subject from the sidebar to begin!
                </p>
              </div>

              {/* Fun Activities */}
              <FunActivities />

              {/* Daily Goals */}
              <DailyGoals />

              {/* Editable Weekly Timetable at the bottom */}
              <EditableWeeklyTimetable />
            </div>
          )}
        </div>
      </div>

      {/* Parents Section Modal */}
      <ParentsSection
        isOpen={showParentsSection}
        onClose={() => setShowParentsSection(false)}
      />
    </div>
  );
};

export default Index;
