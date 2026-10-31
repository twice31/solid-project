import styles from "./Main.module.css";
import { AuthForm } from "../../auth/AuthForm";

type MainProps = {
  class: string;
};

export function Main(props: MainProps) {
  return (
    <main class={`${props.class} ${styles.container}`}>
      <AuthForm />
    </main>
  );
}
