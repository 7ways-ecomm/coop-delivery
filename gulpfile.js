const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const copy = require('gulp-copy');
const sourceFiles = ['./images/*.*'];
const sourceDest = './build/images';
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserify = require('gulp-browserify');
const autoprefixer = require('gulp-autoprefixer');

function swallowError(error){
  console.log(error.toString())
  this.emit('end')
}

gulp.task('serve', ['copy', 'ejs', 'sass', 'minify'], function(){
  browserSync.init({
    server: "./build"
  })
  gulp.watch("./sass/**/*.scss", ['sass']);
  gulp.watch("./scripts/**/*.js", ['minify']).on('change', browserSync.reload);
  gulp.watch("./templates/**/*.ejs", ['ejs']).on('change', browserSync.reload);
  gulp.watch("./images/*.png", ['copy']).on('change', browserSync.reload);
  gulp.watch("./images/*.jpg", ['copy']).on('change', browserSync.reload);
});
gulp.task('minify', function(){
  return gulp.src('./scripts/**/*.js')
  .pipe(plumber())
  .pipe(concat('coop-delivery.js'))
  .pipe(babel({presets: ['env', 'react', 'es2015']}))
  .pipe(browserify())
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
})
gulp.task('copy', function(){
  return gulp.src(sourceFiles)
  .pipe(copy(sourceDest, {prefix: 1}))
})
gulp.task('ejs', function(){
  return gulp.src('./templates/pages/*.ejs')
  .pipe(ejs({account: 'Coop Delivery'}, {ext: '.html'}))
  .on('error', swallowError)
  .pipe(rename({extname: '.html'}))
  .pipe(gulp.dest('./build'))
})
gulp.task('sass', function(){
  return gulp.src('./sass/coop-delivery.scss')
  .pipe(sass({compass: true}))
  .on('error', swallowError)
  .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions'], cascade: false}))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
})
gulp.task('default', ['serve']);