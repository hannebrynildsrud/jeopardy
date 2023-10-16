"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { Admin } from "./admin";
import { Category } from "../models/interfaces";
import { CategoryInput } from "./category";

export default function Settings() {
  const options: number[] = [1, 2, 3, 4, 5];
  const storedCategories =
    typeof window !== "undefined" && localStorage.getItem("categories");

  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isGameActive, setGameActive] = useState<boolean>(!!storedCategories);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleTitleChange = (index: number, title: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = {
      id: index,
      title,
      slots: [
        {
          points: "100",
          isActive: false,
          winner: "Some Winner",
        },
        { points: "200", isActive: false, winner: "Some Winner" },
        { points: "300", isActive: false, winner: "Some Winner" },
        { points: "400", isActive: false, winner: "Some Winner" },
      ],
      activeSlot: 0,
      isActive: false,
    };
    setCategories(updatedCategories);
  };

  const renderCategories = () => {
    const categoryInputs = [];
    for (let i = 1; i <= selectedOption; i++) {
      categoryInputs.push(
        <CategoryInput
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
    setGameActive(true);
  };

  const resetGame = () => {
    localStorage.removeItem("categories");
    setGameActive(false);
  };

  return (
    <main>
      <div>
        <h1>Innstillinger</h1>
        <p></p>
      </div>
      {!isGameActive ? (
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
          <button
            className={styles.button}
            type="submit"
            name="save_categories"
          >
            Start spillet
          </button>
        </form>
      ) : (
        <Admin resetGame={resetGame} />
      )}
    </main>
  );
}
