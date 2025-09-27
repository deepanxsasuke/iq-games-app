// src/components/game/Timer.js
import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';

const Timer = () => {
  const { state } = useGame();
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (state.currentLevel > 0 && state.currentLevel <= 10) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [state.currentLevel]);

  useEffect(() => {
    setTime(0);
  }, [state.currentLevel]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-lg font-semibold text-gray-700">
      ⏱️ {formatTime(time)}
    </div>
  );
};

export default Timer;