const express = require("express");
const SocialwallController = require("../controllers/socialwallController");

const socialwallRouter = express.Router();

function routes(SocialwallDetails) {
  socialwallRouter.get(
    "/socialwalls",
    SocialwallController(SocialwallDetails).fetchSocialwallItems,
  );

  return socialwallRouter;
}

module.exports = routes;
