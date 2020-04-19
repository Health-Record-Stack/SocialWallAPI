const path = require("path");
const rfs = require("rotating-file-stream");

function setMorganConfig(dir) {
  // create a rotating write stream
  const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(dir, "log"),
  });

  const morganSettings = {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
  };

  return morganSettings;
}

module.exports = setMorganConfig;
