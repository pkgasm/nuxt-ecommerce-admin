<template>
  <v-card class="card" variant="text">
    <v-img
      class="text-white"
      :src="imgPreview"
      lazy-src="/img/icons/files/unknow.svg"
      cover
    >
      <div class="mt-2 ml-1">
        <input v-model="value" class="card__checkbox" type="checkbox" />
      </div>
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
    <v-card-title class="text-subtitle-1 px-0 py-0">{{ name }}</v-card-title>
  </v-card>
</template>
<script setup>
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  mimeType: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const nuxtApp = useNuxtApp();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const imgPreview = computed(() => {
  return props.mimeType.includes("image")
    ? props.url
    : `img/icons/files/${nuxtApp.$utils.getExtByMimeType(props.mimeType)}.svg`;
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.card {
  width: 90px;
  height: auto;
  @include screen(tablet) {
    width: 120px;
  }
  &__checkbox {
    width: 18px;
    height: 18px;
  }
}
</style>
