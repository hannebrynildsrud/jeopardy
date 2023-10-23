import { Category } from "../../models/interfaces";
import styles from "./Categories.module.scss";
import AdminSlots from "../adminSlots/AdminSlots";
import Slots from "../slots/Slots";

interface Props {
  categories: Category[];
  setConfetti?: (hasConfetti: boolean) => void;
  isAdmin?: boolean;
}

export default function Categories(props: Props) {
  const { categories, setConfetti, isAdmin } = props;

  console.log(categories);
  return (
    <>
      {categories.map((category) => (
        <div className={styles.grid} key={category.title}>
          <h3>{category.title}</h3>
          {!isAdmin ? (
            <Slots setConfetti={setConfetti} slots={category.slots} />
          ) : (
            <div className={styles.slots}>
              <AdminSlots slots={category.slots} category={category} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
