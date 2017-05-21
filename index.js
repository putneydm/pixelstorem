var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pixels-to-rem', function pixelstorem(options) {
    return function (css) {
        options = options || {};
        var base = options.base ? options.base : 16;

        var mediaQueries = options.mediaQueries === undefined ? true: options.mediaQueries;

        function findMatches (el) {
          return el.match(/(em\(\d+\)|rem\(\d+\)|\d+px)/ig, "");
        };

        function convertValues(matches) {
          var revised = matches.map(function(el, i) {
            var regExVal = new RegExp(/\d+/, 'g'),
                regExType = new RegExp(/(^em|rem|px)/, 'ig'),
                unit = regExType.exec(el)[0].toString();
            var measureType = options.unit
            ? options.unit
            : unit !== 'px' ? unit
            : 'rem';

            return convertedVal = regExVal.exec(el) / base + measureType;
          });
          return revised
      }

        css.walkRules(function (rule) {
            var ruleParent = rule.parent;

            if (ruleParent.type === "atrule" && ruleParent.name === "media" && mediaQueries) {
              var matches = findMatches(ruleParent.params);
              var convertedVal = convertValues(matches);
              var revisedParam = rule.parent.params;
              convertedVal.map(function(el, i) {
                revisedParam = revisedParam.replace(matches[i], el);
              });
              rule.parent.params = revisedParam;
            }

            rule.walkDecls(function (decl, i) {
                var exclude = options.exclude || [];
                var excludedTest = exclude.some(function(el, i){
                    return decl.prop === el;
                });
                var matches = findMatches(decl.value);
                if (matches && !excludedTest) {
                  decl.value = convertValues(matches);
                }
            });
        });
    }
});
