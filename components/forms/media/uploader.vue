<template>
  <v-card class="card">
    <v-toolbar color="primary">
      <v-btn class="mobile" icon="mdi-close" @click="$emit('close')"> </v-btn>
      <v-toolbar-title>Subir archivos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="desktop" icon="mdi-close" @click="$emit('close')"> </v-btn>
      <v-btn
        v-if="store.screen.mobile && state.files.length > 0"
        class="mobile"
        @click="upload"
        :loading="state.loading.upload"
      >
        Subir
      </v-btn>
    </v-toolbar>
    <v-tabs v-model="state.tab">
      <v-tab
        v-if="(!props.onlySelect && !props.onlyUpload) || props.onlySelect"
        value="select"
      >
        Selecionar
      </v-tab>
      <v-tab
        v-if="(!props.onlySelect && !props.onlyUpload) || props.onlyUpload"
        value="upload"
      >
        Subir
      </v-tab>
    </v-tabs>
    <v-window v-model="state.tab">
      <v-window-item value="select">
        <v-card flat>
          <v-card-text
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et iusto
            soluta voluptatum hic consequatur accusantium deleniti. Maiores
            quisquam, quis obcaecati porro voluptatem nam ullam sapiente.
            Laudantium ab natus obcaecati sequi?
          </v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item class="card__upload" value="upload">
        <v-card>
          <v-card-text>
            <input
              ref="inputFile"
              hidden
              type="file"
              multiple
              @input="onInputFile"
            />
            <div
              v-if="store.screen.desktop && state.files.length === 0"
              class="card__upload__zone d-flex flex-column justify-center align-center"
              @drop.prevent="onInputFile"
            >
              <div class="text-h6 text-center">Drag & Drop to Upload File</div>
              <div>
                <v-btn
                  class="mt-2"
                  color="primary"
                  size="small"
                  @click="selectFiles"
                >
                  Seleccionar
                </v-btn>
              </div>
            </div>
            <div
              v-if="store.screen.mobile && state.files.length === 0"
              class="mt-5 d-flex justify-center"
            >
              <v-btn color="primary" size="small" @click="selectFiles">
                Seleccionar
              </v-btn>
            </div>
            <div
              v-if="state.files.length > 0"
              class="card__upload__files d-flex flex-wrap"
            >
              <cards-media-file-upload
                v-for="(f, i) of state.files"
                v-model="state.files[i].upload"
                :url="f.url"
                :name="f.name"
                :mimeType="f.mimeType"
                class="mx-3 mt-3"
              />
            </div>
          </v-card-text>
          <v-card-actions v-if="store.screen.desktop && state.files.length > 0">
            <v-spacer></v-spacer>
            <v-btn color="red" @click="$emit('close')"> Cerrar </v-btn>
            <v-btn
              color="primary"
              @click="upload"
              :loading="state.loading.upload"
            >
              Subir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup>
import { useToast } from "vue-toastification";
import { useStore } from "~/store";

const events = ["dragenter", "dragover", "dragleave", "drop"];
const props = defineProps({
  onlySelect: {
    type: Boolean,
    default: false,
  },
  onlyUpload: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: "",
  },
});

const nuxtApp = useNuxtApp();
const toast = useToast();
const store = useStore();
const api = useApi();

const emit = defineEmits(["selectedFiles", "close"]);

const inputFile = ref(null);
const state = reactive({
  tab: "select",
  files: [],
  loading: {
    upload: false,
  },
});

onMounted(() => {
  initialize();

  events.forEach((eventName) => {
    document.body.addEventListener(eventName, (e) => {
      e.preventDefault();
    });
  });
});

const upload = async () => {
  state.loading.upload = true;
  try {
    const files = state.files.filter((f) => f.upload);
    const uploadedFiles = [];
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file.blob);
      formData.append("path", props.path);
      const response = await api.media.upload(formData);
      uploadedFiles.push(response.data.media);
    }
    state.files = [];
    emit("selectedFiles", uploadedFiles);
    emit("close");
  } catch (error) {
    console.log(error);
    if (error?.response?.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ha ocurrido un error");
    }
  }
  state.loading.upload = false;
};

const onInputFile = async (e) => {
  const files = e.dataTransfer?.files ?? event.target.files;
  const mapFiles = [];
  for (let f of files) {
    if (f.size / 1024 > 1024) continue;
    const index = f.name.lastIndexOf(".");
    const split = f.name.split(".");
    const name = f.name.slice(0, index);
    const mf = {};
    mf.blob = f;
    mf.url = f.type.includes("image") ? await nuxtApp.$utils.img2Base64(f) : "";
    mf.name = nuxtApp.$string.dashCase(name) + "." + split[split.length - 1];
    mf.mimeType = f.type;
    mf.upload = true;
    mapFiles.push(mf);
  }
  state.files = mapFiles;
};

const selectFiles = () => {
  inputFile.value.click();
};

const initialize = () => {
  if (props.onlyUpload) state.tab = "upload";
};
</script>
<style lang="scss">
@import "@/assets/variables.scss";
.card {
  &__upload {
    &__zone {
      border-color: #001b59;
      border-style: solid;
      border-radius: 10px;
      @include screen(tablet) {
        height: 500px;
      }
    }
    &__files {
      overflow-y: auto;
      @include screen(tablet) {
        height: 100%;
        margin-top: auto;
      }
    }
  }
}
.v-card {
  border-style: none;
}
</style>
