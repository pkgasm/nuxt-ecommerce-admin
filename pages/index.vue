<template>
  <section class="home"></section>
</template>
<script setup>
definePageMeta({
  middleware: ["admin"],
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.home {
  background-color: #f5f5f5;
}
</style>
