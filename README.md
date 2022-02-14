# Broccoli Handlebars Precompiler ESM

**Disclaimer:** This repo is a fork of the great [jakkor/broccoli-handlebars-precompiler](https://www.github.com/jakkor/broccoli-handlebars-precompiler). The difference between implementations being that the original focused on only working with global JavaScript variables, whereas this version focuses on working with more modern JavaScript standards, i.e. ECMAScript Modules (ESM).

---

A [Broccoli](https://github.com/broccolijs/broccoli) plugin that gives us an easy way to precompile [Handlebars](http://handlebarsjs.com/) templates into [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), aka ESM.

It works by taking each input Handlebars file, precompiles it using [`Handlebars.precompile`](https://handlebarsjs.com/installation/precompilation.html#precompiling-templates-inside-nodejs) and outputs a JS file (by default) that can be later combined by a different tool.

## Install
```
npm install --save broccoli-handlebars-precompiler-esm

yarn add broccoli-handlebars-precompiler-esm
```

## Usage
```js
const BroccoliHandlebars = require('broccoli-handlebars-precompiler-esm');

// ...
let precompiledTemplates = new BroccoliHandlebars(templates, {
  extensions: ['handlebars'],
});

```

## API

```js
const precompiledTemplates = new BroccoliHandlebars(inputNodes, options);
```

* `inputNodes`: An array of node objects that this plugin will read from. Nodes are usually other plugin instances; they were formerly known as "trees".

### Options
* `annotation` (optional): Same as [broccoli-plugin](https://github.com/broccolijs/broccoli-plugin#new-plugininputnodes-options); see there.
* `extensions` (optional): Array of handlebars file extensions. Default: `['hbs', 'handlebars']`.
* `targetExtension` (optional): The file extension of the corresponding output files. Default: `js`.

## How to use it in JavaScript application

### Input
`my-handlebars-template.hbs`
```hbs
<div class="my-class"></div>
```

### Output
`my-handlebars-template.js`
```js
import Handlebars from 'handlebars';

const _template = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    return "<div class=\"my-class\"></div>\n";
  },
  "useData": true
});

export default _template;
```

### Using the template
You must have a copy of the Handlebars runtime available in your application. See the [Handlebars docs](https://handlebarsjs.com/installation/#installation) for more information how to install it.

To use in your app you then import the template and invoke it passing any data it needs. See [Handlebars docs](https://handlebarsjs.com/api-reference/compilation.html#handlebars-template-templatespec) for more details.

```js
import myHandlebarsTemplate from './my-handlebars-template.js';
myHandlebarsTemplate(data)
```