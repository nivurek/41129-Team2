import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new project for a user
router.post('/api/project/create', async (req, res) => {
  const { userId, projectName } = req.body;

  try {
    const newProject = {
      id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the project
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
router.put('/api/project/rename', async (req, res) => {
  const { userId, projectId, newProjectName } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId },
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
router.delete('/api/project/delete', async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { projects: { id: projectId } } }, // Remove the project from the array
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