// src/app/api/gameState/route.ts
import { NextRequest, NextResponse } from "next/server";
import kvMock from "../../services/kvMock";
import pusher from "../../services/pusherConfig";
import { GameState } from "../../models/interfaces";

export async function GET(request: Request) {
  const gameState = await kvMock.get("gameState");
  if (gameState) {
    return NextResponse.json(gameState, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Game state not found" },
      { status: 404 }
    );
  }
}

export async function POST(req: NextRequest) {
  const newGameState: GameState | null = await req.json();
  if (!newGameState) {
    return NextResponse.json({ error: "Invalid game state" }, { status: 400 });
  }
  const { gameId } = newGameState; // Extract the gameId from the new game state

  await kvMock.set(`gameState-${gameId}`, newGameState); // Store the game state using a key that includes the gameId

  pusher.trigger(`game-${gameId}`, "state-update", newGameState); // Trigger a Pusher event on a channel specific to the gameId

  return NextResponse.json(
    { message: "Game state updated successfully" },
    { status: 200 }
  );
}
