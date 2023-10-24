"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./page.module.scss";
import { Admin } from "./admin/admin";
import { Category, Game, GameState } from "../models/interfaces";
import { useGameContext } from "../context/GameContext";
import { CategoryInput } from "../components/categoryInput/CategoryInput";

export default function Settings() {
  const options: number[] = [1, 2, 3, 4, 5];
  const [numOfCategories, setNumOfCategories] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authenticated, setAuthenticated] = useState(false);

  const { game, updateGameState, resetGame } = useGameContext();

  useEffect(() => {
    const isAuthenticated =
      typeof window !== "undefined" && localStorage.getItem("authenticated");
    const isAuthenticatedValue = isAuthenticated === "true";
    setAuthenticated(isAuthenticatedValue);

    if (!isAuthenticatedValue) {
      const password = prompt("Please enter your password:", "");
      if (password === "sjøpølse") {
        setAuthenticated(true);
        localStorage.setItem("authenticated", "true");
      } else {
        alert("Incorrect password.");
      }
    }
  }, []);

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
      {authenticated ? (
        <div>
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
        </div>
      ) : (
        <h1>Ikke autentisert</h1>
      )}
    </main>
  );
}
