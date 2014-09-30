'use strict';

var Hapi = require('hapi');
var handlebars = require('handlebars');

var serverOptions = {
  views: {
    engines: {
      html: handlebars
    },
    basePath: 'views',
    partialsPath: 'partials'
  }
};

var server = new Hapi.Server(3000, serverOptions);
server.route({
  method: 'GET',
  path: '/',
  handler: function (res, reply) {
    reply.view('index', {
      title: 'Nice site',
      name: 'Roger'
    });
  }
});
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
      listing: true,
      lookupCompressed: true
    }
  }
});
server.start(function () {
  console.log('Hapi %s server running at %s', Hapi.version, server.info.uri);
});
