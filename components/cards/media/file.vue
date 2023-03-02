<template>
  <v-card class="card" variant="text">
    <v-img
      class="card__image w-100 text-white"
      :src="urlPreview"
      lazy-src="/img/icons/files/unknow.svg"
    >
      <div class="mt-2 d-flex justify-end">
        <v-btn
          class="mr-2"
          color="primary"
          icon="mdi-download"
          size="x-small"
          :loading="loading.download"
          @click="download"
        ></v-btn>
        <v-btn
          color="red"
          icon="mdi-trash-can"
          size="x-small"
          @click="remove"
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
import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
  media: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["remove"]);

const nuxtApp = useNuxtApp();
const confirm = useConfirm();
const api = useApi();

const state = reactive({
  url: "",
  name: "",
});

const loading = reactive({
  download: false,
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

const download = async () => {
  loading.download = true;
  try {
    const response = await api.media.download(props.media.id);
    nuxtApp.$downloadBlob(response.data, state.name);
  } catch (error) {
    if (error?.response?.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ha ocurrido un error");
    }
  }
  loading.download = false;
};

const remove = () => {
  confirm.require({
    message: "¿Quieres eliminar este archivo?",
    header: "Eliminar",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Aceptar",
    rejectLabel: "Cancelar",
    accept: () => {
      emit("remove", props.media);
      confirm.close();
    },
  });
};

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
  &__image {
    height: 135px;
  }
}
</style>
