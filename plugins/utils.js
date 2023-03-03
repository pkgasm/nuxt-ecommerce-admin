import { string } from "@poppinss/utils/build/helpers";

import {
  rules,
  img2Base64,
  getExtByMimeType,
  downloadBlob,
} from "~/utils/index";

const utils = {
  img2Base64,
  getExtByMimeType,
  downloadBlob,
  widthScreen,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("rules", rules);
  nuxtApp.provide("utils", utils);
  nuxtApp.provide("string", string);
});
