"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useState } from "react";
import Confetti from "react-dom-confetti";
import { GameState } from "./models/interfaces";
import { confettiConfig } from "./utils/confettiConfig";
import { useGameContext } from "./context/GameContext";
import Categories from "./components/categories/Categories";

export default function Game() {
  const [confetti, setConfetti] = useState(false);
  const { game } = useGameContext();

  return (
    <main>
      <Link className={styles.settings} href="/settings">
        ADMIN
      </Link>
      <h1 className={styles.title}>Jeopardy</h1>
      <p className={styles.subtitle}>...with a lil twist ;)</p>
      <div className={styles.container}>
        <Confetti active={confetti} config={confettiConfig} />
        {game?.gameState === GameState.TEAM_REGISTRATION && (
          <Categories setConfetti={setConfetti} categories={game.categories} />
        )}
      </div>
    </main>
  );
}
