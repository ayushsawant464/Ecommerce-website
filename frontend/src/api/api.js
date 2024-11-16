import axios from 'axios';

const API_URL = 'http://localhost:5000/api' || process.env.API_URL;  // Backend URL

//get all productds
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  console.log(response.data);
  return response.data;
};

//get single product
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

//login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data.token;
};

//logout
export const logoutUser = 
  async () => {
    const response = await axios.post(
      `${API_URL}/users/logout`);
    return response.data;
  }


// Register user
export const registerUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/register`, credentials,
  );
  return response.data;
};

// Add item to cart
export const addToCart = async (email, name , quantity, price) => {
  const response = await axios.post(`${API_URL}/cart/add`, { email, name, quantity, price }
  );
  return response.data;
};


// Cart APIs
export const getCart = async () => {
  // const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/cart`, {
  });
  return response.data;
};
