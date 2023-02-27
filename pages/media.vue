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
        />
      </v-card-text>
    </v-card>
    <v-dialog v-model="state.dialogUploader" class="media__uploader" persistent>
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
definePageMeta({
  middleware: ["admin"],
});

const api = useApi();

const state = reactive({
  media: [],
  dialogUploader: false,
});

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
