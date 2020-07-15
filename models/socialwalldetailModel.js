const mongoose = require("mongoose");

const { Schema } = mongoose;

const SocialWallSchema = new Schema({
  type: { type: String, required: true },
  html: { type: String, required: true },
  createdon: { type: Date, required: true },
  isdeleted: { type: Boolean, required: false },
  ishidden: { type: Boolean, required: false },
});

module.exports = mongoose.model("socialwalldetails", SocialWallSchema);
