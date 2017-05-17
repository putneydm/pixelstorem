var postcss = require('postcss');


module.exports = postcss.plugin('myplugin', function myplugin(options) {
    return function (css) {
        options = options || {};

        var base = options.base ? options.base : 16;
        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {

                var declValue = decl.value;
                var exclude = options.exclude || [];

                var excluded = exclude.some(function(el, i){
                    return decl.prop === el;
                });
                var matches = declValue.match(/\b(em\(\d+\)|rem\(\d+\))/ig, "");

                if (matches && !excluded) {
                  var revised = matches.map(function(el, i) {
                    var regExp = new RegExp(/\d+/, 'g');
                    var type = new RegExp(/(^em|rem)/, 'ig');

                    var measureType = options.unit
                    ? options.unit
                    : type.exec(el)[0].toString();

                    var newValue = regExp.exec(el) / base + measureType;
                    declValue = (declValue.replace(el, newValue));
                  });

                  decl.value = declValue;

                }
            });
        });
    }
});
