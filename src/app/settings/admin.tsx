"use client";

import Link from "next/link";
import styles from "./page.module.scss";

interface Props {
  resetGame: () => void;
}

export function Admin(props: Props) {
  const { resetGame } = props;

  return (
    <>
      <div>
        <h3>Spillet er i gang!</h3>
      </div>
      <div>
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
