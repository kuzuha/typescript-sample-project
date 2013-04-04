module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        package: grunt.file.readJSON("package.json"),
        watch: {
            typescript: {
                files: [
                    "main/ts/**/*.ts"
                ],
                tasks: ["ts"],
                options: {
                    debounceDelay: 1000
                }
            }
        },
        uglify: {
            main: {
                options: {
                    sourceMap: "build/main/js/<%= package.name %>.min.js.map",
                    sourceMapIn: "build/main/js/<%= package.name %>.js.map"
                },
                files: {
                    "build/main/js/<%= package.name %>.min.js": ["<%= typescript.main.dest %>"]
                }
            }
        },
        typescript: {
            main: {
                src: ["main/ts/**/*.ts"],
                dest: "build/main/js/<%= package.name %>.js",
                options: {
                    module: 'amd', //or commonjs
                    target: 'es3',
                    sourcemap: true,
                    declaration: true
                }
            },
            test: {
                src: ["test/ts/*.ts"],
                dest: "build/test/js",
                options: {
                    base_path: "test/ts",
                    module: 'amd', //or commonjs
                    target: 'es3',
                    sourcemap: true,
                    declaration: true
                }
            }
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.registerTask("ts", ["typescript", "uglify"]);
};
