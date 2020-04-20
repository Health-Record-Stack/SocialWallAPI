const { check } = require("express-validator");
const SocialwallController = require("../controllers/socialwallController");

function routes(socialwallRouter, SocialwallDetails) {
  socialwallRouter.get(
    "/socialwalls",
    SocialwallController(SocialwallDetails).fetchSocialwallItems
  );

  socialwallRouter.post(
    "/socialwalls",
    [
      check("socialwallitems")
        .isArray()
        .withMessage("expecting an array of socialwallitems"),
      check("socialwallitems.*.type").custom((value) => {
        if (!value || (value && !["Twitter", "Facebook"].includes(value))) {
          throw new Error("type must be one of ['Twitter', 'Facebook']");
        }

        return true;
      }),
      check("socialwallitems.*.html").custom((value) => {
        if (!value) {
          throw new Error("html property is required");
        }
        return true;
      }),
      check("socialwallitems.*.createdon").custom((value) => {
        if (!value) {
          throw new Error("createdon property is required");
          // eslint-disable-next-line no-restricted-globals
        } else if (isNaN(Date.parse(value))) {
          throw new Error(
            "createdon property must be a valid date eg:2020-04-18T15:13:01.932Z"
          );
        }
        return true;
      }),
    ],
    SocialwallController(SocialwallDetails).addSocialwallItems
  );

  socialwallRouter.get(
    "/socialwalls/:id",
    SocialwallController(SocialwallDetails).fetchSocialwallItemById
  );

  socialwallRouter.patch(
    "/socialwalls/:id",
    [
      check("type").custom((value) => {
        if (value && !["Twitter", "Facebook"].includes(value)) {
          throw new Error("type must be one of ['Twitter', 'Facebook']");
        }

        return true;
      }),
      check("createdon").custom((value) => {
        // eslint-disable-next-line no-restricted-globals
        if (value && isNaN(Date.parse(value))) {
          throw new Error(
            "createdon property must be a valid date eg:2020-04-18T15:13:01.932Z"
          );
        }
        return true;
      }),
      check("ishidden").custom((value) => {
        // eslint-disable-next-line no-restricted-globals
        if (typeof value !== "boolean") {
          throw new Error("ishidden is either true or false [Boolean]");
        }
        return true;
      }),
    ],
    SocialwallController(SocialwallDetails).patchSocialwallItem
  );

  socialwallRouter.delete(
    "/socialwalls/:id",
    SocialwallController(SocialwallDetails).deleteSocialwallItemById
  );

  return socialwallRouter;
}

module.exports = routes;
