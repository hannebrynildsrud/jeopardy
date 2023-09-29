import styles from "./page.module.scss";

interface Category {
  points: string;
  winner: string;
}

export default function Home() {
  const list: Category[] = [
    {
      points: "100",
      winner: "",
    },
    {
      points: "200",
      winner: "",
    },
    {
      points: "300",
      winner: "",
    },
    {
      points: "400",
      winner: "",
    },
  ];
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>Jeopardy</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <h2>Kategori</h2>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h2>Kategori</h2>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h2>Kategori</h2>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h2>Kategori</h2>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
      </div>
    </main>
  );
}
