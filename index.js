import express  from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
// import serviceAccount from "./serviceData.json";



dotenv.config();

const serviceAccount = {
  type: process.env.type,
  project_id:process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id:process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain
}
 


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
  
  if (telegram_id) {
    return res.status(400).json({ error: "Telegram ID is required" });
  }

  try {
    const customToken = await admin.auth().createCustomToken(telegram_id);
    res.json({ firebase_token: customToken });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Error creating custom token" });
  }
});

// Set server to listen on port 5000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
