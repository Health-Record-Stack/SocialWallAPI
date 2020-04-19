const mongoose = require("mongoose");

const { Schema } = mongoose;

const SocialWallSchema = new Schema({
  type: { type: String, required: true },
  html: { type: String, required: true },
  createdon: { type: Date, required: true },
  isdeleted: { type: Boolean, required: true },
  ishidden: { type: Boolean, required: true },
});

module.exports = mongoose.model("socialwalldetails", SocialWallSchema);
