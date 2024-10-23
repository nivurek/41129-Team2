import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

// Create a new project
const createProject = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/api/project/create`, payload);
    console.log('Project created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating project:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing project
const updateProject = async (payload) => {
  try {
    const response = await axios.put(`${baseURL}/api/project/update`, payload);
    console.log('Project updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating project:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a project
const deleteProject = async (payload) => {
  try {
    const response = await axios.delete(`${baseURL}/api/project/delete`, { params: payload });
    console.log('Project deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data?.message || error.message);
    return null;
  }
};

export { createProject, updateProject, deleteProject };