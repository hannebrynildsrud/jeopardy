"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useState } from "react";

interface Category {
  title: string;
  numOfSongs: number;
}

interface Props {
  categoryIndex: number;
}

export default function Category(props: Props) {
  const { categoryIndex } = props;
  const options: number[] = [1, 2, 3, 4, 5];
  const [numOfSongs, setNumOfSongs] = useState<number>(1);

  const handleSelectChange = (event: any) => {
    setNumOfSongs(event.target.value);
  };

  return (
    <div className={styles.category_field}>
      <label className={styles.input_field}>
        {`Kategori ${categoryIndex}`}
        <input
          key={categoryIndex}
          className={styles.form_field}
          name={`Category${categoryIndex}`}
          placeholder={`F.eks. hva spiser vi?`}
          type="text"
        />
      </label>
      <label className={styles.input_field}>
        Antall sanger
        <select
          onChange={handleSelectChange}
          id="select"
          value={numOfSongs}
          className={styles.form_field}
        >
          {options.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
