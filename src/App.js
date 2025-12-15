import React, { useState } from 'react';
import { Home, Palette, Heart, Shuffle } from 'lucide-react';

const drawings = [
  {
    name: "Ice Cream",
    emoji: "🍦",
    videoId: "uvhEoV_x2Ec"
  },
  {
    name: "Sun",
    emoji: "☀️",
    videoId: "_bpoPsour64"
  },
  {
    name: "Cat",
    emoji: "🐱",
    videoId: "1xx8zu4bUco"
  },
  {
    name: "Flower",
    emoji: "🌸",
    videoId: "6dS8MsPhap0"
  }
];

function App() {
  const [currentDrawing, setCurrentDrawing] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [color, setColor] = useState('#FF6B9D');

  const drawing = drawings[currentDrawing];

  const handleNewDrawing = () => {
    setCurrentDrawing((currentDrawing + 1) % drawings.length);
    setLiked(false);
  };

  const handleHome = () => {
    setShowHome(true);
    setLiked(false);
    setShowCustomize(false);
  };

  const selectDrawing = (index) => {
    setCurrentDrawing(index);
    setShowHome(false);
    setLiked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <div className={showHome ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto"}>
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
            onClick={() => setLiked(!liked)}
            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            title="Like"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-red-400'}`}
            />
          </button>
          {!showHome && (
            <button
              onClick={handleNewDrawing}
              className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
              title="Draw Something Else"
            >
              <Shuffle className="w-6 h-6 text-orange-600" />
            </button>
          )}
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

        {/* Home Grid View */}
        {showHome ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color }}>
                Learn to Draw with Nyla
              </h1>
              <p className="text-xl text-gray-600">Pick a video and follow along!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drawings.map((d, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-2xl">
                  <div className="text-center mb-4">
                    <span className="text-4xl mr-2">{d.emoji}</span>
                    <h2 className="inline text-2xl font-bold" style={{ color }}>
                      {d.name}
                    </h2>
                  </div>
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${d.videoId}?rel=0&modestbranding=1`}
                      title={`How to draw ${d.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <button
                    onClick={() => selectDrawing(index)}
                    className="mt-4 w-full py-3 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    style={{ backgroundColor: color }}
                  >
                    Watch Full Screen
                  </button>
                </div>
              ))}
            </div>

            {liked && (
              <div className="mt-6 text-center p-6 bg-white rounded-3xl shadow-2xl">
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  🎉 You're doing great! 🎉
                </p>
                <p className="text-lg text-gray-700">
                  Keep drawing and have fun!
                </p>
              </div>
            )}
          </>
        ) : (
          /* Single Video View */
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{drawing.emoji}</div>
              <h1 className="text-4xl font-bold mb-2" style={{ color }}>
                How to Draw a Cute {drawing.name}!
              </h1>
              <p className="text-xl text-gray-600">Watch and follow along!</p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-6" style={{ paddingBottom: '56.25%' }}>
              <iframe
                key={drawing.videoId}
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${drawing.videoId}?rel=0&modestbranding=1`}
                title={`How to draw ${drawing.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

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
        )}
      </div>
    </div>
  );
}

export default App;
