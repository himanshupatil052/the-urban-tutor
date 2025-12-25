
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserProfile from '@/components/UserProfile';
import EditableWeeklyTimetable from '@/components/EditableWeeklyTimetable';
import DailyGoals from '@/components/DailyGoals';
import FunActivities from '@/components/FunActivities';
import VideoPlayer from '@/components/VideoPlayer';
import ParentsSection from '@/components/ParentsSection';


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

const Index = () => {
  const [selectedChapter, setSelectedChapter] = useState<{subject: string, chapter: Chapter} | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showParentsSection, setShowParentsSection] = useState(false);

  const handleChapterSelect = (subject: string, chapter: Chapter) => {
    setSelectedChapter({subject, chapter});
    // No videos available - will show message instead
    setVideos([]);
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
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">📹</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedChapter.chapter.title}
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                    Oops! Out of videos. Coming soon! 🎬
                  </h3>
                  <p className="text-yellow-700">
                    We're working hard to bring you amazing video content for this chapter. 
                    Check back soon for exciting lessons!
                  </p>
                </div>
                <button
                  onClick={handleCloseVideos}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Compact Header with Profile and Parents Section */}
              <UserProfile onParentsClick={() => setShowParentsSection(true)} />

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
