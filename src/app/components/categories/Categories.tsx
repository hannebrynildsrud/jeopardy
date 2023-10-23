import { Category } from "../../models/interfaces";
import styles from "./Categories.module.scss";
import AdminSlots from "../adminSlots/AdminSlots";
import Slots from "../slots/Slots";
import classNames from "classnames";

interface Props {
  categories: Category[];
  setConfetti?: (hasConfetti: boolean) => void;
  isAdmin?: boolean;
}

export default function Categories(props: Props) {
  const { categories, setConfetti, isAdmin } = props;

  return (
    <>
      {categories.map((category) => (
        <div className={styles.grid} key={category.title}>
          <h3
            className={classNames(category.isActive && styles.category_active)}
          >
            {category.title}
          </h3>
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
