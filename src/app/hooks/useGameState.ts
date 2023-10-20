// src/app/hooks/useGameState.ts
import { useState, useEffect } from "react";
import { GameState } from "../models/interfaces";
import Pusher from "pusher-js";

// Initial static game ID for testing
const staticGameId = "test-game-id";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>({
    gameId: staticGameId,
    isRegistrationOpen: true,
    isGameActive: false,
    categories: [],
    teams: [],
  });

  useEffect(() => {
    if (!gameState) return; // Exit early if gameState is null

    const { gameId } = gameState; // Extract gameId from gameState

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    // Subscribe to a channel specific to the gameId
    const channel = pusher.subscribe(`game-${gameId}`);

    // Bind to the 'state-update' event
    channel.bind("state-update", (newGameState: GameState) => {
      console.log("Received state update:", newGameState);
      setGameState(newGameState);
    });

    // Cleanup: Unsubscribe from the channel when the component is unmounted
    return () => {
      pusher.unsubscribe(`game-${gameId}`);
    };
  }, [gameState]); // Depend on gameState so the effect reruns when gameState changes

  const updateGameState = async (newGameState: GameState) => {
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

  return { gameState, updateGameState, resetGame };
}
