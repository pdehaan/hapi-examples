'use strict';

var Hapi = require('hapi');
var NunjucksEnv = require('./lib/NunjucksEnv');

var serverOptions = {
  debug: {
    request: ['error']
  }
};

var server = new Hapi.Server(3000, serverOptions);
server.views({
  path: 'views',
  engines: {
    html: {
      module: new NunjucksEnv('views'),
      contentType: 'text/html'
    }
  }
});

server.route([{
  method: 'GET',
  path: '/',
  handler: function (res, reply) {
    reply.view('index', {
      title: 'Nice site',
      name: 'Jake',
      header: '<hr/>',
      footer: '<hr/><p>&copy; 2014</p>'
    });
  }
}, {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
      listing: true,
      lookupCompressed: true
    }
  }
}]);
server.start(function () {
  console.log('Hapi %s server running at %s', Hapi.version, server.info.uri);
});
