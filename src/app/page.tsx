"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Category } from "./settings/page";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

const config = {
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
  const [categories, setCategories] = useState<Category[]>();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setCategories(parsedCategories);
    }
  }, []);

  const renderCategories = () => {
    if (!categories) return null;

    const categoryElements = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const categoryInputs = [];

      for (let j = 100; j <= 400; j += 100) {
        categoryInputs.push(
          <>
            <input
              key={j}
              type="text"
              placeholder={j.toString()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setConfetti(true);
                  setTimeout(() => setConfetti(false), 2000);
                }
              }}
            />
          </>
        );
      }

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
        <Confetti active={confetti} config={config} />
        {renderCategories()}
      </div>
    </main>
  );
}
