import Auth from "~/services/auth";
import { useStore } from "~/store";

export const useAuth = () => {
  const store = useStore();
  const nuxtApp = useNuxtApp();

  const config = {
    reactiveState: {
      user: {
        set: (value) => {
          store.auth.user = value;
        },
        get: () => {
          return store.auth.user;
        },
      },
      loggedIn: {
        set: (value) => {
          store.auth.loggedIn = value;
        },
        get: () => {
          return store.auth.loggedIn;
        },
      },
    },
  };

  const authService = new Auth(nuxtApp.$config.public.API_URL, config);
  return authService;
};
