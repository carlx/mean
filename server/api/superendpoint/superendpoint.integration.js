'use strict';

var app = require('../..');
import request from 'supertest';

var newSuperendpoint;

describe('Superendpoint API:', function() {

  describe('GET /api/superendpoints', function() {
    var superendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/superendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          superendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      superendpoints.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/superendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/superendpoints')
        .send({
          name: 'New Superendpoint',
          info: 'This is the brand new superendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSuperendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created superendpoint', function() {
      newSuperendpoint.name.should.equal('New Superendpoint');
      newSuperendpoint.info.should.equal('This is the brand new superendpoint!!!');
    });

  });

  describe('GET /api/superendpoints/:id', function() {
    var superendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/superendpoints/' + newSuperendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          superendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      superendpoint = {};
    });

    it('should respond with the requested superendpoint', function() {
      superendpoint.name.should.equal('New Superendpoint');
      superendpoint.info.should.equal('This is the brand new superendpoint!!!');
    });

  });

  describe('PUT /api/superendpoints/:id', function() {
    var updatedSuperendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/superendpoints/' + newSuperendpoint._id)
        .send({
          name: 'Updated Superendpoint',
          info: 'This is the updated superendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSuperendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSuperendpoint = {};
    });

    it('should respond with the updated superendpoint', function() {
      updatedSuperendpoint.name.should.equal('Updated Superendpoint');
      updatedSuperendpoint.info.should.equal('This is the updated superendpoint!!!');
    });

  });

  describe('DELETE /api/superendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/superendpoints/' + newSuperendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when superendpoint does not exist', function(done) {
      request(app)
        .delete('/api/superendpoints/' + newSuperendpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
