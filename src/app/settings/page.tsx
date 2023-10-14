"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { Category } from "./category";

export interface Category {
  title: string;
}

export default function Settings() {
  const options: number[] = [1, 2, 3, 4, 5];
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleTitleChange = (index: number, title: string) => {
    // Create a copy of the categories array and update the title for the specific index
    const updatedCategories = [...categories];
    updatedCategories[index] = { title };
    setCategories(updatedCategories);
  };

  const renderCategories = () => {
    const categoryInputs = [];
    for (let i = 1; i <= selectedOption; i++) {
      categoryInputs.push(
        <Category
          key={i}
          categoryIndex={i}
          onTitleChange={(title: string) => handleTitleChange(i - 1, title)}
        />
      );
    }
    return categoryInputs;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const filteredCategories = categories.filter(
      (category) => category.title.trim() !== ""
    );
    localStorage.setItem("categories", JSON.stringify(filteredCategories));
  };

  return (
    <main>
      <div>
        <h1>Innstillinger</h1>
        <p>
          <Link href="/">Tilbake til spillet</Link>
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button className={styles.button} type="submit" name="save_categories">
          Lagre valg
        </button>
      </form>
    </main>
  );
}
