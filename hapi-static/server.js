'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server(3000);

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true,
            index: true,
            lookupCompressed: true
        }
    }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
