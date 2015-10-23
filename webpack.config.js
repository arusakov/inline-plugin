var path = require('path');

var webpack = require('webpack');
var InliningPlugin = require('./');

var PATH_ROOT = __dirname;
var PATH_FIXTURES = path.join(PATH_ROOT, 'fixtures');
var PATH_COMPILED = path.join(PATH_ROOT, 'compiled');

module.exports = {
  entry: {
    args: path.join(PATH_FIXTURES, 'args.js')
  },
  output: {
    path: PATH_COMPILED,
    filename: '[name].comp.js'
  },
  plugins: [
    new InliningPlugin({
      // ARGS: '[]; for (var i = 0; i < arguments.length; ++i) { args.push(arguments[i]); }'
      ARGS: function ARGS(x) {}
    })
  ]
}
