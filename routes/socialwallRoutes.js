const SocialwallController = require("../controllers/socialwallController");

function routes(socialwallRouter, SocialwallDetails) {
  socialwallRouter.get(
    "/socialwalls",
    SocialwallController(SocialwallDetails).fetchSocialwallItems,
  );

  return socialwallRouter;
}

module.exports = routes;
