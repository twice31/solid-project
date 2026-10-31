import { createSignal, Show } from "solid-js";
import * as Toast from "@kobalte/core/toast";
import styles from "./AuthForm.module.css";
import { AuthService } from "./AuthService";
import type { AuthResponse } from "./AuthResponse";
import { useUserSession } from "./UserSessionContext";
import { hasApiErrors } from "../api/ApiResponse";

export function AuthForm() {
  const [login, setLogin] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [authResponse, setAuthResponse] = createSignal<AuthResponse | null>(null);
  
  const userSession = useUserSession();
  const authService = new AuthService();

  function showSuccessToast() {
    Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId} class={styles.toast}>
        <Toast.Title class={styles.toastTitle}>Вход выполнен</Toast.Title>
        <Toast.Description>Сервер вернул данные пользователя и токены.</Toast.Description>
        <Toast.CloseButton class={styles.toastCloseButton}>Закрыть</Toast.CloseButton>
      </Toast.Root>
    ));
  }

  function showErrorToast() {
    Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId} class={styles.toast}>
        <Toast.Title class={styles.toastTitle}>Не удалось выполнить вход</Toast.Title>
        <Toast.Description>Проверьте логин, пароль и доступность backend-сервиса.</Toast.Description>
        <Toast.CloseButton class={styles.toastCloseButton}>Закрыть</Toast.CloseButton>
      </Toast.Root>
    ));
  }

  async function handleSubmit() {
    try {
      const response = await authService.signIn(login(), password());
      setAuthResponse(response.value);
      
      if (!hasApiErrors(response)) {

        userSession.setSession({
          id: response.value.user.id as string,
          login: response.value.user.login as string,
          accessToken: response.value.token.accessToken as string,
          refreshToken: response.value.token.refreshToken as string,
        });
      }
      
      showSuccessToast();
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  }

  function handleReset() {
    setLogin("");
    setPassword("");
    setAuthResponse(null);
  }

  return (
    <>
      <div class={styles.contentCenterer}>
        <form class={styles.authForm}>
          <h3 class={styles.authFormTitle}>Авторизация</h3>
          <input
            type="text"
            class={styles.input}
            placeholder="Логин"
            value={login()}
            onInput={(event) => setLogin(event.currentTarget.value)}
          />
          <input
            type="password"
            class={styles.input}
            placeholder="Пароль"
            value={password()}
            onInput={(event) => setPassword(event.currentTarget.value)}
          />
          <section class={styles.buttonGroup}>
            <button type="button" class={styles.button} onClick={handleSubmit}>Войти</button>
            <button type="button" class={styles.button} onClick={handleReset}>Сбросить</button>
          </section>
        </form>
        
        <Show when={authResponse()}>
          {(response) => (
            <div class={styles.tokenInfo}>
              <p><strong>Access Token:</strong> {response().token.accessToken}</p>
              <p><strong>Refresh Token:</strong> {response().token.refreshToken}</p>
            </div>
          )}
        </Show>
      </div>

      <Toast.Region class={styles.toastRegion} aria-label="Уведомления">
        <Toast.List />
      </Toast.Region>
    </>
  );
}
