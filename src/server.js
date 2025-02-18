import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";

//rato vwert ./?
import connectToMongo from "./config/mongo.js";
import todoRouter from "./routes/todoRouter.js";
import SwaggerMiddleware from "./middlewares/swagger-middleware.js";
import cors from "cors";

const app = express();
dotenv.config();
connectToMongo();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api", todoRouter);
app.use("/", ...SwaggerMiddleware());

// Define your routes and other middleware here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
