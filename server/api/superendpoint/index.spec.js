'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var superendpointCtrlStub = {
  index: 'superendpointCtrl.index',
  show: 'superendpointCtrl.show',
  create: 'superendpointCtrl.create',
  update: 'superendpointCtrl.update',
  destroy: 'superendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var superendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './superendpoint.controller': superendpointCtrlStub
});

describe('Superendpoint API Router:', function() {

  it('should return an express router instance', function() {
    superendpointIndex.should.equal(routerStub);
  });

  describe('GET /api/superendpoints', function() {

    it('should route to superendpoint.controller.index', function() {
      routerStub.get
        .withArgs('/', 'superendpointCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/superendpoints/:id', function() {

    it('should route to superendpoint.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'superendpointCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/superendpoints', function() {

    it('should route to superendpoint.controller.create', function() {
      routerStub.post
        .withArgs('/', 'superendpointCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/superendpoints/:id', function() {

    it('should route to superendpoint.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'superendpointCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/superendpoints/:id', function() {

    it('should route to superendpoint.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'superendpointCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/superendpoints/:id', function() {

    it('should route to superendpoint.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'superendpointCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
