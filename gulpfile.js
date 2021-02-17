"use strict";

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function () {
  return gulp
    .src("./SCSS/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./SCSS"))
    .pipe(browserSync.stream());
});

gulp.task("sass:watch", function () {
  gulp.watch("./SCSS/*.scss", gulp.series(["sass"]));
});

gulp.task(
  "serve",
  gulp.series(["sass"], function () {
    browserSync.init({
      server: "./",
    });

    gulp.watch("./SCSS/*.scss", gulp.series(["sass"]));
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./JS/*.js").on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series(["serve"]));
