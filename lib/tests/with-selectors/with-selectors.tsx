import { Counter } from "./counter";
import styles from "../demo.module.scss";
import { CounterWithoutSelectors } from "./counter-without-selectors";
import { Header } from "./header";
import { UserData } from "./user-data";

export function WithSelector() {
  return (
    <div className={styles.preview}>
      <Header />
      <div className={styles.flex}>
        <Counter />
        <CounterWithoutSelectors />
        <UserData />
      </div>
    </div>
  );
}
