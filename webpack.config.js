var path = require('path');
var InlinePlugin = require('./');

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
    new InlinePlugin({
      ARGS: function (args) {
        var arr = [];
        for (var i = 0; i < args.length; ++i) {
          arr.push(args[i]);
        }
        return arr;
      }
    })
  ]
}
