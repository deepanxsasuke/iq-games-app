// src/components/game/puzzles/SequencePuzzle.js
import React from 'react';

const SequencePuzzle = ({ puzzle }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Complete the Sequence</h3>
      <div className="flex justify-center items-center space-x-4 text-2xl font-mono">
        {puzzle.sequence.map((item, index) => (
          <span key={index} className="p-3 bg-white border-2 border-gray-300 rounded-lg min-w-[50px]">
            {item === '?' ? '?' : item}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-2">{puzzle.description}</p>
    </div>
  );
};

export default SequencePuzzle;