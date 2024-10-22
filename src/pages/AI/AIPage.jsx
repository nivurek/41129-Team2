import React from 'react';

const AIPage = ({userData, handleLogin}) => {

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI("AIzaSyBfxNNpOA6JCN-nLg3NCfEg-CHT8n7lr2I");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage("Can you provide 5 simple words");
    console.log(result.response.text());
  }
  
  run();


  return (
      <div> 
        AI
      </div>
  );
};


export default AIPage;