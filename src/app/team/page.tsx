"use client";

import { useState } from "react";
import styles from "./team.module.scss";
import Confetti from "react-dom-confetti";
import { config } from "../page";

export default function User() {
  const [isSubmitted, hasSubmittedTeam] = useState<boolean>(false);
  const [confetti, setConfetti] = useState(false);

  const submitLagnavn = () => {
    console.log("submit");
    setConfetti(true);
    hasSubmittedTeam(true);
  };

  return (
    <main className={styles.team_container}>
      <Confetti active={confetti} config={config} />
      {!isSubmitted ? (
        <>
          <h3>Registrer lag</h3>
          <input
            className={styles.input_field}
            placeholder="Skriv inn lagnavnet deres!"
          />
          <button className={styles.input_field} onClick={submitLagnavn}>
            Lagre navn
          </button>
        </>
      ) : (
        <h3>Vent på at spillet settes i gang</h3>
      )}
    </main>
  );
}
