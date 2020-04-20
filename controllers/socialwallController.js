const { validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");

function SocialwallController(SocialwallDetails) {
  const fetchSocialwallItems = (req, res) => {
    const query = {
      $or1: [{ ishidden: { $exists: false } }, { ishidden: false }],
      // eslint-disable-next-line no-dupe-keys
      $or: [{ isdeleted: { $exists: false } }, { isdeleted: false }],
    };

    const limit = +req.query.limit || 10;
    const skip = +req.query.skip || 0;

    return SocialwallDetails.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdon: -1 })
      .then((dbRes) => {
        apiResponse.successResponseWithData(res, "Fetch Succeeded", dbRes);
      })
      .catch((e) => {
        apiResponse.ErrorResponse(res, "DB fetch failed");
      });
  };

  const fetchSocialwallItemById = (req, res) => {
    const query = {
      _id: req.params.id,
    };

    return SocialwallDetails.findOne(query)
      .then((dbRes) => {
        apiResponse.successResponseWithData(res, "Fetch Succeeded", dbRes);
      })
      .catch((e) => {
        apiResponse.ErrorResponse(res, "DB fetch failed");
        throw e;
      });
  };

  const addSocialwallItems = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, errors);
    }

    // Inser to server
    return SocialwallDetails.insertMany(
      req.body.socialwallitems,
      (error, docs) => {
        apiResponse.successResponseWithData(res, "Insert Succeeded", docs);
      }
    );
  };

  return { fetchSocialwallItems, fetchSocialwallItemById, addSocialwallItems };
}

module.exports = SocialwallController;
