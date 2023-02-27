<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon icon="mdi-menu"></v-icon>
      </v-app-bar-nav-icon>

      <v-app-bar-title>
        <nuxt-link class="client__link" to="/"> Administrador </nuxt-link>
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="primary">
      <v-list>
        <v-list-item v-for="m of menu" :value="m.link" :to="m.link">
          <template v-slot:prepend>
            <v-icon :icon="m.icon"></v-icon>
          </template>
          <v-list-item-title>{{ m.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="auth.loggedIn" value="salir" @click="logout">
          <template v-slot:prepend>
            <v-icon icon="mdi-exit-to-app"></v-icon>
          </template>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
<script setup>
const admin = [
  {
    title: "Pedidos",
    icon: "mdi-archive",
    link: "/pedidos",
  },
  {
    title: "Productos",
    icon: "mdi-shopping",
    link: "/productos",
  },
  {
    title: "Categorías",
    icon: "mdi-shape",
    link: "/categorias",
  },
  {
    title: "Media Library",
    icon: "mdi-file-multiple",
    link: "/media",
  },
];
const guest = [
  {
    title: "Inicia sesión",
    icon: "mdi-account",
    link: "/login",
  },
];

const nuxtApp = useNuxtApp();
const auth = useAuth();

const drawer = useState("drawer", () => null);
const menu = useState("menu", () => []);

watch(
  () => auth.loggedIn,
  () => {
    selectMenu();
  }
);

onMounted(() => {
  selectMenu();
});

const selectMenu = () => {
  if (auth.loggedIn) {
    menu.value = admin;
  } else {
    menu.value = guest;
  }
};
const logout = async () => {
  try {
    await auth.logout();
    nuxtApp.$router.push("/");
  } catch (error) {
    console.log("error", error);
  }
};
</script>
<style lang="scss" scope>
.client {
  &__link {
    cursor: pointer;
    text-decoration: none !important;
    color: white !important;
  }
}
</style>
