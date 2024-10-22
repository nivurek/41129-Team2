import axios from 'axios';


const createResult = async (resultData) => {
  try {
    const response = await axios.post('/api/project/page/result/create', resultData);
    console.log('Result created:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating result:', error.response?.data?.message || error.message);
    return null;
  }
};

const updateResult = async (resultData) => {
  try {
    const response = await axios.post('/api/project/page/result/update', resultData);
    console.log('Result updated:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating result:', error.response?.data?.message || error.message);
    return null;
  }
};

const deleteResult = async (resultData) => {
  try {
    const response = await axios.post('/api/project/page/result/delete', resultData);
    console.log('Result deleted:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting result:', error.response?.data?.message || error.message);
    return null;
  }
};


export { createResult, updateResult, deleteResult };
