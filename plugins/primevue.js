import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";

import ConfirmDialog from "primevue/confirmdialog";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css ";
import "primeicons/primeicons.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.component("confirm-dialog", ConfirmDialog);
});
