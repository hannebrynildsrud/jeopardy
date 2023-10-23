import { useState } from "react";
import { useGameContext } from "../../context/GameContext";
import { Category, Slots, Team } from "../../models/interfaces";
import styles from "./AdminSlots.module.scss";

interface Props {
  slots: Slots[];
  category: Category;
}

export default function AdminSlots(props: Props) {
  const { slots, category } = props;
  const [winner, setWinner] = useState<string>("");
  const { game, updateGameState } = useGameContext();

  const updateActiveCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category,
    slot: Slots
  ) => {
    if (game) {
      const updatedGame = { ...game };
      const updatedCategory = updatedGame.categories?.find(
        (c) => c.id === category.id
      );

      if (updatedCategory) {
        updatedCategory.isActive = true;
        updatedCategory.activeSlot = slot.points;
        const updatedSlot = updatedCategory.slots.find(
          (s) => s.points === slot.points
        );

        if (updatedSlot) updatedSlot.isActive = true;
      }
      if (game?.gameId) {
        updateGameState(updatedGame);
      }
    }
  };

  const updateWinner = (
    category: Category,
    slot: Slots,
    winner: Team | null
  ) => {
    if (game) {
      const updatedGame = { ...game };
      if (updatedGame) {
        const updatedCategory = updatedGame.categories?.find(
          (c) => c.id === category.id
        );

        if (updatedCategory) {
          const updatedSlot = updatedCategory.slots.find(
            (s) => s.points === slot.points
          );
          if (updatedSlot) {
            updatedSlot.winner = winner;
          }
        }
      }
      updateGameState(updatedGame);
    }
  };

  return (
    <>
      {slots.map((slot) => (
        <div
          className={styles.input_radio}
          key={`${category.title}_${slot.points}`}
        >
          <label htmlFor={`${category.title}_${slot.points}`}>
            <input
              type="radio"
              id={`${category.title}_${slot.points}`}
              name={category.title}
              value={`${category.title}_${slot.points}`}
              onChange={(e) => updateActiveCategory(e, category, slot)}
            />
            Aktiv
          </label>
          <input
            key={slot.points}
            disabled={category.activeSlot !== slot.points}
            type="text"
            placeholder="Skriv inn vinner..."
            onChange={(e) => setWinner(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateWinner(category, slot, {
                  teamName: winner,
                  score: slot.points,
                });
              }
            }}
          />
        </div>
      ))}
    </>
  );
}
