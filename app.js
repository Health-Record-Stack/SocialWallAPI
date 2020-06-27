const express = require("express");
const debug = require("debug")("app");
const mongoose = require("mongoose");
const cors = require("cors");

const morgan = require("morgan");
const path = require("path");
// const rfs = require("rotating-file-stream");
const winston = require("./winston");
const apiResponse = require("./helpers/apiResponse");
const SocialwallDetails = require("./models/socialwalldetailModel");
require("dotenv").config({ path: path.resolve(process.cwd(), "config/.env") });

const app = express();
app.use(express.json());
// To allow cross-origin requests
app.use(cors());

const socialwallRouter = require("./routes/socialwallRoutes");

// setup the logger
app.use(
  morgan("combined", {
    stream: winston.stream,
    skip: (req, res) => res.statusCode < 400,
  })
);

const port = process.env.port || 8080;

const { MONGODB_URL } = process.env;

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("App is running ... \n");
      console.log("Press CTRL + C to stop the process. \n");
    }
  })
  .catch((err) => {
    console.log("App starting error:", err.message);
    process.exit(1);
  });
// const db = mongoose.connection;

app.use("/socialwall/api", socialwallRouter(express.Router(), SocialwallDetails));

app.get("/socialwall", (req, res) => {
  console.log("Welcome to Social Wall API v1");
  res.send("Welcome to Social Wall API v1");
});

app.get("/", (req, res) => {
  console.log("Welcome to Social Wall API v1, try /socialwall");
  res.send("Welcome to Social Wall API v1, try /socialwall");
});

// throw 404 if URL not found
app.all("*", (req, res) => apiResponse.notFoundResponse(res, "API route not found"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port : ${port}`);
});

module.exports = app;
