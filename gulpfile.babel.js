import gulp from "gulp";
import ghtml from "gulp-html";
import autoPrefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import htmlmin from "gulp-htmlmin";

const outRoute = "out/";

const html = () =>
  gulp
    .src("src/index.html")
    .pipe(ghtml())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(outRoute));

const css = () =>
  gulp
    .src("src/css/style.css")
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(miniCSS())
    .pipe(gulp.dest(outRoute));

const js = () =>
  gulp
    .src("src/js/main.js")
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(outRoute));

export const build = gulp.series(html, css, js);
