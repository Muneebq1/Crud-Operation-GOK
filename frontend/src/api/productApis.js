import axios from 'axios';

const Products = {
  getProducts: async () => {
    const endpoint = `${process.env.REACT_APP_PUBLIC_SERVER_URL}/products`;
    const response = await axios.get(endpoint);
    return response;
  },
  deleteProducts: async (id) => {
    const endpoint = `${process.env.REACT_APP_PUBLIC_SERVER_URL}/product/${id}`;
    const response = await axios.delete(endpoint);
    return response;
  },
  addProducts: async (product) => {
    const endpoint = `${process.env.REACT_APP_PUBLIC_SERVER_URL}/product`;
    return await axios.post(endpoint, product);
  },
  editProducts: async (id, product) => {
    const endpoint = `${process.env.REACT_APP_PUBLIC_SERVER_URL}/product/${id}`;
    return await axios.put(endpoint, product);
  },
};
export default Products;
