import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

// Define Version Schema
const versionSchema = new Schema({
  updated: { type: Date, default: Date.now }, // Last updated timestamp
  analysis: { type: String }, // AI Analysis
  screenshotUrl: { type: String }, // Link to the uploaded screenshot
  imagePalette: { type: Object, default: {} }, // Array of colors for the real palette
  updatedImagePalette: { type: Object, default: {} }, // Saved array of colors for an updated palette choice
  suggestedPalettes: [{ type: [String], default: [] }] // Array of imagePalette arrays
});

// Define Page Schema
const pageSchema = new Schema({
  name: { type: String, required: true }, // Name of the page
  updated: { type: Date, default: Date.now }, // Last updated timestamp
  versions: [versionSchema] // Versions related to the page
});

// Define Project Schema
const projectSchema = new Schema({
  name: { type: String, required: true }, // Name of the project
  updated: { type: Date, default: Date.now }, // Last updated timestamp
  pages: [pageSchema] // Array of pages within the project
});

// Define User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true }, // Username, must be unique
  email: { type: String, required: true, unique: true }, // User's email, must be unique
  password: { type: String, required: true }, // User's hashed password
  projects: [projectSchema], // Array of projects for the user
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// Export the User model
const User = mongoose.model('User', userSchema);

export default User;