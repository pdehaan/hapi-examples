'use strict';

var Hapi = require('hapi');
var MarkdownView = require('./lib/MarkdownView');

var server = new Hapi.Server(3000);
server.views({
  path: 'docs',
  engines: {
    md: {
      module: new MarkdownView(),
      contentType: 'text/html'
    }
  }
});
server.route([{
  method: 'GET',
  path: '/',
  handler: function (res, reply) {
    reply.view('home');
  },
  config: {
    description: 'Get the default/home template.',
    notes: 'Renders the /docs/home.md file as HTML.',
    tags: ['home']
  }
}, {
  method: 'GET',
  path: '/home',
  handler: function (res, reply) {
    reply.view('home');
  },
  config: {
    description: 'Get the home template.',
    notes: 'Renders the /docs/home.md file as HTML.',
    tags: ['home']
  }
}, {
  method: 'GET',
  path: '/home/raw',
  handler: function (res, reply) {
    reply.file('docs/home.md');
  },
  config: {
    description: 'Get the default/home template as raw Markdown.',
    notes: 'Returns the /docs/home.md file as raw Markdown.',
    tags: ['home']
  }
}, {
  method: 'GET',
  path: '/api',
  handler: function (res, reply) {
    reply.view('api');
  },
  config: {
    description: 'Get the API template.',
    notes: 'Renders the /docs/api.md file as HTML.',
    tags: ['api']
  }
}]);

server.start(function () {
  console.log('Hapi %s server started at %s', Hapi.version, server.info.uri);
});
