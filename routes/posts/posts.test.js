const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("GET /posts", () => {
  describe("성공시", () => {
    it("post객체가 담긴 배열리스트를 반환한다", done => {
      request(app)
        .get("/posts")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an.instanceOf(Array);
          done();
        });
    });
  });
});

describe("GET /posts/1", () => {
  describe("성공시", () => {
    it("id값이 1인 객체를 반환한다", done => {
      request(app)
        .get("/posts/1")
        .expect(200)
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id값이 숫자가 아닌경우 400으로 응답한다", done => {
      request(app)
        .get("/posts/none")
        .expect(400)
        .end(done);
    });

    it("id로 post를 찾을수 없는경우 404으로 응답한다", done => {
      request(app)
        .get("/posts/100")
        .expect(404)
        .end(done);
    });
  });
});
