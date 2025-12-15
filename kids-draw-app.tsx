import React, { useState } from 'react';
import { Home, Palette, RotateCcw, Heart, Shuffle, Play } from 'lucide-react';

const drawings = [
  {
    name: "Ice Cream",
    emoji: "🍦",
    videoUrl: "https://youtu.be/uvhEoV_x2Ec",
    thumbnail: "https://img.youtube.com/vi/uvhEoV_x2Ec/maxresdefault.jpg"
  },
  {
    name: "Sun",
    emoji: "☀️",
    videoUrl: "https://youtu.be/_bpoPsour64",
    thumbnail: "https://img.youtube.com/vi/_bpoPsour64/maxresdefault.jpg"
  },
  {
    name: "Cat",
    emoji: "🐱",
    videoUrl: "https://youtu.be/uvhEoV_x2Ec",
    thumbnail: "https://img.youtube.com/vi/uvhEoV_x2Ec/maxresdefault.jpg"
  },
  {
    name: "Flower",
    emoji: "🌸",
    videoUrl: "https://youtu.be/_bpoPsour64",
    thumbnail: "https://img.youtube.com/vi/_bpoPsour64/maxresdefault.jpg"
  }
];

export default function DrawingApp() {
  const [currentDrawing, setCurrentDrawing] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [color, setColor] = useState('#FF6B9D');

  const drawing = drawings[currentDrawing];

  const handleReset = () => {
    setLiked(false);
    setCurrentDrawing(0);
  };

  const handleNewDrawing = () => {
    setCurrentDrawing((currentDrawing + 1) % drawings.length);
    setLiked(false);
  };

  const handleHome = () => {
    setCurrentDrawing(0);
    setLiked(false);
    setShowCustomize(false);
  };

  const openVideo = () => {
    window.open(drawing.videoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={handleHome}
            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            title="Home"
          >
            <Home className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            title="Customize Colors"
          >
            <Palette className="w-6 h-6 text-blue-600" />
          </button>
          <button
            onClick={handleReset}
            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            title="Start Over"
          >
            <RotateCcw className="w-6 h-6 text-green-600" />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            title="Like"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-red-400'}`}
            />
          </button>
          <button
            onClick={handleNewDrawing}
            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            title="Draw Something Else"
          >
            <Shuffle className="w-6 h-6 text-orange-600" />
          </button>
        </div>

        {/* Color Customizer */}
        {showCustomize && (
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Pick Your Color!</h3>
            <div className="flex justify-center gap-3 flex-wrap">
              {['#FF6B9D', '#FFD93D', '#6BCF7F', '#4ECDC4', '#A78BFA', '#F97316'].map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform ${color === c ? 'ring-4 ring-gray-800' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Drawing Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{drawing.emoji}</div>
            <h1 className="text-4xl font-bold mb-2" style={{ color }}>
              How to Draw a Cute {drawing.name}!
            </h1>
            <p className="text-xl text-gray-600">Click to watch the video tutorial</p>
          </div>

          {/* Video Thumbnail with Play Button */}
          <button
            onClick={openVideo}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-6 group cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <img
                src={drawing.thumbnail}
                alt={`How to draw ${drawing.name}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                >
                  <Play className="w-12 h-12 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          </button>

          <div className="text-center mb-6">
            <a
              href={drawing.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-2xl font-bold text-xl text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              style={{ backgroundColor: color }}
            >
              🎨 Watch Video Tutorial
            </a>
          </div>

          {/* Drawing Selection Grid */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Choose What to Draw:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {drawings.map((d, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentDrawing(index);
                    setLiked(false);
                  }}
                  className={`p-6 rounded-2xl transition-all hover:scale-105 ${
                    currentDrawing === index
                      ? 'shadow-lg ring-4'
                      : 'bg-gray-100 hover:bg-gray-200 shadow'
                  }`}
                  style={currentDrawing === index ? { 
                    background: `linear-gradient(to bottom right, ${color}40, ${color}20)`,
                    borderColor: color,
                    borderWidth: '4px'
                  } : {}}
                >
                  <div className="text-5xl mb-2">{d.emoji}</div>
                  <div className="text-lg font-bold text-gray-800">{d.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Encouragement Message */}
          {liked && (
            <div className="mt-6 text-center p-6 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl">
              <p className="text-3xl font-bold text-gray-800 mb-2">
                🎉 You're doing great! 🎉
              </p>
              <p className="text-lg text-gray-700">
                Keep drawing and have fun!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}