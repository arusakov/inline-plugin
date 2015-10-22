
function InlinePlugin(options) {
  this.options = options;
}

InlinePlugin.prototype.apply = function(compiler) {
  compiler.parser.plugin('call ARGS', function (expr) {
    var res = compiler.parser.evaluate('1');
    res.setRange(expr.range);
    console.log(res);
    return res;
  });
};

module.exports = InlinePlugin;
