import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Import the polyfill
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const app = express();
const port = 5001;
const genAI = new GoogleGenerativeAI('AIzaSyBfxNNpOA6JCN-nLg3NCfEg-CHT8n7lr2I');
const fileManager = new GoogleAIFileManager('AIzaSyBfxNNpOA6JCN-nLg3NCfEg-CHT8n7lr2I');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.post('/upload-to-gemini', async (req, res) => {
  try {
    const { fileUri, mimeType } = req.body;

    if (!fileUri || !mimeType) {
      return res.status(400).json({ error: 'File URI and MIME type are required.' });
    }

    console.log('Processing file from URL:', fileUri);

    // Start a chat session with the Gemini model
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
                fileUri: fileUri,
              },
            },
            { text: 'Describe the uploaded image in detail.' },
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
