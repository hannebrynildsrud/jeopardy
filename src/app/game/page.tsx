import Link from "next/link";
import styles from "./page.module.scss";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"] });

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
    <main>
      <Link className={styles.settings} href="/settings">
        ADMIN
      </Link>
      <div className={styles.description}>
        <h1 className={styles.title}>Jeopardy</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <h3>Hva spiser vi? 🍔</h3>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h3>Hvilken film/serie? 🎬</h3>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h3>Hvilket russekull? 🎉</h3>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h3>Hvor skal vi? ✈️</h3>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
        <div className={styles.grid}>
          <h3>Hvilket UKE-arrangement?</h3>
          {list.map((item, index) => (
            <input key={index} placeholder={item.points} />
          ))}
        </div>
      </div>
    </main>
  );
}
