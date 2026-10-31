import type { Component } from "solid-js";
import { Header } from "./ui/header/Header";
import { Sidebar } from "./ui/sidebar/Sidebar";
import { Footer } from "./ui/footer/Footer";
import { Main } from "./ui/main/Main";
import { UserSessionContextWrapper } from "./auth/UserSessionContext";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <UserSessionContextWrapper>
      <section class={styles.layout}>
        <Header class={styles.header} />
        <Sidebar class={styles.sidebar} />
        <Main class={styles.main} />
        <Footer class={styles.footer} />
      </section>
    </UserSessionContextWrapper>
  );
};

export default App;
