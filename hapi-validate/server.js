'use strict';

var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server(3000);

var makeResults = require('./lib/results').makeResults;

server.route({
  'method': 'GET',
  'path': '/api/poc/{active}/{count?}',
  'handler': function (req, reply) {
    var active = (req.params.active === 'active');
    var count = req.params.count;
    var results = makeResults(active, count);
    reply(results);
  },
  'config': {
    'validate': {
      'params': {
        'active': Joi.string().required().valid('active', 'inactive'),
        'count': Joi.number().min(1).max(30).default(3)
      }
    }
  }
});

server.start(function () {
  console.log('Server running at: %s', server.info.uri);
});
