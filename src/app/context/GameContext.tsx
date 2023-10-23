"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../models/interfaces";
import Pusher from "pusher-js";

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameContextType {
  game: Game | null;
  updateGameState: (newGameState: Game) => void;
  resetGame: () => void;
}

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGameState] = useState<Game | null>(null);

  useEffect(() => {
    if (game) {
      const { gameId } = game;

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
      });

      const channel = pusher.subscribe(`game-${gameId}`);

      channel.bind("state-update", (newGameState: Game) => {
        console.log("Received state update:", newGameState);
        setGameState(newGameState);
      });

      return () => {
        pusher.unsubscribe(`game-${gameId}`);
      };
    }
  }, [game]);

  const updateGameState = async (newGameState: Game) => {
    console.log("Updating game state:", newGameState);
    setGameState(newGameState);

    await fetch("/api/gameState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGameState),
    });
  };

  const resetGame = () => {
    setGameState(null);
  };

  const value = { game, updateGameState, resetGame };

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
