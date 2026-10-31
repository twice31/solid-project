import styles from "./Sidebar.module.css";

type SidebarProps = {
  class: string;
};

export function Sidebar(props: SidebarProps) {
  return (
    <aside class={`${props.class} ${styles.container}`}>
      <nav class={styles.menuButtonsGroup}>
        <button class={styles.menuButton} type="button">
          Button 1
        </button>
        <button class={styles.menuButton} type="button">
          Button 2
        </button>
        <button class={styles.menuButton} type="button">
          Button 3
        </button>
      </nav>
    </aside>
  );
}
