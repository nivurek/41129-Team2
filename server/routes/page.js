import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new page for a project
router.post('/create', async (req, res) => {
  const { userId, projectId, pageName } = req.body;

  try {
    const newPage = {
      name: pageName,
      updated: new Date(),
      versions: []
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId },
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
router.put('/update', async (req, res) => {
  const { userId, projectId, pageId, newPageName } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId },
      { 
        $set: { 
          'projects.$[project].pages.$[page].name': newPageName,
          'projects.$[project].pages.$[page].updated': new Date() 
        }
      },
      {
        new: true, // Return the updated user document
        arrayFilters: [
          { 'project._id': projectId }, // Filter to find the project
          { 'page._id': pageId } // Filter to find the page
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
router.delete('/delete', async (req, res) => {
  const { userId, projectId, pageId } = req.query;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId },
      { $pull: { 'projects.$.pages': { _id: pageId } } }, // Remove the page from the project's 'pages' array
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

export default router;