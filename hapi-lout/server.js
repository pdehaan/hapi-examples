'use strict';

var lout = require('lout');
var Hapi = require('hapi');

var server = new Hapi.Server(3000);

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
      reply('hello world');
    },
    config: {
      description: 'Default route',
      notes: 'Note for the default route',
      tags: ['default', 'hey world']
    }
  }, {
    method: 'GET',
    path: '/hello',
    handler: function (req, reply) {
      reply('hello');
    },
    config: {
      description: '/hello route',
      notes: 'Note for the `/hello` route',
      tags: ['hello']
    }
  }, {
    method: 'GET',
    path: '/world',
    handler: function (req, reply) {
      reply('world');
    },
    config: {
      description: '/world route',
      notes: 'Note for the `/world` route',
      tags: ['world']
    }
  }, {
    method: 'GET',
    path: '/private',
    handler: function (req, reply) {
      reply('private route');
    },
    config: {
      description: '/private route',
      notes: 'Note for the `/private` route. This documentation should not appear in /docs.',
      tags: ['private', 'undocumented'],
      plugins: {
        lout: false
      }
    }
  }
]);

server.pack.register({
  plugin: lout
}, function () {
  console.log('Hapi %s server running at: %s', Hapi.version, server.info.uri);
  console.log('To view the generated route documentation, see %s/docs', server.info.uri);
  server.start();
});
