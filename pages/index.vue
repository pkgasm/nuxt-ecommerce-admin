<template>
  <section class="home h-screen">
    <v-img class="h-100" src="/img/fondo.jpeg" cover>
      <div class="h-100 d-flex flex-column justify-center align-center">
        <div class="text-h1 text-white mb-5">Bohai Admin</div>
        <v-btn color="white" variant="text" size="large" to="/dashboard/">
          Ir al Dashboard
        </v-btn>
      </div>
    </v-img>
  </section>
</template>
<script setup>
const router = useRouter();
onMounted(() => {
  // router.replace("/dashboard/");
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.home {
  background-color: #f5f5f5;
}
</style>
