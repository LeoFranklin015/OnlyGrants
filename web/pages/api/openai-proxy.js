// pages/api/chatProxy.js
import axios from "axios";

export default async function handler(req, res) {
  // const { projectsOSOData } = req.body;
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "https://0x993c4fb6a3dadf9cc5f259982d19fa0a5de92852.us.gaianet.network/v1/chat/completions",
      // '{"messages":[{"role":"system", "content": "You are a helpful assistant."}, {"role":"user", "content": "Suggest me projects related to AI"}]}',
      {
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: "Suggest me projects related to AI",
          },
        ],
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
