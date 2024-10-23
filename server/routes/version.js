import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Create a new version for a page in a project
router.post('/create', async (req, res) => {
  const { userId, projectId, pageId } = req.body;

  try {
    const newVersion = {
      updated: new Date(),
      analysis: '',
      screenshotUrl: '',
      imagePalette: [],
      updatedImagePalette: [],
      suggestedPalettes: []
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId },
      { $push: { 'projects.$[project].pages.$[page].versions': newVersion } }, // Add the new version
      {
        new: true,
        arrayFilters: [
          { 'project._id': projectId },
          { 'page._id': pageId }
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Version created successfully', version: newVersion });
    } else {
      res.status(404).json({ message: 'User, project, or page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating version', error });
  }
});


// Update an existing version
router.put('/update', async (req, res) => {
  const { userId, projectId, pageId, versionId, analysis, screenshotUrl, imagePalette, updatedImagePalette, suggestedPalettes } = req.body;

  try {
    const versionData = (await User.findById(userId))
                          .projects.find(project => project._id == projectId)
                          .pages.find(page => page._id == pageId)
                          .versions.find(version => version._id == versionId);

    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId, 'projects.pages.versions._id': versionId },
      {
        $set: {
          'projects.$[project].pages.$[page].versions.$[version].analysis': analysis ?? versionData.analysis,
          'projects.$[project].pages.$[page].versions.$[version].screenshotUrl': screenshotUrl ?? versionData.screenshotUrl,
          'projects.$[project].pages.$[page].versions.$[version].imagePalette': imagePalette ?? versionData.imagePalette,
          'projects.$[project].pages.$[page].versions.$[version].updatedImagePalette': updatedImagePalette ?? versionData.updatedImagePalette,
          'projects.$[project].pages.$[page].versions.$[version].suggestedPalettes': suggestedPalettes ?? versionData.suggestedPalettes,
          'projects.$[project].pages.$[page].versions.$[version].updated': new Date()
        }
      },
      {
        new: true,
        arrayFilters: [
          { 'project._id': projectId },
          { 'page._id': pageId },
          { 'version._id': versionId }
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Version updated successfully' });
    } else {
      res.status(404).json({ message: 'User, project, page, or version not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating version', error });
  }
});


// Delete an existing version
router.delete('/delete', async (req, res) => {
  const { userId, projectId, pageId, versionId } = req.query;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, 'projects._id': projectId, 'projects.pages._id': pageId },
      { $pull: { 'projects.$[project].pages.$[page].versions': { _id: versionId } } }, // Remove the version
      {
        new: true,
        arrayFilters: [
          { 'project._id': projectId },
          { 'page._id': pageId }
        ]
      }
    );

    if (user) {
      res.status(200).json({ message: 'Version deleted successfully' });
    } else {
      res.status(404).json({ message: 'User, project, page, or version not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting version', error });
  }
});

export default router;