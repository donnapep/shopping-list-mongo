global.DATABASE_URL = "mongodb://localhost/shopping-list-test";

var chai = require("chai");
var chaiHttp = require("chai-http");

var server = require("../server.js");
var Item = require("../models/item");

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe("Shopping List", function() {
  before(function(done) {
    server.runServer(function() {
      Item.create(
        {name: "Broad beans"},
        {name: "Tomatoes"},
        {name: "Peppers"},
        function() {
          done();
        }
      );
    });
  });

  after(function(done) {
    Item.remove(function() {
      done();
    });
  });

  describe("GET", function() {
    it("should list items on GET", function(done) {
      chai.request(app)
        .get("/items")
        .end(function(err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body.should.have.length(3);
          res.body[0].should.be.a("object");
          res.body[0].should.have.property("_id");
          res.body[0].should.have.property("name");
          res.body[0]._id.should.be.a("string");
          res.body[0].name.should.be.a("string");
          res.body[0].name.should.equal("Broad beans");
          res.body[1].name.should.equal("Tomatoes");
          res.body[2].name.should.equal("Peppers");
          done();
        });
    });
  });

  describe("POST", function() {
    it("should add an item on POST", function(done) {
      chai.request(app)
        .post("/items")
        .send({"name": "Kale"})
        .end(function(err, res) {
          should.equal(err, null);
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("_id");
          res.body.name.should.be.a("string");
          res.body._id.should.be.a("string");
          res.body.name.should.equal("Kale");
          done();
        });
    });

    it("should return an HTTP 400 error when POSTing without body data");
    it("should return an HTTP 400 error when POSTing with invalid JSON");
  });

  describe("PUT", function() {
    it("should edit an item on put");
    it("should return an error when updating without specifying an id");
    it("should return an error when the ID in the URL does not match the ID in the body");
    it("should return an error when updating an item with a non-existent id");
    it("should return an error when updating without body data");
    it("should return an HTTP 400 error when updating with invalid JSON");
  });

  describe("DELETE", function() {
    it("should delete an item on delete");
    it("should return an error when deleting an item with a non-existent id");
    it("should return an error when deleting with missing id");
  });
});