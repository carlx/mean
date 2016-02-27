/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/superendpoints              ->  index
 * POST    /api/superendpoints              ->  create
 * GET     /api/superendpoints/:id          ->  show
 * PUT     /api/superendpoints/:id          ->  update
 * DELETE  /api/superendpoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Superendpoint from './superendpoint.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Superendpoints
export function index(req, res) {
  res.json({ell: 'dupa'});
  Superendpoint.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Superendpoint from the DB
export function show(req, res) {
  Superendpoint.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Superendpoint in the DB
export function create(req, res) {
  Superendpoint.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Superendpoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Superendpoint.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Superendpoint from the DB
export function destroy(req, res) {
  Superendpoint.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
