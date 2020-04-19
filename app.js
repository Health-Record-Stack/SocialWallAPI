const express = require("express");
const debug = require("debug")("app");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
// const path = require("path");
// const rfs = require("rotating-file-stream");

const apiResponse = require("./helpers/apiResponse");
const morganSettings = require("./helpers/morganConfig");
const SocialwallDetails = require("./models/socialwalldetailModel");

const app = express();
const socialwallRouter = require("./routes/socialwallRoutes");

// setup the logger
app.use(morgan("combined", morganSettings(__dirname)));

const port = process.env.port || 11336;

const { MONGODB_URL } = process.env;

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      debug("Connected to %s", MONGODB_URL);
      debug("App is running ... \n");
      debug("Press CTRL + C to stop the process. \n");
    }
  })
  .catch((err) => {
    debug("App starting error:", err.message);
    process.exit(1);
  });
// const db = mongoose.connection;

app.use("/api", socialwallRouter(SocialwallDetails));

app.get("/", (req, res) => {
  res.send("Welcome to Social Wall API");
});

// throw 404 if URL not found
app.all("*", (req, res) => apiResponse.notFoundResponse(res, "API route not found"));

app.listen(port, () => {
  debug(`Listening on port : ${port}`);
});

function sum(x, y) {
  return x + y;
}

sum(1, 2);
