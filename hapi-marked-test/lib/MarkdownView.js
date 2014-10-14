'use strict';

var marked = require('marked');

module.exports = function MarkdownView() {
  this.compile = function compile(template) {
    return function (context) {
      return marked(template, context);
    };
  };
};
