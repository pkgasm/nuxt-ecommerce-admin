<template>
  <section class="login w-100 d-flex flex-row">
    <div class="desktop">
      <img class="w-100 h-screen login__image" src="/img/ciudad.jpeg" />
    </div>
    <div class="login__form d-flex flex-column justify-center">
      <forms-auth-login />
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: ["guest"],
});
</script>
<style lang="scss">
@import "@/assets/variables.scss";
.login {
  height: 100%;
  @include screen(desktop) {
    height: 100vh;
  }
  &__form {
    width: 100%;
  }
  &__image {
    @include screen(desktop) {
      object-fit: cover;
    }
  }
}
</style>
