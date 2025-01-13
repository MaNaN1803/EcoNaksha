const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

async function queryGemini(prompt) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [{ role: "user", parts: [{ text: prompt }] }],
      });
  
      const result = await chatSession.sendMessage(prompt);
      console.log("Raw Response:", result.response.text()); // Log raw response
      return result.response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to retrieve data from Gemini API.");
    }
  }
  

module.exports = { queryGemini };
