import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new project for a user
router.post('/create', async (req, res) => {
  const { userId, projectName } = req.body;

  try {
    const newProject = {
      name: projectName,
      updated: new Date(),
      pages: []
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { projects: newProject } }, // Add the new project to the array
      { new: true } // Return the updated user document
    );

    if (user) {
      res.status(200).json({ message: 'Project created successfully', project: newProject });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});


// Rename an existing project
router.put('/update', async (req, res) => {
  const { userId, projectId, newProjectName } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId },
      { $set: { 'projects.$.name': newProjectName, 'projects.$.updated': new Date() } }, // Update the name and 'updated' fields
      { new: true } // Return the updated user document
    );

    if (user) {
      res.status(200).json({ message: 'Project renamed successfully' });
    } else {
      res.status(404).json({ message: 'Project or user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error renaming project', error });
  }
});


// Delete an existing project
router.delete('/delete', async (req, res) => {
  const { userId, projectId } = req.query;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { projects: { _id: projectId } } }, // Remove the project from the array
      { new: true } // Return the updated user document
    );

    if (user) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'User or project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

export default router;