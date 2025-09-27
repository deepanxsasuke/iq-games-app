// src/components/game/puzzles/PatternPuzzle.js
import React from 'react';

const PatternPuzzle = ({ puzzle }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Identify the Pattern</h3>
      <div className="flex justify-center space-x-4 text-3xl">
        {puzzle.pattern.map((item, index) => (
          <div key={index} className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg bg-white">
            {item}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-2">{puzzle.description}</p>
    </div>
  );
};

export default PatternPuzzle;