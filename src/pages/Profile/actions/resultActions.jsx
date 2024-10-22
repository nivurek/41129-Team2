import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

// Create a new result
const createResult = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/api/result/create`, payload);
    console.log('Result created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating result:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing result
const updateResult = async (payload) => {
  try {
    const response = await axios.put(`${baseURL}/api/result/update`, payload);
    console.log('Result updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating result:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a result
const deleteResult = async (payload) => {
  try {
    const response = await axios.delete(`${baseURL}/api/result/delete`, { params: payload });
    console.log('Result deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting result:', error.response?.data?.message || error.message);
    return null;
  }
};


export { createResult, updateResult, deleteResult };
