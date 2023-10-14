"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Category } from "./settings/page";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>();

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
          <input key={j} type="text" placeholder={j.toString()} />
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
      <div className={styles.container}>{renderCategories()}</div>
    </main>
  );
}
