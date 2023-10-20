// src/app/hooks/useGameState.ts
import { useState, useEffect } from "react";
import { Game, GameState } from "../models/interfaces";
import Pusher from "pusher-js";

export function useGameState() {
  const [game, setGameState] = useState<Game | null>(null);

  useEffect(() => {
    if (!game) return;

    const { gameId } = game;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    // Subscribe to a channel specific to the gameId
    const channel = pusher.subscribe(`game-${gameId}`);

    // Bind to the 'state-update' event
    channel.bind("state-update", (newGameState: Game) => {
      console.log("Received state update:", newGameState);
      setGameState(newGameState);
    });

    // Cleanup: Unsubscribe from the channel when the component is unmounted
    return () => {
      pusher.unsubscribe(`game-${gameId}`);
    };
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

  return { game, updateGameState, resetGame };
}
