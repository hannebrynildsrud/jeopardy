// useGameState.js

import { useState, useEffect } from "react";
import { GameState } from "../models/interfaces";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>();

  useEffect(() => {
    const loadedGameState = localStorage.getItem("gameState"); // Example: Using localStorage
    if (loadedGameState) {
      setGameState(JSON.parse(loadedGameState));
    }
  }, []);

  const updateGameState = (newGameState: GameState) => {
    // Update the game state in your database or storage here.

    localStorage.setItem("gameState", JSON.stringify(newGameState)); // Example: Using localStorage
    setGameState(newGameState);
  };

  const resetGame = () => {
    localStorage.removeItem("gameState");
    setGameState(null);
  };

  return { gameState, updateGameState, resetGame };
}
