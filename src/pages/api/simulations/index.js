import { queryGemini } from "@/lib/geminiApi";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const response = await queryGemini(prompt);
    res.status(200).json({ result: JSON.parse(response) });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Simulation failed", error: error.message });
  }
}
