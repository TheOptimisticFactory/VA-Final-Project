module.exports = function(grunt) {

  grunt.initConfig({
    nodeModuleDir: 'node_modules/',
    jsDir: 'public/javascripts/',
    cssDir: 'public/stylesheets/',
    jsDistDir: 'public/javascripts/minified/',
    cssDistDir: 'public/stylesheets/minified/',
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      js: {
        files: [
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-collection/build',
            src: 'd3-collection.min.js',
            dest: '<%=jsDir%>'
          },
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-dispatch/build',
            src: 'd3-dispatch.min.js',
            dest: '<%=jsDir%>'
          },
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-selection/build',
            src: 'd3-selection.min.js',
            dest: '<%=jsDir%>'
          },
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-quadtree/build',
            src: 'd3-quadtree.min.js',
            dest: '<%=jsDir%>'
          },
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-timer/build',
            src: 'd3-timer.min.js',
            dest: '<%=jsDir%>'
          },
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-drag/build',
            src: 'd3-drag.min.js',
            dest: '<%=jsDir%>'
          },
          {
            expand: true,
            cwd: '<%=nodeModuleDir%>d3-force/build',
            src: 'd3-force.min.js',
            dest: '<%=jsDir%>'
          }
        ]
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>*.css'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true,
        sourceMapName: '<%=jsDistDir%><%= pkg.name %>.js.map',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    watch: {
    files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
    tasks: ['concat', 'uglify', 'cssmin']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'concat',
    'uglify',
    'cssmin',
    'watch'
  ]);
  
};