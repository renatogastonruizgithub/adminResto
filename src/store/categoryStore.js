import {create} from 'zustand';
import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = "http://localhost:3001/api/v1/category/";


const useCategoryStore = create((set) => ({  
  categories: [],
  loading: false,
  error: null,
  getOneCategorie:[],

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


  fetchOneCategori: async (id) => {
    set({ loading: true, error: null });
    try {
 
      const response = await axios.get(`${API_URL}one/${id}`);
      console.log(response.data);
      set({ getOneCategorie: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateCategory: async (id,data) => {

    console.log(data+"recibido stores")
    set({ loading: true });
    try {
      await axios.patch(`${API_URL}${id}`, data);
     
      set({  loading: false });
    
    } catch (error) {
 
  const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
  set({ error: errorMessage, loading: false });
      toast.warning(`${errorMessage}`, { position: "top-right" });
    }
  },
  
 deleteCategory: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URL}${id}`);
     
      set({  loading: false });
    
    } catch (error) {
 
  const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
  set({ error: errorMessage, loading: false });
      toast.warning(`${errorMessage}`, { position: "top-right" });
    }
  },
  createCategory: async (data) => {
    set({ loading: true });
    try {
      await axios.post(`${API_URL}`,data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegúrate de especificar este tipo
        },
      });
     
      set({  loading: false });
    
    } catch (error) {
 
  const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
  set({ error: errorMessage, loading: false });
      toast.warning(`${errorMessage}`, { position: "top-right" });
    }
  }, 

}));

export default useCategoryStore;