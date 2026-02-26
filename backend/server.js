/* Create dotenv config */
require("dotenv").config();

/* Create imports */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
PORT = process.env.PORT;
URI = process.env.MONGOOSE_DEV_URI;

/* Configure CORS */
const corsConfig = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.options(cors(corsConfig));

/* Configure parsing middleware */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

/* Use routes */

/* Connect to MongoDB */
const mongooseConnect = async () => {
  try {
    await mongoose.connect(URI);
    app.listen(PORT, () => {
      console.log(`✅ App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    console.log("❌ Could not connect to MongoDB");
  }
};
mongooseConnect();
