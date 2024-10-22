import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

// Create a new page in a project
const createPage = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/api/page/create`, payload);
    console.log('Page created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating page:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing page
const updatePage = async (payload) => {
  try {
    const response = await axios.put(`${baseURL}/api/page/update`, payload);
    console.log('Page updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating page:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a page
const deletePage = async (payload) => {
  try {
    const response = await axios.delete(`${baseURL}/api/page/delete`, { params: payload });
    console.log('Page deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting page:', error.response?.data?.message || error.message);
    return null;
  }
};

export { createPage, updatePage, deletePage };