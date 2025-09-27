// src/pages/Home.js
import React from 'react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { state } = useGame();
  const { user } = useAuth();

  // Create 10 levels
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const highestCompletedLevel = state.completedLevels.length > 0 
    ? Math.max(...state.completedLevels) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🧠 IQ Challenge Pro
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Test your intelligence with challenging puzzles and brain teasers
        </p>
        
        {user && (
          <div className="mt-4 p-6 bg-white rounded-lg shadow-lg inline-block">
            <p className="text-lg font-semibold">Current Score: <strong className="text-blue-600">{state.score}</strong></p>
            <p className="text-gray-600">Highest Level Completed: <strong>{highestCompletedLevel}</strong></p>
            <p className="text-gray-600">Levels Completed: {state.completedLevels.length}/10</p>
          </div>
        )}
      </div>

      {/* Play Button for Guests */}
      {!user && (
        <div className="text-center mb-8">
          <Link 
            to="/game" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Start Playing as Guest
          </Link>
          <p className="text-gray-500 mt-2">Or <Link to="/login" className="text-blue-500">login</Link> to save your progress</p>
        </div>
      )}

      {/* Levels Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Levels</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {levels.map(level => {
            const isCompleted = level <= highestCompletedLevel;
            const isUnlocked = level <= highestCompletedLevel + 1;
            
            return (
              <Link
                key={level}
                to={isUnlocked ? "/game" : "#"}
                onClick={(e) => {
                  if (!isUnlocked) e.preventDefault();
                  // Set the level in context when clicked
                }}
                className={`p-6 rounded-lg text-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 text-white shadow-lg transform hover:scale-110' 
                    : isUnlocked 
                    ? 'bg-blue-500 text-white shadow-lg transform hover:scale-110 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-2xl font-bold">{level}</div>
                {isCompleted && (
                  <div className="text-sm mt-1">✓ Completed</div>
                )}
                {!isUnlocked && (
                  <div className="text-sm mt-1">🔒 Locked</div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-semibold text-lg mb-2">Daily Challenge</h3>
          <p className="text-gray-600">Special puzzle refreshed every day with global leaderboard</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Monitor your IQ improvement over time with detailed analytics</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-semibold text-lg mb-2">Brain Training</h3>
          <p className="text-gray-600">Improve your cognitive skills with scientifically designed puzzles</p>
        </div>
      </div>

      {/* Quick Stats */}
      {user && (
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Your Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{state.score}</div>
              <div className="text-gray-500">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{state.completedLevels.length}</div>
              <div className="text-gray-500">Levels Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{state.hintsUsed}</div>
              <div className="text-gray-500">Hints Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{highestCompletedLevel}</div>
              <div className="text-gray-500">Highest Level</div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold mb-4">Ready to Challenge Your Mind?</h3>
        <Link 
          to={user ? "/game" : "/login"} 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105"
        >
          {user ? "Continue Playing" : "Start Your IQ Journey"}
        </Link>
      </div>
    </div>
  );
};

export default Home;