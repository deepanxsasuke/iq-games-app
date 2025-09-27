// src/components/game/HintSystem.js
import React, { useState } from 'react';

const HintSystem = ({ puzzle, useHint }) => {
  const [hintsUsed, setHintsUsed] = useState(0);

  const handleUseHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1);
      useHint(); // This is a regular function, not a hook
      // Implement hint logic based on puzzle type
      alert(`Hint ${hintsUsed + 1}: ${getHint(puzzle, hintsUsed + 1)}`);
    }
  };

  const getHint = (puzzle, hintLevel) => {
    switch (puzzle.type) {
      case 'sequence':
        if (hintLevel === 1) return `This is a ${puzzle.description}`;
        if (hintLevel === 2) return `Look at the difference between numbers`;
        return `The answer might be ${puzzle.answer}`;
      case 'pattern':
        if (hintLevel === 1) return 'Observe the sequence of shapes';
        if (hintLevel === 2) return 'Look for alternating patterns';
        return `The next element should be ${puzzle.answer}`;
      case 'logic':
        if (hintLevel === 1) return 'Read the question carefully';
        if (hintLevel === 2) return 'Think step by step';
        return `The answer is ${puzzle.answer}`;
      case 'math':
        if (hintLevel === 1) return 'Remember order of operations';
        if (hintLevel === 2) return 'Break it down into smaller parts';
        return `The solution is ${puzzle.answer}`;
      case 'spatial':
        if (hintLevel === 1) return 'Visualize the shapes in 3D';
        if (hintLevel === 2) return 'Count systematically';
        return `There are ${puzzle.answer} elements`;
      default:
        return 'Think about the pattern or relationship';
    }
  };

  return (
    <div>
      <button
        onClick={handleUseHint}
        disabled={hintsUsed >= 3}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        💡 Hint ({3 - hintsUsed} left)
      </button>
    </div>
  );
};

export default HintSystem;