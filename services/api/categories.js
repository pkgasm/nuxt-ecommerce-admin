import axios from "axios";

import { getHeaders } from "./headers";

export default class Category {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  list() {
    const headers = getHeaders();
    return axios.get(`${this.baseUrl}api/v1/categories/`, {
      headers: headers,
    });
  }
  create(params) {
    const headers = getHeaders();
    return axios.post(`${this.baseUrl}api/v1/categories/`, params, {
      headers: headers,
    });
  }
  update(id, params) {
    const headers = getHeaders();
    return axios.put(`${this.baseUrl}api/v1/categories/${id}`, params, {
      headers: headers,
    });
  }
}
