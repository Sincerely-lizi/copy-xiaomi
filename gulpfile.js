const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify =require('gulp-uglify');
const babel = require('gulp-babel'); //cnpm install --save-dev gulp-babel @babel/core @babel/preset-env
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
gulp.task('html',function(){
     var options = {
        collapseWhitespace:true,
        removeComments:true,
        minifyJS:true,
        minifyCSS:true   
    };
       gulp.src('xiaomi/**/*.html')
           .pipe(htmlmin(options))
           .pipe(gulp.dest('dist/'));   
});

gulp.task('js',function(){
	gulp.src('xiaomi/**/*.js')
	 .pipe(babel({
            presets: ['@babel/env']
        }))
	.pipe(uglify())
    .pipe(gulp.dest('dist'));
});
gulp.task('css',function(){
    gulp.src('xiaomi/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
gulp.task('img', () =>
    gulp.src('xiaomi/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
