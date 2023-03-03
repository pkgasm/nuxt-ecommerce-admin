import { defineStore } from "pinia";

export const useStore = defineStore("auth", {
  state: () => ({
    auth: {
      user: null,
      loggedIn: false,
    },
    screen: {
      mobile: false,
      desktop: false,
    },
  }),
});
