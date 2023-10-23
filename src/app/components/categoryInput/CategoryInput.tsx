"use client";

import styles from "./CategoryInput.module.scss";

interface Props {
  categoryIndex: number;
  onTitleChange: (title: string) => void;
}

export function CategoryInput(props: Props) {
  const { categoryIndex, onTitleChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    onTitleChange(newTitle);
  };

  return (
    <label className={styles.input_field}>
      {`Kategori ${categoryIndex}`}
      <input
        key={categoryIndex}
        className={styles.form_field}
        name={`category${categoryIndex}`}
        placeholder={`F.eks. hva spiser vi?`}
        type="text"
        onChange={handleChange}
      />
    </label>
  );
}
