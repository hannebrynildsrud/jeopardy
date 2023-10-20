"use client";

import Link from "next/link";
import styles from "./admin.module.scss";
import { useGameState } from "../hooks/useGameState";

interface Props {
  resetGame: () => void;
}

export function Admin(props: Props) {
  const { resetGame } = props;
  const { gameState } = useGameState();

  return (
    <>
      <div className={styles.top_container}>
        <h2>Registreringen er åpen!</h2>
        <div>
          <h3>Registerte lag</h3>
          {gameState?.teams.map((team, key) => (
            <p key={key}>{team.teamName}</p>
          ))}
        </div>
      </div>
      <div className={styles.button_container}>
        <button className={styles.reset} onClick={resetGame}>
          Nullstill spill
        </button>
        <button>
          <Link href="/"> Gå til spillet</Link>
        </button>
      </div>
    </>
  );
}
