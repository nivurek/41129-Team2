import axios from 'axios';

// Create a new page in a project
const createPage = async (pageData) => {
  try {
    const response = await axios.post('/api/project/page/create', pageData);
    console.log('Page created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating page:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing page
const updatePage = async (pageData) => {
  try {
    const response = await axios.post('/api/project/page/update', pageData);
    console.log('Page updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating page:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a page
const deletePage = async (pageData) => {
  try {
    const response = await axios.post('/api/project/page/delete', pageData);
    console.log('Page deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting page:', error.response?.data?.message || error.message);
    return null;
  }
};

export { createPage, updatePage, deletePage };