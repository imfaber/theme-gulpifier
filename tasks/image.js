if (!TASK_CONFIG.image || !TASK_CONFIG.image.enable) return;

const browserSync = require('browser-sync'),
      imagemin    = require('gulp-imagemin'),
      gulp        = require('gulp'),
      path        = require('path');

const imageTask = function () {
  let srcPath = path.resolve(PATH_CONFIG.theme, TASK_CONFIG.image.src);

  return gulp.src(path.resolve(srcPath, '**/*'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: true}
        ]
      })
    ]))
    .pipe(gulp.dest(srcPath))
    .pipe(browserSync.stream());
};

gulp.task('image', imageTask);
module.exports = imageTask;