module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        //SASS - TASK
        sass: { 
            default:{
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '../sass/',
                    src: ["**/*.scss"], 
                    dest: '../css/',
                    ext: '.css'
                }]
            }
        },

        //WATCH - TASK
        watch: {
            config: {
                files: ['Gruntfile.js', '*.json'],
                tasks: ['w'],
                options: {
                    reload: true
                }
            },
            sass: {
                files: ['../sass/**/*'],
                tasks: ['export_sass']
            },
        },


    });

    grunt.registerTask('w', ['watch']);
    grunt.registerTask("export_sass", ["sass:default"]);
};
