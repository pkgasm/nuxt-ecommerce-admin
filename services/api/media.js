import axios from "axios";

import { getHeaders } from "./headers";

export default class Media {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  list() {
    const headers = getHeaders();
    return axios.get(`${this.baseUrl}api/v1/media/upload`, {
      headers: headers,
    });
  }
  upload(params) {
    const headers = getHeaders();
    return axios.post(`${this.baseUrl}api/v1/media/upload`, params, {
      headers: headers,
    });
  }
  delete(id) {
    const headers = getHeaders();
    return axios.delete(`${this.baseUrl}api/v1/media/upload/${id}`, {
      headers: headers,
    });
  }
}
