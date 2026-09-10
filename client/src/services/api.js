import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response interceptor to format errors cleanly
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred while communicating with the server.";
    return Promise.reject(new Error(message));
  }
);

export const api = {
  // GET /api/products with optional query parameters
  getProducts: async (params = {}) => {
    const cleanParams = {};
    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val !== undefined && val !== null && val !== "") {
        cleanParams[key] = val;
      }
    });
    const res = await apiClient.get("/products", { params: cleanParams });
    return res.data; // { success: true, count: N, data: [...] }
  },

  // GET /api/products/:id
  getProduct: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data; // { success: true, data: { ... } }
  },

  // POST /api/products
  createProduct: async (productData) => {
    const res = await apiClient.post("/products", productData);
    return res.data; // { success: true, message: "...", data: { ... } }
  },

  // PUT /api/products/:id
  updateProduct: async (id, productData) => {
    const res = await apiClient.put(`/products/${id}`, productData);
    return res.data; // { success: true, message: "...", data: { ... } }
  },

  // DELETE /api/products/:id
  deleteProduct: async (id) => {
    const res = await apiClient.delete(`/products/${id}`);
    return res.data; // { success: true, message: "..." }
  },
};

export default api;
