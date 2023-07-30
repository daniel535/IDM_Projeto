// GameContext.js
import React, { createContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameHistory, setGameHistory] = useState([]);

  return (
    <GameContext.Provider value={{ gameHistory, setGameHistory }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
