import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new result for a page in a project
router.post('/api/project/page/result/create', async (req, res) => {
  const { userId, projectId, pageId, analysis, screenshotUrl, imagePalette, suggestedPalettes } = req.body;

  try {
    const newResult = {
      id: new mongoose.Types.ObjectId(),
      updated: new Date(),
      analysis: analysis || '', // Optional, defaults to empty string if not provided
      screenshotUrl: screenshotUrl || '',
      imagePalette: imagePalette || [],
      updatedImagePalette: [],
      suggestedPalettes: suggestedPalettes || []
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId, 'projects.pages.id': pageId },
      { $push: { 'projects.$[project].pages.$[page].results': newResult } }, // Add the new result
      {
        new: true,
        arrayFilters: [
          { 'project.id': projectId },
          { 'page.id': pageId }
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
router.put('/api/project/page/result/update', async (req, res) => {
  const { userId, projectId, pageId, resultId, analysis, screenshotUrl, imagePalette, updatedImagePalette, suggestedPalettes } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId, 'projects.pages.id': pageId, 'projects.pages.results.id': resultId },
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
          { 'project.id': projectId },
          { 'page.id': pageId },
          { 'result.id': resultId }
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
router.delete('/api/project/page/result/delete', async (req, res) => {
  const { userId, projectId, pageId, resultId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects.id': projectId, 'projects.pages.id': pageId },
      { $pull: { 'projects.$[project].pages.$[page].results': { id: resultId } } }, // Remove the result
      {
        new: true,
        arrayFilters: [
          { 'project.id': projectId },
          { 'page.id': pageId }
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