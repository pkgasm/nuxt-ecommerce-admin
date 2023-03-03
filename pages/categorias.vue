<template>
  <section class="categories">
    <v-data-table
      v-model:sortBy="state.sortBy"
      :headers="headers"
      :items="state.categories"
      :search="state.search"
      class="elevation-1"
      density="compact"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Categorías</v-toolbar-title>
          <v-divider inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="state.search"
            class="mr-5 desktop"
            label="Buscar"
            variant="underlined"
            color="primary"
            density="compact"
            append-inner-icon="mdi-magnify"
            hide-details
          ></v-text-field>
          <v-btn
            variant="flat"
            color="primary"
            @click="state.dialogCategory = true"
          >
            Nuevo <v-icon icon="mdi-plus"></v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar class="mobile" flat color="white">
          <v-text-field
            v-model="state.search"
            class="mx-5"
            label="Buscar"
            variant="underlined"
            color="primary"
            density="compact"
            append-inner-icon="mdi-magnify"
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img
          :src="item.raw.media?.url ?? '/img/image.png'"
          lazy-src="/img/img/image.png"
          cover
          width="80px"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-img>
      </template>
      <template v-slot:item.options="{ item }">
        <v-tooltip text="Editar" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-pencil"
              color="primary"
              variant="plain"
              size="small"
              v-bind="props"
              @click="editCategory(item.raw)"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog
      v-model="state.dialogCategory"
      max-width="500px"
      persistent
      :fullscreen="$device.isMobile"
      :scrim="!$device.isMobile"
      :transition="$device.isMobile ? 'dialog-bottom-transition' : false"
    >
      <forms-admin-category
        v-if="state.dialogCategory"
        :category="state.editCategory"
        :categories="state.categories"
        @close="close"
        @created="created"
        @updated="updated"
      />
    </v-dialog>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: ["admin"],
});

const headers = [
  {
    title: "Imagen",
    align: "start",
    sortable: true,
    value: "media.url",
    key: "image",
  },
  {
    title: "Nombre",
    align: "start",
    sortable: true,
    value: "name",
    key: "name",
  },
  {
    title: "Descripción",
    align: "start",
    sortable: true,
    value: "description",
    key: "description",
  },
  {
    title: "Categoría padre",
    align: "start",
    sortable: true,
    value: "parentCategory.name",
    key: "parentCategory",
  },
  {
    title: "Opciones",
    align: "start",
    sortable: false,
    value: "options",
    key: "options",
  },
];

const api = useApi();

const state = reactive({
  categories: [],
  sortBy: [],
  search: "",
  editCategory: null,
  dialogCategory: false,
});

const editCategory = (category) => {
  state.editCategory = category;
  state.dialogCategory = true;
};

const created = (category) => {
  state.categories.push(category);
  state.editCategory = null;
  close();
};

const updated = (category) => {
  const index = state.categories.findIndex((c) => category.id === c.id);
  Object.assign(state.categories[index], category);
  close();
};

const close = () => {
  state.dialogCategory = false;
  state.editCategory = null;
};

const { data: cResp } = useLazyAsyncData(() => {
  return api.categories.list();
});

watch(cResp, () => {
  state.categories = cResp.value.data.categories;
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.categories {
  @include screen(tablet) {
    padding-top: 2rem;
    padding-left: 5rem;
    padding-right: 5rem;
  }
}
</style>
