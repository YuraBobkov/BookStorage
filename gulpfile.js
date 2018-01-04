var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  fileinclude = require('gulp-file-include'),
  gulpRemoveHtml = require('gulp-remove-html'),
  bourbon = require('node-bourbon'),
  ftp = require('vinyl-ftp'),
  notify = require('gulp-notify');
webpack = require('webpack');
WebpackDevServer = require('webpack-dev-server');
webpackConfig = require('./webpack.config.js');
webpackStream = require('webpack-stream');

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
})

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass({
      includePaths: bourbon.includePaths,
      outputStyle: 'expand'
    }).on('error', notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('libs', function () {
  return gulp.src([
    // 'src/libs/jquery/dist/jquery.min.js',
    // 'src/libs/bootstrap/dist/js/bootstrap.min.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
})

gulp.task('script', () => {
  gulp.src('src/js/index.js')
    .pipe(webpackStream(webpackConfig, webpack).on('error', notify.onError()))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('watch', ['sass', 'libs', 'script', 'browser-sync'], function () {
  gulp.watch('src/sass/**/*.sass', ['sass'])
  gulp.watch('src/*.html', browserSync.reload)
  gulp.watch('src/js/**/*.js', ['script'] )
})

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('buildhtml', function () {
  gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/'))
})

gulp.task('removedist', function () { return del.sync('dist') })

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function () {
  var buildCss = gulp.src([
    'src/css/fonts.min.css',
    'src/css/main.min.css'
  ]).pipe(gulp.dest('dist/css'))
  var buildFiles = gulp.src([
    'src/.htaccess'
  ]).pipe(gulp.dest('dist'))
  var buildFonts = gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'))
  var buildJs = gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'))
})

gulp.task('deploy', function () {
  var conn = ftp.create({
    host: 'hostname.com',
    user: 'username',
    password: 'userpassword',
    parallel: 10,
    log: gutil.log
  })
  var globs = [
    'dist/**',
    'dist/.htaccess',
  ]
  return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/path/to/folder/on/server'))
})

gulp.task('clearcache', function () { return cache.clearAll() })

gulp.task('default', ['watch'])
