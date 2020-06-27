/* eslint-disable no-param-reassign */
const { validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const logger = require("../winston");

function SocialwallController(SocialwallDetails) {
  const fetchSocialwallItems = (req, res) => {
    const query = {
      $or: [{ ishidden: { $exists: false } }, { ishidden: false }],
      // eslint-disable-next-line no-dupe-keys
      $or: [{ isdeleted: { $exists: false } }, { isdeleted: false }],
    };

    const limit = +req.query.limit || 10;
    const skip = +req.query.skip || 0;
    SocialwallDetails.find(
      query,
      null,
      { limit, skip, sort: { createdon: -1 } },
      (e, dbRes) => {
        if (e) {
          apiResponse.ErrorResponse(res, "DB fetch failed");
          logger.error(e);
          throw e;
        } else {
          // Call for total items
          SocialwallDetails.count(query, (error, count) => {
            if (e) {
              apiResponse.ErrorResponse(res, "DB fetch failed");
              logger.error(error);
            }

            // Adding HATEOAS
            const socialwallitems = dbRes.map((item) => {
              const newItem = item.toJSON();
              newItem.links = {
                self: `${
                  req.connection.encrypted ? "https" : "http"
                  // eslint-disable-next-line no-underscore-dangle
                }://${req.headers.host}/api/socialwalls/${newItem._id}`,
              };
              return newItem;
            });

            apiResponse.successResponseWithData(res, "Fetch Succeeded", {
              socialwallitems,
              total: count,
            });
          });
        }
      }
    );
  };

  const fetchSocialwallItemById = (req, res) => {
    const query = {
      _id: req.params.id,
    };

    return SocialwallDetails.findOne(query)
      .then((dbRes) => {
        if (dbRes) {
          // Adding HATEOAS
          const newItem = dbRes.toJSON();
          newItem.links = {
            collection: `${
              req.connection.encrypted ? "https" : "http"
              // eslint-disable-next-line no-underscore-dangle
            }://${req.headers.host}/api/socialwalls`,
            collectionWithPagination: `${
              req.connection.encrypted ? "https" : "http"
              // eslint-disable-next-line no-underscore-dangle
            }://${req.headers.host}/api/socialwalls?limit=10&skip=0`,
          };
          apiResponse.successResponseWithData(res, "Fetch Succeeded", newItem);
        } else apiResponse.notFoundResponse(res, "No records found");
      })
      .catch((e) => {
        apiResponse.ErrorResponse(res, "DB fetch failed");
        logger.error(e);
      });
  };

  const addSocialwallItems = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, errors);
    }
    req.body.socialwallitems.forEach((s) => {
      if (!s.createdon) s.createdon = new Date();
    });
    // Insert to server
    return SocialwallDetails.insertMany(req.body.socialwallitems, (e, docs) => {
      if (e) {
        apiResponse.ErrorResponse(res, "Insert failed");
        logger.error(e);
      } else apiResponse.successResponseWithData(res, "Insert Succeeded", docs);
    });
  };

  const patchSocialwallItem = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, errors);
    }
    // Patch values
    const query = {
      _id: req.params.id,
    };
    return SocialwallDetails.findOne(query)
      .then((dbRes) => {
        // const socialwallitem = dbRes;
        Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const val = item[1];
          // eslint-disable-next-line no-param-reassign
          dbRes[key] = val;
        });
        dbRes.save((e) => {
          if (e) {
            apiResponse.ErrorResponse(res, "Update failed");
            logger.error(e);
          } else {
            apiResponse.successResponseWithData(res, "Update Succeeded", dbRes);
          }
        });
      })
      .catch((e) => {
        apiResponse.ErrorResponse(res, "Update failed");
        logger.error(e);
      });
  };

  const deleteSocialwallItemById = (req, res) => {
    // Patch values
    const query = {
      _id: req.params.id,
    };
    return SocialwallDetails.deleteOne(query)
      .then((dbStatus) => {
        const { deletedCount } = dbStatus;
        apiResponse.successResponseWithData(
          res,
          "Delete Succeeded",
          deletedCount
        );
      })
      .catch((e) => {
        apiResponse.ErrorResponse(res, "Delete failed");
        logger.error(e);
      });
  };

  return {
    fetchSocialwallItems,
    fetchSocialwallItemById,
    addSocialwallItems,
    patchSocialwallItem,
    deleteSocialwallItemById,
  };
}

module.exports = SocialwallController;
