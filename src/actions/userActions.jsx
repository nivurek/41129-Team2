// actions/userActions.js
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

const getUserById = async (userId) => {
  console.log("action for get user has id:", userId);
  try {
    const response = await axios.get(`${baseURL}/api/user/${userId}`);
    console.log('User fetched:', response.data); // Log the data to verify
    return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching user:', error.response?.data?.message || error.message);
    return null; // Return null or handle error as needed
  }
};

export { getUserById };