"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { Category, GameState } from "./models/interfaces";
import { confettiConfig } from "./utils/confettiConfig";
import { useGameContext } from "./context/GameContext";
import Categories from "./components/categories/Categories";

export default function Game() {
  const { game, confetti } = useGameContext();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    game && setCategories(game?.categories);
  }, [game]);

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
          <Categories categories={categories} />
        )}
      </div>
    </main>
  );
}
