import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASEURL;

// Create a new project
const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${baseURL}/api/project/create`, projectData);
    console.log('Project created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating project:', error.response?.data?.message || error.message);
    return null;
  }
};

// Update an existing project
const updateProject = async (projectData) => {
  try {
    const response = await axios.put(`${baseURL}/api/project/update`, projectData);
    console.log('Project updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating project:', error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a project
const deleteProject = async (projectData) => {
  console.log("On flight", projectData);
  try {
    const response = await axios.delete(`${baseURL}/api/project/delete`, { params: projectData });
    console.log('Project deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data?.message || error.message);
    return null;
  }
};

export { createProject, updateProject, deleteProject };