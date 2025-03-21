import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import productRoutes from "./routes/productRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";

dotenv.config();

const app = express();

connectDB();

app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    version: "1.0.0",
    port: port,
  });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
