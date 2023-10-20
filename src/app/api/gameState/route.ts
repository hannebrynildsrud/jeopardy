// src/app/api/gameState/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import pusher from "../../services/pusherConfig";
import { Game, GameState } from "../../models/interfaces";

import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const gameId = url.searchParams.get("id");

  if (!gameId) {
    return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
  }

  const gameState = await kv.get<GameState>(`gameState-${gameId}`);
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
  const newGameState: Game | null = await req.json();
  if (!newGameState) {
    return NextResponse.json({ error: "Invalid game state" }, { status: 400 });
  }
  const { gameId } = newGameState; // Extract the gameId from the new game state

  await kv.set(`game-${gameId}`, newGameState); // Store the game state using a key that includes the gameId

  pusher.trigger(`game-${gameId}`, "state-update", newGameState); // Trigger a Pusher event on a channel specific to the gameId

  return NextResponse.json(
    { message: "Game state updated successfully" },
    { status: 200 }
  );
}
