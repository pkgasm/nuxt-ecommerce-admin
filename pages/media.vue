<template>
  <section class="media">
    <v-card color="grey-lighten-4" flat rounded="0">
      <v-toolbar color="primary" density="compact">
        <v-toolbar-title>Media Library</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="state.dialogUploader = true">
          <v-icon>mdi-file-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="d-flex flex-wrap">
        <cards-media-file
          class="mx-3 my-3"
          v-for="m of state.media"
          :media="m"
          @remove="removeMedia"
        />
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="state.dialogUploader"
      class="media__uploader"
      persistent
      :fullscreen="store.screen.mobile"
      :scrim="!store.screen.mobile"
      :transition="store.screen.mobile ? 'dialog-bottom-transition' : false"
    >
      <forms-media-uploader
        v-if="state.dialogUploader"
        only-upload
        @close="state.dialogUploader = false"
        @selectedFiles="uploaderSelectedFiles"
      />
    </v-dialog>
  </section>
</template>
<script setup>
import { useStore } from "~/store";

definePageMeta({
  middleware: ["admin"],
});

const store = useStore();
const api = useApi();

const state = reactive({
  media: [],
  dialogUploader: false,
});

onMounted(() => {});

const removeMedia = async (media) => {
  try {
    await api.media.delete(media.id);
    const files = state.media.slice();
    const index = state.media.findIndex((m) => m.id === media.id);
    files.splice(index, 1);
    state.media = [];
    nextTick(() => {
      state.media = files;
    });
  } catch (error) {
    if (error?.response?.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ha ocurrido un error");
    }
  }
};

const uploaderSelectedFiles = (files) => {
  files = [...files, ...state.media];
  state.media = [];
  nextTick(() => {
    state.media = files;
  });
};

const { data: mResp } = useLazyAsyncData(() => {
  return api.media.list();
});

watch(mResp, () => {
  state.media = mResp.value.data.media;
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.media {
  @include screen(tablet) {
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  &__uploader {
    @include screen(tablet) {
      max-width: 90%;
    }
  }
}
</style>
