import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { pipeline } from 'stream/promises';
import mime from 'mime-types';
import dotenv from 'dotenv'; 
import records from "./routes/record.js";
import connectDB from "./db/connection.js";
import AuthRoute from "./routes/auth.js";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY is not defined in the environment variables.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5001;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
app.use(cors({
  origin: 'http://localhost:5050',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
connectDB();
app.use("/record", records);
app.use("/auth", AuthRoute);

app.use(express.json());

async function downloadFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download file from ${url}: ${response.statusText}`);
  }

  let extension = path.extname(new URL(url).pathname);
  if (!extension) {
    const contentType = response.headers.get('content-type');
    if (contentType) {
      const ext = mime.extension(contentType); 
      extension = ext ? `.${ext}` : '';
    }
  }

  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `upload-${Date.now()}${extension}`);

  const fileStream = fs.createWriteStream(tempFilePath);
  await pipeline(response.body, fileStream);

  return tempFilePath;
}

app.post('/upload-to-gemini', async (req, res) => {
  try {
    const { fileUri, mimeType } = req.body;

    if (!fileUri || !mimeType) {
      return res.status(400).json({ error: 'File URI and MIME type are required.' });
    }

    const tempFilePath = await downloadFile(fileUri);
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: mimeType,
      displayName: path.basename(tempFilePath),
    });
    const file = uploadResult.file;

    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error('Error deleting temp file:', err);
      } else {
        console.log('Deleted temp file:', tempFilePath);
      }
    });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      history: [
        {
          role: 'user',
          parts: [
            {
              fileData: {
                mimeType: mimeType,
                fileUri: file.uri, 
              },
            },
            { text: 'Provide some UI UX improvement suggestions on the UI UX of the screenshot provided.' },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage('Analyze this image.');
    console.log('Chat session result:', result);

    res.json({ analysis: result.response.text() });

  } catch (error) {
    console.error('Error processing image URL:', error);
    res.status(500).json({ error: 'Failed to process the image.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
