const request = require("supertest");
const should = require("should");
const app = require("../app");

describe("/", () => {
  describe("성공", () => {
    it("test", () => {
      request(app)
        .get("/")
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.value("test", 1);
        });
    });
  });
});