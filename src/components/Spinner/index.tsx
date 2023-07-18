import styles from "./styles.module.css";
import spinner  from '../../assets/spinner.gif';
export function Spinner() {
    return <div className={styles.wrapper}><img src={spinner} alt="spinner" /></div>
}