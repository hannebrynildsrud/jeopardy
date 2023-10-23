"use client";

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react"; // Import useEffect
import styles from "./page.module.scss";
import { Admin } from "./admin/admin";
import { Category, Game, GameState } from "../models/interfaces";
import { useGameContext } from "../context/GameContext";
import { CategoryInput } from "../components/categoryInput/CategoryInput";

export default function Settings() {
  const options: number[] = [1, 2, 3, 4, 5];
  const [numOfCategories, setNumOfCategories] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  // Perform localStorage action
  const isAuthenticated =
    typeof window !== "undefined" && localStorage.getItem("authenticated");

  const [authenticated, setAuthenticated] = useState(
    isAuthenticated === "true" // Check local storage for authentication state
  );

  const { game, updateGameState, resetGame } = useGameContext();

  useEffect(() => {
    if (!authenticated) {
      // Only show prompt if not already authenticated
      const password = prompt("Please enter your password:", "");
      if (password === "sjøpølse") {
        setAuthenticated(true);
        localStorage.setItem("authenticated", "true"); // Set local storage on correct password
      } else {
        alert("Incorrect password.");
      }
    }
  }, [authenticated]); // Depend on authenticated state

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
          points: 100,
          isActive: false,
          winner: null,
        },
        { points: 200, isActive: false, winner: null },
        { points: 300, isActive: false, winner: null },
        { points: 400, isActive: false, winner: null },
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
    e.preventDefault();
    const filteredCategories = categories.filter(
      (category) => category.title.trim() !== ""
    );
    // const newGameId = uuidv4();
    const newGameId = "STATIC_GAME_ID";
    const updatedGameState: Game = {
      gameId: newGameId,
      gameState: GameState.TEAM_REGISTRATION,
      categories: filteredCategories,
      teams: [],
    };
    updateGameState(updatedGameState);
  };

  return (
    <main>
      {authenticated ? ( // Render content only if authenticated
        <>
          <h1>Innstillinger</h1>
          {game?.gameState === GameState.GAME_SETUP ? (
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
                className={styles.game_button}
                type="submit"
                name="save_categories"
              >
                Åpne registrering
              </button>
            </form>
          ) : (
            <Admin resetGame={resetGame} />
          )}
        </>
      ) : null}
    </main>
  );
}
