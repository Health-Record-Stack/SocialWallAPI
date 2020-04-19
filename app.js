const express = require("express");
const debug = require("debug")("app");
const apiResponse = require("./helpers/apiResponse");

const app = express();
const socialwallRouter = require("./routes/socialwallRoutes");

const port = process.env.port || 11336;

app.use("/api", socialwallRouter);

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
