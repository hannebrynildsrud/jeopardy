"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { Category, GameState, Slots } from "./models/interfaces";
import { QRCodeSVG } from "qrcode.react";
import { confettiConfig } from "./utils/confettiConfig";
import { useGameContext } from "./context/GameContext";

export default function Game() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [confetti, setConfetti] = useState(false);
  const { game, updateGameState, resetGame } = useGameContext();

  useEffect(() => {
    if (game) {
      setCategories(game.categories);
    }
  }, [game]);

  const renderCategories = () => {
    if (!categories) return null;

    const categoryElements = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const categoryInputs: JSX.Element[] = [];

      category.slots.forEach((slot: Slots) =>
        categoryInputs.push(
          <input
            key={slot.points}
            type="text"
            placeholder={slot.points}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);
              }
            }}
          />
        )
      );

      categoryElements.push(
        <div className={styles.grid} key={i}>
          <h3>{category.title}</h3>
          {categoryInputs}
        </div>
      );
    }
    return categoryElements;
  };

  return (
    <main>
      <Link className={styles.settings} href="/settings">
        ADMIN
      </Link>
      <h1 className={styles.title}>Jeopardy</h1>
      <p className={styles.subtitle}>...with a lil twist ;)</p>
      <div className={styles.container}>
        <Confetti active={confetti} config={confettiConfig} />
        {game?.gameState === GameState.TEAM_REGISTRATION && renderCategories()}
        {/* { (
          <div className={styles.qr_code_container}>
            <h3>Registreringen er åpen!</h3>{" "}
            {game.gameId && (
              <QRCodeSVG
                value={`${process.env.NEXT_PUBLIC_URL}/team/${game.gameId}`}
                className={styles.qr_code}
              />
            )}
          </div>
        )} */}
      </div>
    </main>
  );
}
