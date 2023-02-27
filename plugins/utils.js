import { string } from "@poppinss/utils/build/helpers";

import { rules, img2Base64, getExtByMimeType } from "~/utils/index";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("rules", rules);
  nuxtApp.provide("img2Base64", img2Base64);
  nuxtApp.provide("getExtByMimeType", getExtByMimeType);
  nuxtApp.provide("string", string);
});
