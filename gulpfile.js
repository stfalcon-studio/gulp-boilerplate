var gulp         = require('gulp');
var csso         = require('gulp-csso');
var less         = require('gulp-less');
var livereload   = require('gulp-livereload');
var watch        = require('gulp-watch');
var runSequence  = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function() {
    gulp.src('assets/css/style.less')
        .pipe(less())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(livereload());
});

gulp.task('autoprefixer', function () {
    gulp.src('dist/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('csso', function() {
    gulp.src('dist/style.css')
        .pipe(csso())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('assets/css/*.less', ['less', 'csso']);
    gulp.watch('*.html', ['html']);
});

gulp.task('default', function(){
    runSequence(['less'], 'csso', 'watch');
});