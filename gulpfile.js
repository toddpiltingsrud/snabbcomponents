const gulp = require("gulp");
const { series } = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

function concatenate(cb) {
    gulp.src("./src/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("jsml.js"))
        .pipe(babel())
        .pipe(terser())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(sourcemaps.write("../dist"))
        .pipe(gulp.dest("./dist/"));

    gulp.src("./spec/components/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("components.js"))
        .pipe(babel())
        .pipe(terser())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(sourcemaps.write("../dist"))
        .pipe(gulp.dest("dist"));

    cb();
}

exports.build = series(concatenate);
