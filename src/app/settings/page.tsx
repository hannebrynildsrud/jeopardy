"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useState } from "react";
import Category from "./category";

interface GameSettings {
  categories: Category[];
}

interface Category {
  title: string;
  numOfSongs: number;
}

export default function Settings() {
  const options: number[] = [1, 2, 3, 4, 5];
  const [selectedOption, setSelectedOption] = useState<number>(1);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const renderCategories = () => {
    const categories = [];
    for (let i = 1; i <= selectedOption; i++) {
      categories.push(<Category key={i} categoryIndex={i} />);
    }
    return categories;
  };

  return (
    <main>
      <div>
        <h1>Innstillinger</h1>
        <p>
          <Link href="/">Tilbake til spillet</Link>
        </p>
      </div>
      <form className={styles.form}>
        <label className={styles.subtitle}>
          Hvor mange kategorier?
          <select
            onChange={handleSelectChange}
            id="select"
            value={selectedOption}
            className={styles.form_field}
          >
            {options.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        {selectedOption > 0 && renderCategories()}
      </form>
    </main>
  );
}
