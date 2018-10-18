const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify =require('gulp-uglify');
const babel = require('gulp-babel'); //cnpm install --save-dev gulp-babel @babel/core @babel/preset-env
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
//压缩html
gulp.task('html',function(){
     var options = {
        collapseWhitespace:true,
        removeComments:true,
        minifyJS:true,
        minifyCSS:true   
    };
       gulp.src('xiaomi/**/*.html')
           .pipe(htmlmin(options))
           .pipe(gulp.dest('dist/'))
        //    .pipe(connect.reload());   
});
//压缩js
gulp.task('js',function(){
	gulp.src('xiaomi/**/*.js')
	 .pipe(babel({
            presets: ['@babel/env']
        }))
	.pipe(uglify())
    .pipe(gulp.dest('dist'));
});
//压缩css
gulp.task('css',function(){
    gulp.src('xiaomi/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
//压缩images
gulp.task('img', () =>
    gulp.src('xiaomi/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// 监听app下面所有的html文件, 如果文件修改就执行html任务
gulp.task('watch', function() {
    gulp.watch("app/**/*.html", ['html']);
    gulp.watch("app/**/*.js", ['js']);
    gulp.watch("app/**/*.css", ['css']);
    gulp.watch("app/images/**/*", ['img']);
})
// 执行静态文件的压缩和编译
gulp.task('build',['html','js','css','img']);
//开启本地服务器
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 4444,
        livereload: true // 开启页面刷新
    });
  });
gulp.task('default', ['build', 'watch']);
