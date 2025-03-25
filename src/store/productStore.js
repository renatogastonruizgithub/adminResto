import {create} from 'zustand';
import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = "http://localhost:3001/api/v1/category/";
const PRODUCTOS = "http://localhost:3001/api/v1/product/";

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  getProduct:[],
  getOneProduct:{}
  ,

  fetchCategori: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      set({ categories: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Función para obtener productos por categoría ID
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log("id Zustand: " + id);
      const response = await axios.get(`${API_URL}${id}`);
      console.log(response.data);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchGetProduct: async () => {
    set({ loading: true, error: null });
    try {
   
      const response = await axios.get(`${PRODUCTOS}`);
    
      set({ getProduct: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOneProduct: async (id) => {
    set({ loading: true, error: null });
    try {
   console.log("id stores"+id)
      const response = await axios.get(`${PRODUCTOS}${id}`);
      console.log(response.data)
      set({ getOneProduct: response.data, loading: false });
   
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateOneProduct: async (id,data) => {
    set({ loading: true });
    try {
      await axios.patch(`${PRODUCTOS}${id}`, data);
     
      set({  loading: false });
    
    } catch (error) {
 
  const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
  set({ error: errorMessage, loading: false });
      toast.warning(`${errorMessage}`, { position: "top-right" });
    }
  },
  
 deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${PRODUCTOS}${id}`);
     
      set({  loading: false });
    
    } catch (error) {
 
  const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
  set({ error: errorMessage, loading: false });
      toast.warning(`${errorMessage}`, { position: "top-right" });
    }
  },
  createProduct: async (data) => {
    set({ loading: true });
    try {
      await axios.post(`${PRODUCTOS}`,data);
     
      set({  loading: false });
    
    } catch (error) {
 
  const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
  set({ error: errorMessage, loading: false });
      toast.warning(`${errorMessage}`, { position: "top-right" });
    }
  },

}));

export default useProductStore;
