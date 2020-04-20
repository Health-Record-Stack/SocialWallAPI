/* eslint-disable no-unused-expressions */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

const { expect } = chai;
chai.should();

chai.use(chaiHttp);

describe("/GET All socialwalls items", () => {
  it("it should GET all the socialwall items", (done) => {
    chai
      .request(server)
      .get("/api/socialwalls?limit=2&skip=1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Fetch Succeeded");
        expect(res.body.data).to.be.an("array");
        expect(res.body.data).to.have.lengthOf(2);
        done();
      });
  });
});
