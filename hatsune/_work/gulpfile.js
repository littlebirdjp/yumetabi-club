var gulp = require('gulp');
var jade = require('gulp-jade');
var cssnext = require('gulp-cssnext');
var prettify = require('gulp-prettify');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var browserSync = require('browser-sync');

var paths = {
  'src': 'src/',
  'dist': '../'
}

gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
      index: 'index.html'
    },
    notify: true
  });
});

gulp.task('html', function() {
  return gulp.src([
    paths.src + '**/*.jade',
    '!' + paths.src + '**/_*.jade'
    ])
    .pipe(jade())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('prettify', ['html'], function() {
  return gulp.src([
    paths.dist + '**/*.html',
    '!' + paths.dist +'_work/**/*.html'
    ])
    .pipe(prettify({
      brace_style: 'collapse',
      indent_size: 2,
      indent_char: ' '
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("css", function() {
  return gulp.src([
    paths.src + 'css/*.css',
    '!' + paths.src + 'css/_*.css'
    ])
    .pipe(cssnext({
        browsers: 'last 2 versions',
        features:{
          rem:{
            atrules: true
          }
        },
        compress: false,
        import: true,
        plugins: [
          require("postcss-mixins"),
          require("postcss-simple-vars"),
          require("postcss-nested")
        ]
    }))
    .pipe(gulp.dest(paths.dist + 'css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('concat', ['css'],function() {
  return gulp.src([paths.src + 'css/_reset.css', paths.dist + 'css/style.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('watch', function() {
  gulp.watch([paths.src + '**/*.jade'], ['prettify']);
  gulp.watch([paths.src + 'css/*.css'], ['concat']);
});

gulp.task('default', ['bs', 'prettify', 'concat', 'watch']);
