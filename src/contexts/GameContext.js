// src/contexts/GameContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_LEVEL':
      return { ...state, currentLevel: action.payload };
    case 'UPDATE_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload };
    case 'SET_TIME_ELAPSED':
      return { ...state, timeElapsed: action.payload };
    case 'COMPLETE_LEVEL':
      const completedLevels = [...state.completedLevels, action.payload.level];
      const newScore = state.score + action.payload.points;
      return {
        ...state,
        completedLevels,
        score: newScore,
        currentLevel: state.currentLevel + 1,
        gameState: 'completed',
        timeElapsed: 0
      };
    case 'USE_HINT':
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    case 'RESET_GAME':
      return {
        ...initialState,
        user: state.user // Keep user info
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  currentLevel: 1,
  completedLevels: [],
  score: 0,
  gameState: 'idle', // 'idle', 'playing', 'completed', 'failed'
  timeElapsed: 0,
  hintsUsed: 0,
  startTime: null
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Load saved game state from localStorage
    const savedState = localStorage.getItem('iqGameState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Merge with initialState but preserve critical state
      dispatch({ type: 'SET_GAME_STATE', payload: { ...initialState, ...parsedState } });
    }
  }, []);

  useEffect(() => {
    // Save game state to localStorage
    localStorage.setItem('iqGameState', JSON.stringify(state));
  }, [state]);

  const completeLevel = (level, points) => {
    dispatch({ type: 'COMPLETE_LEVEL', payload: { level, points } });
  };

  const useHint = () => {
    dispatch({ type: 'USE_HINT' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const setLevel = (level) => {
    dispatch({ type: 'SET_CURRENT_LEVEL', payload: level });
  };

  const value = {
    state,
    dispatch,
    setCurrentLevel: setLevel,
    completeLevel,
    useHint,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};