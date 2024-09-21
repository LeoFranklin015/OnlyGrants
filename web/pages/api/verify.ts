// pages/api/worldcoin.js
import axios from "axios";

export default async function handler(req, res) {
  // Get the proof from the request body
  const { proof } = req.body;
  const app_id = "app_e2e1326a0f8ee7f7af2a27451fd9175d";
  const action = "verify-human";

  try {
    // Make a POST request to Worldcoin's API to verify the proof
    const response = await axios.post(
      `https://developer.worldcoin.org/api/v1/verify/${app_id}`,
      {
        ...proof,
        action: action,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If the verification is successful, return the verified status
    if (response.status === 200 && response.data.success) {
      return res.status(200).json({ verified: true });
    } else {
      return res.status(200).json({ verified: false });
    }
  } catch (error) {
    // Handle any errors from the API call
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Error verifying Worldcoin proof" });
  }
}
