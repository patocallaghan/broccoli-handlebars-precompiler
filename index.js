const Filter = require('broccoli-filter');
const Handlebars = require('handlebars');

module.exports = HandlebarsFilters;

HandlebarsFilters.prototype = Object.create(Filter.prototype);
HandlebarsFilters.prototype.constructor = HandlebarsFilters;

function HandlebarsFilters (tree, options) {
  if (!(this instanceof HandlebarsFilters)) {
    return new HandlebarsFilters(tree, options);
  }

  if (!('srcDir' in options)) {
    console.log('HandlebarsFilters: ERROR! No srcDir set.');
    return tree;
  }

  // Set default options
  this.options = options || {};
  this.options.extensions = options.extensions || ['hbs', 'handlebars'];
  this.options.targetExtension = options.targetExtension || ['js'];
  this.options.srcDir = options.srcDir || null;

  // Set options necessary for the filter
  filterOptions = {
    srcDir: this.options.srcDir,
    extensions: this.options.extensions,
    targetExtension: this.options.targetExtension
  };

  Filter.call(this, tree, filterOptions);
}

HandlebarsFilters.prototype.processString = function (string, srcFile) {
  try {
    let precompiled = Handlebars.precompile(string, this.options);
    return `import Handlebars from 'handlebars';
    const _template = Handlebars.template(${precompiled});
    export default _template;`;
  } catch (err) {
    console.log(err.message);
  }
};