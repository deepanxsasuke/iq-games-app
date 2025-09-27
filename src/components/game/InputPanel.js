// src/components/game/InputPanel.js
import React from 'react';

const InputPanel = ({ puzzle, userAnswer, setUserAnswer, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default InputPanel;