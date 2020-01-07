import request from "supertest";
import { expect } from "chai";
import server from "../../server";

const app = server.app;

describe("GET /posts", () => {
  describe("성공시", () => {
    it("post객체가 담긴 배열리스트를 반환한다", done => {
      request(app)
        .get("/posts")
        .expect(200)
        .end((err, res) => {
          expect(res.body).be.an.instanceof(Array);
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
          expect(res.body).have.property("id", 1);
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

describe("DELTE /posts/1", () => {
  describe("성공시", () => {
    it("id값이 1인 객체를 삭제한다", done => {
      request(app)
        .delete("/posts/1")
        .expect(204)
        .end(done);
    });
  });

  describe("실패시", () => {
    it("해당 id값이 숫자가 아닌경우", done => {
      request(app)
        .delete("/posts/none")
        .expect(400)
        .end(done);
    });
  });
});

describe("POST /posts", () => {
  describe("성공시", () => {
    let body: any;
    let title = "4제목";

    beforeEach(done => {
      request(app)
        .post("/posts")
        .send({
          title,
          contents: "새로생성된 본문입니다"
        })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("생성된 post 객체를 반환한다", () => {
      expect(body).have.property("id");
    });

    it("생성된 객체는 title을 갖는다", () => {
      expect(body).have.property("title", title);
    });
  });

  describe("실패시", () => {
    it("필수 파라미터가 누락시", done => {
      request(app)
        .post("/posts")
        .send({
          title: "",
          contents: ""
        })
        .expect(400)
        .end(done);
    });
  });
});

describe("PUT /posts/:id", () => {
  describe("성공시", () => {
    it("변경된 property 값으로 수정된 객체 반환", done => {
      let title = "변경된 제목";
      let contents = "변경된 콘텐츠";

      request(app)
        .put("/posts/2")
        .send({
          title,
          contents
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body).have.property("title", title);
          expect(res.body).have.property("contents", contents);
          done();
        });
    });
  });
});

describe("실패시", () => {
  let title = "변경된 제목";
  let contents = "변경된 콘텐츠";

  it("id값이 숫자가 아닌 경우", done => {
    request(app)
      .put("/posts/none")
      .send({
        title,
        contents
      })
      .expect(400)
      .end(done);
  });

  it("필수 파라미터가 누락시", done => {
    request(app)
      .put("/posts/2")
      .send({
        title: "",
        contents: ""
      })
      .expect(400)
      .end(done);
  });

  it("id로 post를 찾을수 없는경우 404으로 응답한다", done => {
    request(app)
      .put("/posts/100")
      .send({
        title,
        contents
      })
      .expect(404)
      .end(done);
  });
});
