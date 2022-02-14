const Filter = require('broccoli-persistent-filter');
const Handlebars = require('handlebars');
const md5 = require('md5');

class HandlebarsPrecompilerFilter extends Filter {
  constructor(inputNode, options = {}) {
    super(inputNode, {
      name: 'broccoli-handlebars-precompiler',
      annotation: options.annotation
    });
    this.extensions = options.extensions || ['hbs', 'handlebars'];
    this.targetExtension = options.targetExtension || ['js'];

    this.inputOptionsChecksum = md5(options);
    this.dependencyVersionChecksum = md5(require('./package.json').version);
  }

  processString(content) {
    try {
      let precompiled = Handlebars.precompile(content);
      return `import Handlebars from 'handlebars';
      const _template = Handlebars.template(${precompiled});
      export default _template;`;
    } catch (err) {
      console.log(err.message);
    }
  }

  cacheKey() {
    return md5(Filter.prototype.call(this) + this.inputOptionsChecksum + this.dependencyVersionChecksum);
  }

  cacheKeyProcessString(content) {
    return md5(content);
  }
}

module.exports = HandlebarsPrecompilerFilter;