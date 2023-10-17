"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styles from "./page.module.scss";
import { Admin } from "./admin";
import { Category, GameState } from "../models/interfaces";
import { CategoryInput } from "./category";
import { useGameState } from "../utils/useGameState";

export default function Settings() {
  const options: number[] = [1, 2, 3, 4, 5];
  const [numOfCategories, setNumOfCategories] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const { gameState, updateGameState, resetGame } = useGameState();

  const handleNumberOfCategories = (event: any) => {
    setNumOfCategories(event.target.value);
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
    for (let i = 1; i <= numOfCategories; i++) {
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
    const filteredCategories = categories.filter(
      (category) => category.title.trim() !== ""
    );
    const newGameId = uuidv4();
    const updatedGameState: GameState = {
      gameId: newGameId,
      isRegistrationOpen: true, // Set isRegistrationOpen to false to start the game.
      categories: filteredCategories, // Update the categories as needed.
      teams: [],
      isGameActive: true,
    };

    updateGameState(updatedGameState);
  };

  return (
    <main>
      <h1>Innstillinger</h1>
      {!gameState?.isGameActive ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.subtitle}>
            Hvor mange kategorier?
            <select
              onChange={handleNumberOfCategories}
              id="select"
              value={numOfCategories}
              className={styles.form_field}
            >
              {options.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>
          {numOfCategories > 0 && renderCategories()}
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
