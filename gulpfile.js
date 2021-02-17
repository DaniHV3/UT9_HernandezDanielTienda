function defaultTask(cb) {
  console.log("probando gulp");
  cb();
}

exports.default = defaultTask;
/*"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function () {
  return gulp
    .src("./SCSS/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./CSS"));
});

gulp.task("sass:watch", function () {
  gulp.watch("./SCSS/*.scss", ["sass"]);
});*/
