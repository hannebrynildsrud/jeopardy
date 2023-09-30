"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useState } from "react";

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

  const renderCategoryFields = () => {
    const inputFields = [];
    for (let i = 0; i < selectedOption; i++) {
      inputFields.push(
        <div className={styles.category_field}>
          <label className={styles.input_field}>
            {`Kategorinavn ${i + 1}`}
            <input
              key={i}
              className={styles.form_field}
              name={`Category${i + 1}`}
              placeholder={`F.eks. hva spiser vi?`}
              type="text"
            />
          </label>
          <label className={styles.input_field}>
            Antall sanger
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
            </select>{" "}
          </label>
        </div>
      );
    }
    return inputFields;
  };

  return (
    <main className={styles.main}>
      <h1>Innstillinger</h1>
      <h2>
        <Link href="/game">Tilbake til spillet</Link>
      </h2>
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
        {}
        {selectedOption > 0 && renderCategoryFields()}
      </form>
    </main>
  );
}
