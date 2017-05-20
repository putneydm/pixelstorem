# postcss-pixels-to-rem

## What it does

`postcss-pixels-to-rem` is a PostCSS plugin that converts items sized in pixels in CSS code to either rems or ems.

It will convert several types of CSS notation. It is designed to be versatile by doing basic `px to rem` conversion and also working with legacy code that written to use the deprecated [`Pixels to Rems`][3] and [`Pixels to Ems`][2] Sass functions from [Bourbon][1]. It converts the notations `rem(<size>)` to `rems` and `em(<size>)`  to `ems`. It also converts `<size>px` code to `rems` or `ems`.

Given a value it will output:

`font-size: rem(16);` => `font-size: 1rem;`

`font-size: em(16);` => `font-size: 1em;`

`font-size: 16px;` => `font-size: 1rem;`


## Installation

``$ npm install --save-dev postcss-pixels-to-rem``

In gulpfile.js

`var	postcss = require('gulp-postcss')`

`var pixelstorem = require('postcss-pixels-to-rem');`

    gulp.task('css', function() {
        var plugins = [
            pixelstorem()
        ];      
    gulp.src('source/sass/\*.scss')
    .pipe(postcss(plugins))
    .pipe(gulp.dest(public/css));
    });

## Inputs and outputs

In default mode `postcss-pixels-to-rem` outputs:

`font-size: rem(<value>);` => `font-size: <value>rem;`

`font-size: em(<value>);` => `font-size: <value>em;`

`font-size: <value>px;` => `font-size: <value>rem;`


## Defaults

Default base for conversion is `1rem = 16px`. Default output unit for `px` values is `rem`.


## Options

`postcss-pixels-to-rem` accepts three optional settings that override default settings.

    gulp.task('css', function() {
        var plugins = [
          pixelstorem({
            base: <value>,
            unit: "rem" or "em",
            exclude: ["declaration"]
          })
        ];
        gulp.src('source/sass/styles.scss')
        .pipe(postcss(plugins))
        .pipe(gulp.dest(public/css));
    });

Optional values:
* `base: <value>` - Accepts a unitless value. Resets the base font size for conversion to rems or ems.
* `unit: "rem" or "em"` - Accepts a string. Makes output values on all items the chosen unit value. This overrides values set by using `rem(<value>)` or `em(<value>)` notation.
* `exclude: ["declaration"]` - any declaration type to exclude from conversion, eg, `border`


[1]: http://bourbon.io/
[2]: http://bourbon.io/docs/#px-to-em
[3]: http://bourbon.io/docs/#px-to-rem
