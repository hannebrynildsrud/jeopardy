"use client";

import { useState } from "react";
import styles from "./team.module.scss";
import Confetti from "react-dom-confetti";
import { useGameState } from "../../hooks/useGameState";
import { confettiConfig } from "../../utils/confettiConfig";
import { useRouter } from "next/router";

export default function User({ params }: { params: { gameId: string } }) {
  const [isSubmitted, hasSubmittedTeam] = useState<boolean>(false);
  const [confetti, setConfetti] = useState(false);
  const { game } = useGameState();

  console.log(params);
  const submitLagnavn = () => {
    setConfetti(true);
    hasSubmittedTeam(true);
  };

  return (
    <main className={styles.team_container}>
      <Confetti active={confetti} config={confettiConfig} />
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
