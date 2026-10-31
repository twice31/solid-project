import * as DropdownMenu from "@kobalte/core/dropdown-menu";
import { useUserSession } from "../../auth/UserSessionContext";
import styles from "./Header.module.css";

type HeaderProps = {
  class: string;
};

export function Header(props: HeaderProps) {
  const userSession = useUserSession();
  
  const avatarLetter = () => {
    const login = userSession.session().login;
    return login ? login.charAt(0).toUpperCase() : "U";
  };

  const displayLogin = () => userSession.session().login || "";

  return (
    <header class={`${props.class} ${styles.container}`}>
      <div class={styles.orgContainer}>
        <img
          class={styles.orgLogo}
          src="/assets/logo.svg"
          alt="Логотип Forestry Department Service"
        />
        <p class={styles.orgName}>Forestry Department Service</p>
      </div>

      <input
        class={styles.headerSearchInput}
        type="search"
        placeholder="Поиск..."
        aria-label="Поиск"
      />

      <DropdownMenu.Root>
        <div style={{ display: "flex", "align-items": "center", gap: "1rem", "justify-self": "end" }}>
          {}
          <span style={{ "font-size": "0.9rem", "font-weight": "600", color: "#ffffff" }}>{displayLogin()}</span>
          
          <DropdownMenu.Trigger
            class={styles.userMenuTrigger}
            type="button"
            aria-label="Открыть меню пользователя"
          >
            <span class={styles.avatarPlaceholder} aria-hidden="true">
              {avatarLetter()}
            </span>
          </DropdownMenu.Trigger>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content class={styles.userMenuContent}>
            <DropdownMenu.Item class={styles.userMenuItem}>
              Настройки
            </DropdownMenu.Item>
            <DropdownMenu.Separator class={styles.userMenuSeparator} />
            <DropdownMenu.Item class={styles.userMenuItem}>
              Выйти
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
