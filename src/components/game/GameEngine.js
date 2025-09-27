// src/components/game/GameEngine.js
import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { generatePuzzle } from '../../utils/gameEngine';
import Timer from './Timer';
import HintSystem from './HintSystem';
import PuzzleDisplay from './PuzzleDisplay';
import InputPanel from './InputPanel';

const GameEngine = () => {
  const { state, completeLevel, useHint } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [levelPoints, setLevelPoints] = useState(0);

  // Initialize game when component mounts
  useEffect(() => {
    if (state.currentLevel > 10) {
      // All levels completed
      navigate('/');
      return;
    }

    const puzzle = generatePuzzle(state.currentLevel);
    setCurrentPuzzle(puzzle);
    setUserAnswer('');
    setFeedback('');
    setShowLevelComplete(false);
  }, [state.currentLevel, navigate]);

  const checkAnswer = useCallback((answer) => {
    if (!currentPuzzle) return false;
    
    // Normalize answers for comparison
    const normalizedUserAnswer = answer.toString().trim().toLowerCase();
    const normalizedCorrectAnswer = currentPuzzle.answer.toString().trim().toLowerCase();
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    if (isCorrect) {
      // Calculate points: base + level bonus + time bonus
      const basePoints = 100;
      const levelBonus = state.currentLevel * 20;
      const timeBonus = Math.max(300 - state.timeElapsed, 0) * 0.5;
      const points = Math.floor(basePoints + levelBonus + timeBonus);
      
      setLevelPoints(points);
      setShowLevelComplete(true);
      
      // Wait a moment before progressing to next level
      setTimeout(() => {
        completeLevel(state.currentLevel, points);
        setShowLevelComplete(false);
      }, 2000);
      
      setFeedback('✅ Correct! Excellent thinking!');
    } else {
      setFeedback('❌ Incorrect. Try again!');
    }
    
    return isCorrect;
  }, [currentPuzzle, state.timeElapsed, state.currentLevel, completeLevel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === '') {
      setFeedback('⚠️ Please enter an answer');
      return;
    }
    checkAnswer(userAnswer);
  };

  const skipLevel = () => {
    setFeedback('⏭️ Level skipped. Moving to next level...');
    setTimeout(() => {
      completeLevel(state.currentLevel, 0);
    }, 1000);
  };

  const exitGame = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be saved.')) {
      navigate('/');
    }
  };

  if (state.currentLevel > 10) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
          <p className="text-xl mb-4">You've completed all 10 levels!</p>
          <p className="text-2xl font-bold mb-6">Final Score: <span className="text-blue-600">{state.score}</span></p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentPuzzle) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Level Complete Overlay */}
      {showLevelComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center animate-bounce">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Level Complete! 🎉</h2>
            <p className="text-xl mb-2">+{levelPoints} points!</p>
            <p className="text-lg">Preparing next level...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
        {/* Game Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              Level {state.currentLevel} of 10
            </h2>
            <p className="text-gray-600">
              Score: <span className="font-semibold">{state.score}</span> | 
              Completed: <span className="font-semibold">{state.completedLevels.length}</span>/10
            </p>
            {user && (
              <p className="text-sm text-gray-500">Playing as: {user.name}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Timer />
            <HintSystem puzzle={currentPuzzle} useHint={useHint} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(state.currentLevel - 1) * 10}%` }}
          ></div>
        </div>

        {/* Puzzle Display */}
        <PuzzleDisplay puzzle={currentPuzzle} />

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-lg mb-4 text-center font-semibold ${
            feedback.includes('Correct') ? 'bg-green-100 text-green-800 border border-green-200' : 
            feedback.includes('skipped') ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {feedback}
          </div>
        )}

        {/* Input Panel */}
        <InputPanel
          puzzle={currentPuzzle}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={handleSubmit}
        />

        {/* Game Controls */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={exitGame}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            ← Exit Game
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => setUserAnswer('')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Clear
            </button>
            
            <button
              onClick={skipLevel}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Skip Level
            </button>
          </div>
        </div>

        {/* Puzzle Type Indicator */}
        <div className="mt-4 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
            {currentPuzzle.type} puzzle
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
            Difficulty: {state.currentLevel}/10
          </span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h3>
        <p className="text-blue-700 text-sm">
          {currentPuzzle.type === 'sequence' && 'Look for mathematical patterns or alphabetical sequences.'}
          {currentPuzzle.type === 'pattern' && 'Observe the visual pattern and identify what comes next.'}
          {currentPuzzle.type === 'logic' && 'Think step by step and eliminate impossible options.'}
          {currentPuzzle.type === 'math' && 'Break down the problem into smaller, manageable parts.'}
          {currentPuzzle.type === 'spatial' && 'Visualize the shapes and their relationships in 3D space.'}
        </p>
      </div>
    </div>
  );
};

export default GameEngine;