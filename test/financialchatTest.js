const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Testing the financial chat front end responses", function () {
  it("Get the login page", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.have.property("text");
        expect(res.text).to.contains("username");
        expect(res.text).to.contains("room");
        done(err);
      });
  });

  it("Join a chat room", (done) => {
    chai
      .request(server)
      .get("/join")
      .query({ username: "userTest", room: "roomTest" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.text).to.contains(`<h4>Id:<span id="userId"></span></h4>`);
        done(err);
      });
  });

  it("Redirect if the username and room are undefined", (done) => {
    chai
      .request(server)
      .get("/join")
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(304);

        done(err);
      });
  });

  it("Redirect if the room is undefined", (done) => {
    chai
      .request(server)
      .get("/join")
      .query({ username: "userTest" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(304);

        done(err);
      });
  });

  it("Redirect if the username is undefined", (done) => {
    chai
      .request(server)
      .get("/join")
      .query({ room: "roomTest" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(304);

        done(err);
      });
  });

  it("Redirect if the username is less thant 3", (done) => {
    chai
      .request(server)
      .get("/join")
      .query({ username: "us", room: "roomTest" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(304);

        done(err);
      });
  });

  it("Redirect if the room length is less than 3", (done) => {
    chai
      .request(server)
      .get("/join")
      .query({ username: "userTest", room: "ro" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(304);

        done(err);
      });
  });

  it("Redirect if the username or room length is less than 3 after removing special characters", (done) => {
    chai
      .request(server)
      .get("/join")
      .query({ username: "userTest", room: "ro!!!!!!" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(304);

        done(err);
      });
  });
});
