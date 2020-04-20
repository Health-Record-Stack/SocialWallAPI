/* eslint-disable no-unused-expressions */
const chai = require("chai");
const sinon = require("sinon");

const { expect } = chai;

const routes = require("../routes/socialwallRoutes");

describe("socialWallRouts=>", () => {
  let socialwallRouter = {};
  let SocialwallDetails = {};
  beforeEach(() => {
    socialwallRouter = { get: sinon.spy() };
    SocialwallDetails = sinon.spy();
  });

  it("should call get method with /socialwalls", () => {
    routes(socialwallRouter, SocialwallDetails);
    expect(socialwallRouter.get.calledOnce).to.be.true;
    expect(socialwallRouter.get.getCall(0).args[0]).to.be.equals(
      "/socialwalls",
    );
  });
  it("should accept 2 params", () => {
    routes(socialwallRouter, SocialwallDetails);
    expect(socialwallRouter.get.getCall(0).args).to.have.lengthOf(2);
  });
  it("should return first param", () => {
    const socialwallRouterModified = routes(
      socialwallRouter,
      SocialwallDetails,
    );
    expect(socialwallRouterModified).to.equal(socialwallRouter);
  });
});
