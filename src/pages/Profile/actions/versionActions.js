import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

// Create a new version
const createVersion = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/api/version/create`, payload);
    console.log('Version created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating version:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing version
const updateVersion = async (payload) => {
  try {
    const response = await axios.put(`${baseURL}/api/version/update`, payload);
    console.log('Version updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating version:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a version
const deleteVersion = async (payload) => {
  try {
    const response = await axios.delete(`${baseURL}/api/version/delete`, { params: payload });
    console.log('Version deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting version:', error.response?.data?.message || error.message);
    return null;
  }
};


export { createVersion, updateVersion, deleteVersion };
