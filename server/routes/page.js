import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new page for a project
router.post('/api/project/page/create', async (req, res) => {
  const { userId, projectId, pageName } = req.body;

  try {
    const newPage = {
      id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the page
      name: pageName,
      updated: new Date(),
      results: []
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId },
      { $push: { 'projects.$.pages': newPage } }, // Add the new page to the project's 'pages' array
      { new: true } // Return the updated user document
    );

    if (user) {
      res.status(200).json({ message: 'Page created successfully', page: newPage });
    } else {
      res.status(404).json({ message: 'User or project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error });
  }
});


// Rename an existing page
router.put('/api/project/page/rename', async (req, res) => {
  const { userId, projectId, pageId, newPageName } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId, 'projects.pages.id': pageId },
      { 
        $set: { 
          'projects.$[project].pages.$[page].name': newPageName,
          'projects.$[project].pages.$[page].updated': new Date() 
        }
      },
      {
        new: true, // Return the updated user document
        arrayFilters: [
          { 'project.id': projectId }, // Filter to find the project
          { 'page.id': pageId } // Filter to find the page
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Page renamed successfully' });
    } else {
      res.status(404).json({ message: 'Project or page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error renaming page', error });
  }
});


// Delete an existing page
router.delete('/api/project/page/delete', async (req, res) => {
  const { userId, projectId, pageId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId },
      { $pull: { 'projects.$.pages': { id: pageId } } }, // Remove the page from the project's 'pages' array
      { new: true } // Return the updated user document
    );

    if (user) {
      res.status(200).json({ message: 'Page deleted successfully' });
    } else {
      res.status(404).json({ message: 'User, project, or page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error });
  }
});