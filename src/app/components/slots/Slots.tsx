import classNames from "classnames";
import { Slots } from "../../models/interfaces";
import styles from "./Slots.module.scss";

interface Props {
  slots: Slots[];
}

export default function Slots(props: Props) {
  const { slots } = props;

  return (
    <>
      {slots.map((slot) => (
        <input
          disabled={true}
          className={classNames(
            styles.slot,
            slot.isActive && styles.active_slot
          )}
          key={slot.points}
          value={slot.winner?.teamName || ""}
          type="text"
          placeholder={slot.points.toString()}
        />
      ))}
    </>
  );
}
