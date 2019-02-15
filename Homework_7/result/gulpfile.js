let gulp = require('gulp'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    cssMin = require('gulp-csso'),
    htmlMin = require('gulp-htmlmin'),
    jsMin = require('gulp-uglifyjs'),
    autoPrefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    BS = require('browser-sync'),
    rename = require('gulp-rename'),
    delFiles = require('del');

gulp.task('html',  function () {
    gulp.src(['./app/index.html'])
        .pipe(htmlMin({collapseWhitespace:true}))
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Done!'));
    BS.reload({stream:false});
});

gulp.task('js', function () {
    gulp.src('./app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(jsMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('Done!'));
    BS.reload({stream:false});
});

gulp.task('css', function () {
    gulp.src('./app/css/**/*.css')
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssMin())
        .pipe(autoPrefix())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify('Done!'));
    BS.reload({stream:false});
});

gulp.task('json', function () {
    gulp.src('./app/json/**/*.json')
        .pipe(gulp.dest('./dist/json'));
    BS.reload({stream:false});
});

gulp.task('clear', function () {
    delFiles.sync(['./dist/*'])
});

gulp.task('watchFiles', function () {
    gulp.watch(['./app/html/index.html'], ['html']);
    gulp.watch('./app/js/**/*.js', ['js']);
    gulp.watch('./app/css/**/*.css', ['css']);
});

gulp.task('server', function () {
    BS({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('default', ['clear', 'html', 'js', 'css', 'json', 'watchFiles', 'server'], () => {
    console.log('Default task');
});