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

    SocialwallDetails.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdon: -1 })
      .then((dbRes) => apiResponse.successResponseWithData(res, "Fetch Succeeded", dbRes))
      .catch((e) => apiResponse.ErrorResponse(res, "DB fetch failed"));
  };

  return { fetchSocialwallItems };
}

module.exports = SocialwallController;
