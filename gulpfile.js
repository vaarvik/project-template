/*
  This is an EXAMPLE gulpfile.js
  You'll want to change it to match your project.
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
*/
const gulp = require('gulp');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const { config } = require('./gulp-config');

//assets folder path
const assetsUri = config.assetsUri.replace(/\/\s*$/, "");

//tasks for file handling
let fileHandling = [ "scripts", "styles" ];

//scripts tasks
gulp.task( "scripts", function( done ) {
    gulp.src(`${assetsUri}/js/customs/*.js`)
        //make all into one single min-file
        .pipe(concat('customs.js'))
        //minimize scripts
		.pipe(terser())
        //add .min to the file name
        .pipe(rename({ suffix: '.min' }))
        //set the location for where the file should be stored
		.pipe(gulp.dest(`${assetsUri}/js`));
    gulp.src(`${assetsUri}/js/vendors/*.js`)
        //make all into one single min-file
        .pipe(concat('vendors.js'))
        //minimize scripts
        .pipe(terser())
        //add .min to the file name
        .pipe(rename({ suffix: '.min' }))
        //set the location for where the file should be stored
		.pipe(gulp.dest(`${assetsUri}/js`));
    gulp.src(`${assetsUri}/js/specifics/*.js`)
        //minimize scripts
		.pipe(terser())
        //add .min to the file name
        .pipe(rename({ suffix: '.min' }))
        //set the location for where the file should be stored
        .pipe(gulp.dest(`${assetsUri}/js`));

    done();
} );

//styles tasks - SASS
sass.compiler = require('node-sass');

gulp.task('styles', function( done ) {
    gulp.src(`${assetsUri}/styles/scss/style.scss`)
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest(`${assetsUri}/styles`));

    done();
} );

//browsersync
gulp.task('browser-sync', function( done ) {
    browserSync.init(
        config.proxy ? config :
        { server:
            {
                baseDir: "./"
            },
            port: config.port
        }
    );

    done();
});

//on refresh event
gulp.task('reload', function( done ) {
    browserSync.reload();

    done();
} )

//watch tasks
gulp.task( "watch", function( done ) {
	gulp.watch( [
        //all js files in js assets folder
        `${assetsUri}/js/*/*.js`,
        //all scss files in styles assets folder
        `${assetsUri}/styles/**/*.scss`,
        //all html files from root
        './*.html',
        //all php files from root
        './*.php',
    ],
    gulp.series( fileHandling, "reload" ) );

    done();
} );

//default tasks
gulp.task( "default", gulp.parallel( "scripts" , "styles", "watch", "browser-sync" ) );
