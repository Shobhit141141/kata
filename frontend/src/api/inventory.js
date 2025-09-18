import axios from "axios";

const API = axios.create({ baseURL: "/api/inventory" });

export const purchaseSweet = (id) => API.post(`/${id}/purchase`);
export const restockSweet = (id, amount) =>
  API.post(`/${id}/restock`, { amount });
