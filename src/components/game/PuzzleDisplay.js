// src/components/game/PuzzleDisplay.js
import React from 'react';
import SequencePuzzle from './puzzles/SequencePuzzle';
import PatternPuzzle from './puzzles/PatternPuzzle';

const PuzzleDisplay = ({ puzzle }) => {
  if (!puzzle) return null;

  const renderPuzzle = () => {
    switch (puzzle.type) {
      case 'sequence':
        return <SequencePuzzle puzzle={puzzle} />;
      case 'pattern':
        return <PatternPuzzle puzzle={puzzle} />;
      case 'logic':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Logic Puzzle</h3>
            <p className="text-lg mb-4">{puzzle.question}</p>
          </div>
        );
      case 'math':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Math Challenge</h3>
            <p className="text-lg mb-4">{puzzle.question}</p>
          </div>
        );
      case 'spatial':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Spatial Reasoning</h3>
            <p className="text-lg mb-4">{puzzle.question}</p>
          </div>
        );
      default:
        return <SequencePuzzle puzzle={puzzle} />;
    }
  };

  return (
    <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
      {renderPuzzle()}
    </div>
  );
};

export default PuzzleDisplay;