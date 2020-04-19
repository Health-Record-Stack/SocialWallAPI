const express = require("express");
const { fetchSocialwallItems } = require("../controllers/socialwallController");

const socialwallRouter = express.Router();

socialwallRouter.get("/socialwalls", fetchSocialwallItems);

module.exports = socialwallRouter;
