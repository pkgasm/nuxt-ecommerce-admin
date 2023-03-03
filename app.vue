<template>
  <NuxtLayout>
    <confirm-dialog></confirm-dialog>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { useStore } from "~/store";

const store = useStore();
const nuxtApp = useNuxtApp();

onMounted(() => {
  widthScreen();
  window.addEventListener("resize", widthScreen);
});

const widthScreen = () => {
  const screen = nuxtApp.$utils.widthScreen();
  const mobileScreens = ["mobile-xs", "mobile-small", "mobile-big", "tablet"];
  const desktopScreens = ["landscape", "desktop", "desktop-big"];
  store.screen.mobile = mobileScreens.includes(screen);
  store.screen.desktop = desktopScreens.includes(screen);
};

onUnmounted(() => {
  window.removeEventListener("resize", widthScreen);
});
</script>
