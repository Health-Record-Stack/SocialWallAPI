const express = require("express");
const debug = require("debug")("app");

const app = express();

const port = process.env.port || 11335;

app.get("/", (req, res) => {
  res.send("Welcome to Social Wall API");
});

app.listen(port, () => {
  debug(`Listening on port : ${port}`);
});
