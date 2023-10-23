import { Slots } from "../../models/interfaces";
import styles from "./Slots.module.scss";

interface Props {
  slots: Slots[];
  setConfetti?: (hasConfetti: boolean) => void;
}

export default function Slots(props: Props) {
  const { slots, setConfetti } = props;

  return (
    <>
      {slots.map((slot) => (
        <input
          className={styles.slot}
          key={slot.points}
          type="text"
          placeholder={slot.points.toString()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && setConfetti) {
              setConfetti(true);
              setTimeout(() => setConfetti(false), 2000);
            }
          }}
        />
      ))}
    </>
  );
}
