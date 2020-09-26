"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");

var paths = {
  styles: {
    src: "./scss/**/*.scss"
  },
  scripts: {
    src: "./js/**/*.js"
  }
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["last 7 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./css"));
}

function minifyCSS() {
  return gulp
    .src("css/*.css")
    .pipe(
      cleanCSS(
        {
          debug: true
        },
        function(details) {
          console.log("=========================================");
          console.log(details.name + ": " + details.stats.originalSize);
          console.log(details.name + ": " + details.stats.minifiedSize);
          console.log("=========================================");
        }
      )
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("css/min"));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(gulp.parallel(styles));

exports.styles = styles;
exports.watch = watch;
exports.build = build;
exports.default = watch;
