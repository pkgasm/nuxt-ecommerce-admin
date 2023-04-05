import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      VDataTable,
    },
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#212121",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
