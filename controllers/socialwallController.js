const apiResponse = require("../helpers/apiResponse");

exports.fetchSocialwallItems = (req, res) => {
  const response = { value: "some valuable output", id: 101, valuable: true };
  return apiResponse.successResponse(res, response);
};
