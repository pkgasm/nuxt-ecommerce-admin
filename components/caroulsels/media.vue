<template>
  <v-carousel class="carousel" :show-arrows="props.multiple" hide-delimiters>
    <template v-slot:prev="{ props }">
      <v-btn
        variant="elevated"
        color="primary"
        icon="mdi-chevron-left"
        @click="props.onClick"
      >
      </v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        variant="elevated"
        color="primary"
        icon="mdi-chevron-right"
        @click="props.onClick"
      >
      </v-btn>
    </template>
    <v-carousel-item v-for="f of state.files" :src="f.url">
      <div class="carousel__item__actions mt-2 d-flex justify-end">
        <v-btn
          class="mr-2"
          color="blue-darken-1"
          icon="mdi-plus"
          size="x-small"
        ></v-btn>
        <v-btn
          class="mr-2"
          color="primary"
          icon="mdi-pencil"
          size="x-small"
        ></v-btn>
        <v-btn color="red" icon="mdi-close" size="x-small"></v-btn>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>
<script setup>
const props = defineProps({
  files: {
    type: Array,
    default: [],
  },
  file: {
    type: Object,
    default: {
      url: "",
      mimeType: "",
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  files: [
    {
      url: "",
      mimeType: "",
    },
  ],
  fileDefault: {
    url: "",
    mimeType: "",
  },
});

watch(
  () => props.multiple,
  () => {
    initialize();
  }
);

watch(
  () => props.files,
  () => {
    initialize();
  }
);

watch(
  () => props.file,
  () => {
    initialize();
  }
);

onMounted(() => {
  initialize();
});

const initialize = () => {
  let files = [];
  if (props.multiple) {
    files = props.files;
  } else {
    files = [props.file ?? state.fileDefault];
  }
  state.files = [];
  state.files = files;
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.carousel {
  height: 220px !important;
  &__item {
    &__actions {
      width: 90%;
      @include screen(tablet) {
        width: 80;
      }
    }
  }
}
</style>
