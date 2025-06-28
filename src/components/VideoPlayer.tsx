
import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
}

interface Props {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  selectedVideo: Video | null;
  onClose: () => void;
  onMarkDone: (videoId: number) => void;
  onAskAI: () => void;
}

const VideoPlayer: React.FC<Props> = ({ 
  videos, 
  onVideoSelect, 
  selectedVideo, 
  onClose, 
  onMarkDone, 
  onAskAI 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  if (isFullscreen && selectedVideo) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
            <img 
              src={`https://images.unsplash.com/${selectedVideo.thumbnail}?w=1200&h=675&fit=crop`}
              alt={selectedVideo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="rounded-full w-20 h-20">
                <Play size={32} />
              </Button>
            </div>
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">{selectedVideo.title}</h3>
              <p className="text-gray-400">{selectedVideo.duration}</p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={() => onMarkDone(selectedVideo.id)}
                variant={selectedVideo.completed ? "secondary" : "default"}
                className="flex items-center gap-2"
              >
                <CheckCircle size={16} />
                {selectedVideo.completed ? "Completed" : "Mark as Done"}
              </Button>
              
              <Button
                onClick={onAskAI}
                variant="outline"
                className="flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
              >
                <MessageCircle size={16} />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Video Lessons</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className="group cursor-pointer bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden relative">
              <img 
                src={`https://images.unsplash.com/${video.thumbnail}?w=400&h=225&fit=crop`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="text-white" size={24} />
              </div>
              {video.completed && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle size={16} />
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-gray-500 text-xs">{video.duration}</p>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">{selectedVideo.title}</h3>
              <p className="text-gray-600 text-sm">{selectedVideo.duration}</p>
            </div>
            
            <Button onClick={openFullscreen} className="bg-blue-600 hover:bg-blue-700">
              Watch Fullscreen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
