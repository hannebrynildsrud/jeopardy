"use client";

import { useState } from "react";
import styles from "./team.module.scss";
import { useGameContext } from "@/app/context/GameContext";

export default function User({ params }: { params: { gameId: string } }) {
  const [isSubmitted, hasSubmittedTeam] = useState<boolean>(false);
  const { game, updateGameState, resetGame } = useGameContext();

  const submitLagnavn = () => {
    hasSubmittedTeam(true);
  };

  return (
    <main className={styles.team_container}>
      {!isSubmitted ? (
        <>
          <h3>Registrer lag</h3>
          <input
            className={styles.input_field}
            placeholder="Skriv inn lagnavnet deres!"
          />
          <button
            className={styles.save_button}
            onClick={() => submitLagnavn()}
          >
            Lagre navn
          </button>
        </>
      ) : (
        <h3>Vent på at spillet settes i gang</h3>
      )}
    </main>
  );
}
