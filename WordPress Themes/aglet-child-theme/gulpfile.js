const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Path configuration
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'js/'
  }
};

// Compile SCSS to CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Minify JavaScript
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Watch files for changes
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

// Default task
exports.default = gulp.series(
  gulp.parallel(styles, scripts),
  watch
);