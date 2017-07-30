const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('pre-test', () => {
    return gulp.src([
        './server/app/**/*.js',
        './server/data/**/*.js',
        './server/db/**/*.js',
        './server/models/**/*.js',
        './server/utils/**/*.js',
    ])
    .pipe(istanbul({
        includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src('./server/test/unit/**/*.js')
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});
