'use strict';

var Hapi = require('hapi');
var nunjucks = require('nunjucks');

var loader = new nunjucks.FileSystemLoader('views');
var envConfig = {
  autoescape: true,
  tags: {
    // blockStart: '<%',
    // blockEnd: '%>',
    // commentStart: '<#',
    // commentEnd: '#>',
    // variableStart: '{{h',
    // variableEnd: '}}'
  }
};

var njEnv = new nunjucks.Environment(loader, envConfig);


function NunjucksView(env) {
  if (!env) {
    env = nunjucks.configure({
      autoescape: true
    });
  }
  this.compile = function (tmpl) {
    var compiledTemplate = new nunjucks.Template(tmpl, env);
    return function (context) {
      return compiledTemplate.render(context);
    };
  };
}

var serverOptions = {
  debug: {
    request: ['hapi', 'error']
  }
};

var server = new Hapi.Server(3000, serverOptions);
server.views({
  path: 'views',
  engines: {
    html: {
      module: new NunjucksView(njEnv),
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
