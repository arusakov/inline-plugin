var ConstDependency = require('webpack/lib/dependencies/ConstDependency');

function InliningPlugin(options) {
  this.options = options || {};
  this.funcs = [];

  this.prepareFunctions(this.options);
}

InliningPlugin.prepareFunctionBody = function prepareFunctionBody(func) {
  if (!func) {
    return null;
  }
  if (typeof func === 'string') {
    return func;
  }
  if (typeof func !== 'function') {
    return null;
  }
  return func.toString();
};

InliningPlugin.prototype.prepareFunctions = function prepareFunctions(options) {
  var funcs = this.funcs;
  var names = Object.keys(options);
  for (var ni = 0; ni < names.length; ++ni) {
    var funcBody = InliningPlugin.prepareFunctionBody(options[names[ni]]);
    if (funcBody) {
      funcs.push({
        name: names[ni],
        body: funcBody
      });
    }
  }
};

InliningPlugin.prototype.apply = function apply(compiler) {
  var funcs = this.funcs;
  for (var fi = 0; fi < funcs.length; ++fi) {
    var funcObj = funcs[fi];
    compiler.parser.plugin('call ' + funcObj.name, function (expr) {
      var result = compiler.parser.parse(funcObj.body);
      var dep = new ConstDependency(funcObj.body, expr.range);
      this.state.current.addDependency(dep);
      return true;
    });
  }
};

module.exports = InliningPlugin;
