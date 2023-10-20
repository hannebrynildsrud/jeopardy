"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { Category, Slots } from "./models/interfaces";
import { useGameState } from "./hooks/useGameState";
import { QRCodeSVG } from "qrcode.react";

export const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export default function Game() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [confetti, setConfetti] = useState(false);
  const { gameState } = useGameState();

  useEffect(() => {
    if (gameState) {
      setCategories(gameState.categories);
    }
  }, [gameState]);

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
        {gameState?.isGameActive &&
          !gameState.isRegistrationOpen &&
          renderCategories()}
        {gameState?.isRegistrationOpen && (
          <div className={styles.qr_code_container}>
            <h3>Registreringen er åpen!</h3>{" "}
            {gameState.gameId && (
              <QRCodeSVG
                value={`https://jeopardy-sigma.vercel.app/team/${gameState.gameId}`}
                className={styles.qr_code}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
