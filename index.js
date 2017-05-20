var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pixelstorem', function pixelstorem(options) {
    return function (css) {
        options = options || {};
        var base = options.base ? options.base : 16;

        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {

                var declValue = decl.value,
                    exclude = options.exclude || [];

                var excludedTest = exclude.some(function(el, i){
                    return decl.prop === el;
                });
                var matches = declValue.match(/\b(em\(\d+\)|rem\(\d+\)|\d+px)/ig, "");

                if (matches && !excludedTest) {
                  var revised = matches.map(function(el, i) {
                    var regExVal = new RegExp(/\d+/, 'g'),
                        regExType = new RegExp(/(^em|rem|px)/, 'ig'),
                        unit = regExType.exec(el)[0].toString();
                    var measureType = options.unit
                    ? options.unit
                    : unit !== 'px' ? unit
                    : 'rem';

                    var convertedVal = regExVal.exec(el) / base + measureType;
                    declValue = (declValue.replace(el, convertedVal));
                  });
                  decl.value = declValue;
                }
            });
        });
    }
});
