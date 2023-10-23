"use client";

import Link from "next/link";
import styles from "./admin.module.scss";
import { useGameState } from "../hooks/useGameState";
import { Slots } from "../models/interfaces";
import { useGameContext } from "../context/GameContext";

interface Props {
  resetGame: () => void;
}

export function Admin(props: Props) {
  const { resetGame } = props;
  const { game } = useGameContext();

  const renderCategories = () => {
    if (!game?.categories) return null;

    const categoryElements = [];

    for (let i = 0; i < game?.categories.length; i++) {
      const category = game?.categories[i];
      const categoryInputs: JSX.Element[] = [];

      category.slots.forEach((slot: Slots) =>
        categoryInputs.push(
          <input
            key={slot.points}
            type="text"
            placeholder={slot.points}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     setConfetti(true);
            //     setTimeout(() => setConfetti(false), 2000);
            //   }
            // }}
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
    <>
      <div className={styles.top_container}>
        <h2>Registreringen er åpen!</h2>
        {game && renderCategories()}
      </div>
      <div className={styles.button_container}>
        <button className={styles.reset} onClick={resetGame}>
          Nullstill spill
        </button>
        <button>
          <Link href="/"> Start spillet</Link>
        </button>
      </div>
    </>
  );
}
