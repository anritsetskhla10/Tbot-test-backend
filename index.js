import express  from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();


// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceData.json");;

console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Test Route to Verify Server
app.get("/", (req, res) => {
  res.send("Backend Server is Running!");
});

// Custom Token Generation Endpoint
app.post("/generate-token", async (req, res) => {
  const { telegram_id } = req.body;
  
  if (!telegram_id) {
    return res.status(400).json({ error: "Telegram ID is required" });
  }

  try {
    const customToken = await admin.auth().createCustomToken(telegram_id);
    res.json({ firebase_token: customToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating custom token" });
  }
});

// Set server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
