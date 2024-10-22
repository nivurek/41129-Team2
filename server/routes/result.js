import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new result for a page in a project
router.post('/create', async (req, res) => {
  const { userId, projectId, pageId } = req.body;

  try {
    const newResult = {
      updated: new Date(),
      analysis: '',
      screenshotUrl: '',
      imagePalette: [],
      updatedImagePalette: [],
      suggestedPalettes: []
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId },
      { $push: { 'projects.$[project].pages.$[page].results': newResult } }, // Add the new result
      {
        new: true,
        arrayFilters: [
          { 'project._id': projectId },
          { 'page._id': pageId }
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Result created successfully', result: newResult });
    } else {
      res.status(404).json({ message: 'User, project, or page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating result', error });
  }
});


// Update an existing result
router.put('/update', async (req, res) => {
  const { userId, projectId, pageId, resultId, analysis, screenshotUrl, imagePalette, updatedImagePalette, suggestedPalettes } = req.body;
  console.log("Update result body", req.body);

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId, 'projects.pages.results._id': resultId },
      {
        $set: {
          'projects.$[project].pages.$[page].results.$[result].analysis': analysis || '',
          'projects.$[project].pages.$[page].results.$[result].screenshotUrl': screenshotUrl || '',
          'projects.$[project].pages.$[page].results.$[result].imagePalette': imagePalette || [],
          'projects.$[project].pages.$[page].results.$[result].updatedImagePalette': updatedImagePalette || [],
          'projects.$[project].pages.$[page].results.$[result].suggestedPalettes': suggestedPalettes || [],
          'projects.$[project].pages.$[page].results.$[result].updated': new Date()
        }
      },
      {
        new: true,
        arrayFilters: [
          { 'project._id': projectId },
          { 'page._id': pageId },
          { 'result._id': resultId }
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Result updated successfully' });
    } else {
      res.status(404).json({ message: 'User, project, page, or result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating result', error });
  }
});


// Delete an existing result
router.delete('/delete', async (req, res) => {
  const { userId, projectId, pageId, resultId } = req.query;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId },
      { $pull: { 'projects.$[project].pages.$[page].results': { _id: resultId } } }, // Remove the result
      {
        new: true,
        arrayFilters: [
          { 'project._id': projectId },
          { 'page._id': pageId }
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Result deleted successfully' });
    } else {
      res.status(404).json({ message: 'User, project, page, or result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting result', error });
  }
});

export default router;