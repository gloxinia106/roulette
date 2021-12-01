import gulp from "gulp";
import del from "del";
import ghtml from "gulp-html";
import ws from "gulp-webserver";
import autoPrefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import htmlmin from "gulp-htmlmin";

const clean = () => del(["out/"]);

const webserver = () =>
  gulp.src("out").pipe(ws({ livereload: true, open: true }));

const html = () =>
  gulp
    .src("src/index.html")
    .pipe(ghtml())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("out/"));

const css = () =>
  gulp
    .src("src/css/style.css")
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(miniCSS())
    .pipe(gulp.dest("out/css/"));

const js = () =>
  gulp
    .src("src/js/main.js")
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
          }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest("out/js/"));

const watch = () => {
  gulp.watch("src/**/*.html", html);
  gulp.watch("src/**/*.css", css);
  gulp.watch("src/**/*.js", js);
};

export const dev = gulp.series(clean, html, css, js, webserver, watch);
export const build = gulp.series(clean, html, css, js);
