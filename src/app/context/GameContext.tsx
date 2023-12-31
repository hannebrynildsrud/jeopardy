"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Game, GameState } from "../models/interfaces";
import Pusher from "pusher-js";

const GameContext = createContext<GameContextType | undefined>(undefined);
const gameId = "STATIC_GAME_ID";
interface GameContextType {
  game: Game | null;
  confetti: boolean;
  enableConfetti: () => void;
  updateGameState: (newGameState: Game) => void;
  resetGame: () => void;
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
});

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGameState] = useState<Game | null>(null);
  const [confetti, setConfetti] = useState(false);

  console.log(confetti);

  useEffect(() => {
    const channel = pusher.subscribe(`game-${gameId}`);

    const fetchInitialState = async () => {
      try {
        const response = await fetch(`/api/gameState?id=${gameId}`);
        if (!response.ok) {
          console.error(
            `Failed to fetch initial game state: ${response.statusText}`
          );
          return;
        }
        const initialGameState: Game = await response.json();
        setGameState(initialGameState);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialState(); // Call the async function

    const handleStateUpdate = (newGameState: Game) => {
      console.log("Received state update:", newGameState);
      setGameState(newGameState);
    };

    channel.bind("state-update", handleStateUpdate);

    return () => {
      pusher.unsubscribe(`game-${gameId}`); // Adjust this to your channel name
    };
  }, []);

  const updateGameState = async (newGameState: Game) => {
    console.log("Updating game state:", newGameState);
    try {
      const response = await fetch("/api/gameState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGameState),
      });
      if (!response.ok) {
        throw new Error(`Failed to update game state: ${response.statusText}`);
      }
      setGameState(newGameState);
    } catch (error) {
      console.error(error);
    }
  };

  const enableConfetti = () => {
    setConfetti(!confetti);
  };

  const resetGame = async () => {
    const emptyGameState: Game = {
      gameId: gameId, // reuse the existing game ID or generate a new one if desired
      gameState: GameState.GAME_SETUP, // or whatever your initial state should be
      categories: [],
      teams: [],
    };

    try {
      const response = await fetch("/api/gameState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emptyGameState),
      });
      localStorage.removeItem("authenticated");
      if (!response.ok) {
        throw new Error(`Failed to reset game state: ${response.statusText}`);
      }
      setGameState(emptyGameState);
    } catch (error) {
      console.error(error);
    }
  };

  const value = { game, updateGameState, resetGame, enableConfetti, confetti };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGameContext };
