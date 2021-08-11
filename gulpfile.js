const gulp = require("gulp");
const cssWrap = require("gulp-css-wrap");
const cssFilter = require("./plugin/css-filter.js");

function defaultTask() {
  return (
    gulp
      .src("src/*.css")
      .pipe(
        cssFilter([
          "color",
          "border",
          "border-top",
          "border-bottom",
          "border-left",
          "border-right",
          "border-color",
          "border-top-color",
          "border-bottom-color",
          "border-left-color",
          "border-right-color",
          "background",
          "background-color",
          "filter",
          "-webkit-filter"
        ])
      )
      .pipe(cssWrap({ selector: ".dark-theme" }))
      .pipe(gulp.dest("dist"))
  );
}

exports.default = defaultTask;
