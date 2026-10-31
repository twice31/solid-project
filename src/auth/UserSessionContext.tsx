import { createContext, createSignal, ParentProps, useContext } from "solid-js";

export type UserSessionInfo = {
  id: string | undefined;
  login: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export type UserSessionInfoReactive = {
  session: () => UserSessionInfo;
  setSession: (session: UserSessionInfo) => void;
};

function defaultUserSession(): UserSessionInfo {
  return {
    accessToken: undefined,
    id: undefined,
    login: undefined,
    refreshToken: undefined,
  };
}

export const UserSessionContext = createContext<UserSessionInfoReactive>({
  session: () => defaultUserSession(),
  setSession: () => {},
});

export function UserSessionContextWrapper(props: ParentProps) {
  const [session, setSession] = createSignal(defaultUserSession());
  
  const contextValue = {
    session: session,
    setSession: setSession,
  };

  return (
    <UserSessionContext value={contextValue}>
      {props.children}
    </UserSessionContext>
  );
}

export function useUserSession() {
  return useContext(UserSessionContext);
}
