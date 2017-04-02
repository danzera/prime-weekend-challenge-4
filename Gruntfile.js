module.exports = function(grunt) {
    // setting up Grunt at app load
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 'uglify' (a.k.a. minify) task
        uglify: {
            // subtasks (names are arbitrary -- chosen to be descriptive)
            build: {
                src: ['client/scripts/client.js'], // the file(s) that will be copied > minified > moved
                dest: 'server/public/scripts/client.min.js' // where the minified file(s) will be placed, and what it/they will be named -- MAKE SURE index.html script source references the minified file
            }
        }, // end 'uglify' task
        // 'copy' task (copies files from one directory to another)
        copy: {
            // subtasks (names are arbitray -- chosen to be descriptive)
            jquery: {
                expand: true, // don't ask (at least not for now)
                cwd: 'node_modules/jquery/dist/', // cwd === current working directory (where the file(s) you want copied is/are located)
                src: ['jquery.js'], // src === source (what file(s) and/or folders do you want copied -- can include path name, which will copy folder structure as well)
                dest: 'server/public/vendors/' // dest === destination -- where is/are the file(s) being copied over to?
            }, // end jquery{}
            bootstrap: {
                expand: true, // again, don't ask
                cwd: 'node_modules/bootstrap/dist/css/',
                src: ['bootstrap.css'],
                dest: 'server/public/vendors/'
            }, // end bootstrap{}
            styles: {
                expand: true, // seriously, stop asking...mysterious are the ways of the force
                cwd: 'client/stylesheets',
                src: 'styles.css',
                dest: 'server/public/stylesheets',
            }, // end styles{}
            html: {
                expand: true,
                cwd: 'client/views',
                src: ['index.html'],
                dest: 'server/public/views'
            } // end html{}
        }, // end 'copy' task
        // 'watch' task (runs in the background and watches for changes to the specified files)
        watch: {
            files: ['client/scripts/*.js', 'client/stylesheets/*.css', 'client/views/*.html'], // any files we want Grunt to watch for SAVED changes -- '*.ext' watches ALL FILES with the specified extenstions (.js, .css, .html, etc...) within the specified directories
            tasks: ['uglify', 'copy'] // tasks to run when Grunt detects changes to the above file(s)
        } // end 'watch' task
        /*---ANY OTHER TASKS WE WANT---
        someTask: {
          subtask1: blah, (as needed by the task)
          subtask2: blah-blah, (as needed by the task)
          subtask3: blah-blah-blah (as needed by the task)
        }
        -----------------------------*/
    }); // end grunt.initConfig()

    // load any tasks we used above (similar to importing a custom module in app.js, we need to load our tasks in order to use them)
    grunt.loadNpmTasks('grunt-contrib-uglify'); // 'uglify' task
    grunt.loadNpmTasks('grunt-contrib-copy'); // 'copy' task
    grunt.loadNpmTasks('grunt-contrib-watch'); // 'watch' task
    /*---ANY OTHER TASKS WE WANT---
    grunt.loadNpmTasks();
    -----------------------------*/

    // register tasks -- 'copy' & 'watch' ARE ALWAYS THE LAST 2 (IN THAT ORDER)
    // add other tasks as needed to the array below, somewhere before 'copy' & 'watch'
    // 'watch' MUST BE the last task in the array, as it stays running in the background
    grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};
