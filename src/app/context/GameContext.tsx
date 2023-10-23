"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../models/interfaces";
import Pusher from "pusher-js";

const GameContext = createContext<GameContextType | undefined>(undefined);
const gameId = "STATIC_GAME_ID";
interface GameContextType {
  game: Game | null;
  confetti: boolean;
  enableConfetti: (isConfetti: boolean) => void;
  updateGameState: (newGameState: Game) => void;
  resetGame: () => void;
}

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGameState] = useState<Game | null>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    const channel = pusher.subscribe(`game-${gameId}`); // Adjust this to your channel name

    const handleStateUpdate = (newGameState: Game) => {
      console.log("Received state update:", newGameState);
      setGameState(newGameState);
    };

    channel.bind("state-update", handleStateUpdate);

    return () => {
      channel.unbind("state-update", handleStateUpdate);
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

  const enableConfetti = (isConfetti: boolean) => {
    setConfetti(isConfetti);
  };

  const resetGame = () => {
    setGameState(null);
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
