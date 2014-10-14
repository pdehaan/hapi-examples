'use strict';

var nunjucks = require('nunjucks');

module.exports = function NunjucksView(searchPath) {
  var loader = new nunjucks.FileSystemLoader(searchPath);
  var env = new nunjucks.Environment(loader, {
    autoescape: true
  });

  this.compile = function (template) {
    var compiledTemplate = new nunjucks.Template(template, env);
    return function (context) {
      return compiledTemplate.render(context);
    };
  };
};
