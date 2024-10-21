import express from 'express';

const router = express.Router();
import User from '../models/User.js';

// Route to save the project image link to the user project
router.post('/save-image', async (req, res) => {
  const { userId, imageUrl, analysis } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Create a new project object
    const newProject = {
      imageUrl,
      analysis,
    };

    // Add the new project to the user's projects array
    user.projects.push(newProject);

    // Save the updated user document
    await user.save();

    res.status(200).send({ message: 'Project saved successfully', project: newProject });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).send({ message: 'Error saving project', error });
  }
});

export default router;