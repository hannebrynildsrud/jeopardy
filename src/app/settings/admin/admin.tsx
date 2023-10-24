"use client";

import Link from "next/link";
import styles from "./admin.module.scss";
import { useGameContext } from "../../context/GameContext";
import Categories from "../../components/categories/Categories";

interface Props {
  resetGame: () => void;
}

export function Admin(props: Props) {
  const { resetGame } = props;

  const { game } = useGameContext();

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        {game && <Categories categories={game.categories} isAdmin={true} />}
      </div>
      <div className={styles.button_container}>
        <button className={styles.reset} onClick={resetGame}>
          Nullstill spill
        </button>
        <button>
          <Link href="/"> Start spillet</Link>
        </button>
      </div>
    </div>
  );
}
