<template>
  <v-card max-width="450">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="state.name"
          :readonly="loading.create"
          :rules="[$rules.required]"
          class="mb-2"
          label="Nombre"
          variant="underlined"
          color="primary"
          prepend-icon="mdi-text"
        ></v-text-field>
        <v-textarea
          v-model="state.description"
          label="Descripción"
          variant="underlined"
          color="primary"
          prepend-icon="mdi-text"
        ></v-textarea>
        <v-select
          v-model="state.parentCategoryId"
          :items="categories"
          item-title="name"
          item-value="id"
          label="Categoría padre"
          variant="underlined"
          prepend-icon="mdi-text"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('close')"> Cerrar </v-btn>
      <v-btn
        v-if="!props.category"
        :loading="loading.create"
        color="primary"
        @click="create"
      >
        Guardar
      </v-btn>
      <v-btn
        v-if="props.category"
        :loading="loading.update"
        color="primary"
        @click="update"
      >
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
const api = useApi();

const props = defineProps({
  category: {
    type: Object,
    default: null,
  },
  categories: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["close", "created", "updated"]);

const title = computed(() => {
  return props.category ? "Editar categoría" : "Crear categoría";
});

const state = reactive({
  name: null,
  description: null,
  parentCategoryId: null,
});
const loading = reactive({ create: false, update: false });
const form = ref(null);

onMounted(() => {
  initialize();
});
watch(
  () => props.category,
  () => {
    initialize();
  }
);
const create = async () => {
  loading.create = true;
  try {
    if (form.value.validate()) {
      const params = {
        name: state.name,
        description: state.description,
        parentCategoryId: state.parentCategoryId,
      };
      const response = await api.categories.create(params);
      emit("created", response.data.category);
    }
  } catch (error) {
    console.log(error)
    if (error?.response?.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ha ocurrido un error");
    }
  }
  loading.create = false;
};
const update = async () => {
  loading.update = true;
  try {
    if (form.value.validate()) {
      const params = {
        name: state.name,
        description: state.description,
        parentCategoryId: state.parentCategoryId,
      };
      const response = await api.categories.update(props.category.id, params);
      emit("updated", response.data.category);
    }
  } catch (error) {
    console.log(error);
    if (error?.response?.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ha ocurrido un error");
    }
  }
  loading.update = false;
};
const initialize = () => {
  if (props.category) {
    state.name = props.category.name;
    state.description = props.category.description;
    state.parentCategoryId = props.category.parentCategory?.id;
  }
};
</script>
