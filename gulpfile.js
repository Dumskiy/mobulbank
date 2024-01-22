import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import del from 'del';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import webp from 'gulp-webp';
import svgSprite from 'gulp-svg-sprite';

/* Styles */
export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

/* HTML */
const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

/* Scripts */
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
};

/* Images */
export const optimizeImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/icons/for-sprite/*.svg'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
};

/* Sprite */
const createSprite = () => {
  return gulp.src('source/img/icons/for-sprite/*.svg')
    .pipe(imagemin())
    .pipe(svgSprite({
      mode: {
        stack: true
      }
    }))
    .pipe(rename('stack.svg'))
    .pipe(gulp.dest('build/img/icons'))
}

const copyImages = () => {
  return gulp.src([
      'source/img/**/*.{png,jpg,svg}',
      '!source/img/icons/for-sprite/*.svg'
    ])
    .pipe(gulp.dest('build/img'))
};

/* WebP */
const createWebp = () => {
  return gulp.src([
      'source/img/*.{jpg,png}',
      '!source/img/favicons/*.{png,jpg,svg}',
      '!source/img/icons/**/*.{png,jpg,svg}'
    ])
    .pipe(webp())
    .pipe(gulp.dest('build/img'));
}

/* Copy */
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
};

/* Clean */
const clean = () => {
  return del('build');
};

/* Server */
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

/* Reload */
const reload = (done) => {
  browser.reload();
  done();
};

/* Watcher */
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
};

/* Build */
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createSprite,
    createWebp
  ),
);

/* Default */
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
