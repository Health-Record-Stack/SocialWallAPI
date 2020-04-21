/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const sinon = require("sinon");
const chai = require("chai");
const dbHandler = require("./db-handler");
const SocialwallController = require("../controllers/socialwallController");
const SocialwallDetails = require("../models/socialwalldetailModel");
const seed = require("./socialwallseed.json");
const logger = require("../winston");

const { expect } = chai;
/**
 * Seed the database with products.
 */
const createSocialWallItems = async () => {
  await SocialwallDetails.insertMany(seed);
};

/**
 * Connect to a new in-memory database before running any tests.
 */
before(async () => {
  await dbHandler.connect();
});

/**
 * Seed the database.
 */
beforeEach(async () => {
  await createSocialWallItems();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
after(async () => {
  await dbHandler.closeDatabase();
});

describe("SocialwallController DB calls", () => {
  const mockRequest = () => ({
    query: { limit: 10, skip: 0 },
    connection: { encrypted: false },
    headers: { host: "localhost" },
  });
  const mockResponse = () => {
    const res = { statusCode: 200 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };
  it("should work without error", async () => {
    const req = mockRequest();
    const res = mockResponse();
    try {
      await SocialwallController(SocialwallDetails).fetchSocialwallItems(
        req,
        res
      );
      expect(res.statusCode).to.equal(200);
    } catch (error) {
      throw error;
    }
  });
});

describe("SocialwallController => fetchSocialwallItems", () => {
  it("should return 200 OK with correct input");
  it("should return 500 Error with invalid input");
});

describe("SocialwallController => fetchSocialwallItemById", () => {
  it("should return 200 OK with correct input");
  it("should return 500 Error with invalid input");
});

describe("SocialwallController => addSocialwallItems", () => {
  it("should return 200 OK with correct input");
  it("should return 500 Error with invalid input");
});

describe("SocialwallController => patchSocialwallItem", () => {
  it("should return 200 OK with correct input");
  it("should return 500 Error with invalid input");
});

describe("SocialwallController => deleteSocialwallItemById", () => {
  it("should return 200 OK with correct input");
  it("should return 500 Error with invalid input");
});
