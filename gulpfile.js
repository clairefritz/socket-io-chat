var gulp = require('gulp'),
    server = require('gulp-develop-server');
  
gulp.task( 'server:start', function() {
    server.listen( { path: './index.js' } );
});

gulp.task( 'default', [ 'server:start' ], function() {
    gulp.watch([ './index.js' ]).on( 'change', server.restart );
});