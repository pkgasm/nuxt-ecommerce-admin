<template>
  <v-card class="card" variant="text">
    <v-img
      class="w-100 text-white"
      :src="urlPreview"
      lazy-src="/img/icons/files/unknow.svg"
      cover
    >
      <div class="mt-2 mr-1 d-flex justify-end">
        <v-btn
          class="m-2"
          color="primary"
          icon="mdi-pencil"
          size="x-small"
        ></v-btn>
        <v-btn
          class="ml-2"
          color="red"
          icon="mdi-trash-can"
          size="x-small"
        ></v-btn>
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
    <v-card-title class="text-subtitle-1 px-0 py-0">
      {{ state.name }}
    </v-card-title>
  </v-card>
</template>
<script setup>
const props = defineProps({
  media: {
    type: Object,
    default: null,
  },
});

const nuxtApp = useNuxtApp();

const state = reactive({
  url: "",
  name: "",
});

const urlPreview = computed(() => {
  if (!props.media) return "";
  return props.media.mimeType.includes("image")
    ? state.url
    : `img/icons/files/${nuxtApp.$getExtByMimeType(props.media.mimeType)}.svg`;
});

watch(props.media, () => {
  initialize();
});

onMounted(() => {
  initialize();
});

const initialize = () => {
  if (props.media) {
    state.url = props.media.url;
    state.name = props.media.fileName;
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.card {
  width: 90px;
  @include screen(tablet) {
    width: 120px;
  }
}
</style>
