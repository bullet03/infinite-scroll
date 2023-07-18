import { Comment } from "../../@types";
import styles from "./styles.module.css";

function List({ singleEl }: {singleEl: Comment}) {
  return <li className={styles.card}>{`${singleEl.id} -  ${singleEl.email}`}</li>;
}

export { List };
