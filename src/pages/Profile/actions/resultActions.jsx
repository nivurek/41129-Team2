import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

// Create a new result
const createResult = async (resultData) => {
  try {
    const response = await axios.post(`${baseURL}/api/result/create`, resultData);
    console.log('Result created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating result:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing result
const updateResult = async (resultData) => {
  try {
    const response = await axios.post(`${baseURL}/api/result/update`, resultData);
    console.log('Result updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating result:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a result
const deleteResult = async (resultData) => {
  try {
    const response = await axios.post(`${baseURL}/api/result/delete`, resultData);
    console.log('Result deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting result:', error.response?.data?.message || error.message);
    return null;
  }
};


export { createResult, updateResult, deleteResult };
