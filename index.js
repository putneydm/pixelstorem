var postcss = require('postcss');
var base = 16;

module.exports = postcss.plugin('myplugin', function myplugin(options) {
    return function (css) {
        options = options || {};
        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {
                var matches = decl.value.match(/rem\(\d+\)/ig, "");
                if (matches) {
                  var revised = matches.map(function(el, i) {
                    var regExp = new RegExp(/\d+/, 'g');
                    // var numberMatch = regExp.exec(el);
                    return regExp.exec(el) / base + 'rem';
                  });

                  decl.value = revised.length > 1
                  ? revised.join(', ')
                  : revised[0];
                }
            });
        });
    }
});
