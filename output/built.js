!function() {
    "use strict";
    function init() {
        scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e3), 
        document.addEventListener("mousedown", onDocumentMouseDown, !1), renderer.setClearColor(new THREE.Color(15658734, 1)), 
        renderer.setSize(window.innerWidth, window.innerHeight), renderer.shadowMapEnabled = !0, 
        addCubes(scene), camera.position.x = 13, camera.position.y = 20, camera.position.z = 90;
        var spotLight = new THREE.SpotLight(16777215);
        spotLight.position.set(20, 80, 91), scene.add(spotLight), document.getElementById("WebGL-output").appendChild(renderer.domElement);
        var scoreText = document.createElement("div");
        scoreText.id = "score", scoreText.style.position = "absolute", scoreText.style.width = 100, 
        scoreText.style.height = 100, scoreText.innerHTML = "Score: 0", scoreText.style.top = "200px", 
        scoreText.style.left = "200px", document.body.appendChild(scoreText), renderer.render(scene, camera), 
        document.addEventListener("mousedown", onDocumentMouseDown, !1);
    }
    function addCubes(scene) {
        for (var cubeColors = [ "rgb(255,0,0)", "rgb(255,255,0)", "rgb(255,0,255)", "rgb(0,255,0)" ], y = 0; y < board.height(); y++) for (var x = 0; x < board.width(); x++) {
            var colorChoice = cubeColors[Math.floor(Math.random() * cubeColors.length)], cubeGeometry = new THREE.BoxGeometry(4, 4, 4), cubeMaterial = new THREE.MeshLambertMaterial({
                color: colorChoice
            }), cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = 5 * x - 11, cube.position.y = 5 * y, cube.position.z = 0, cube.name = "cube-" + x + y, 
            cube.x = x, cube.y = y, cube.color = colorChoice, board[x][y] = cube, scene.add(cube), 
            objects.push(cube);
        }
    }
    function onDocumentMouseDown(event) {
        var vector = new THREE.Vector3(event.clientX / window.innerWidth * 2 - 1, 2 * -(event.clientY / window.innerHeight) + 1, .5);
        vector = vector.unproject(camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()), intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {
            var neighbors = findNeighbors(intersects[0].object, [ intersects[0].object ]);
            if (console.log(intersects[0].object.name + " Clicked"), intersects[0].object.color = 16777215, 
            neighbors.length < 2) return;
            for (var i = 0; i < neighbors.length; i++) scene.remove(neighbors[i]);
            score += 2 * neighbors.length, document.getElementById("score").innerHTML = "Score: " + score, 
            renderer.render(scene, camera);
        }
    }
    function findNeighbors(cube, alreadyFoundNeighbors) {
        if (alreadyFoundNeighbors.contains = function(obj) {
            for (var i = 0; i < this.length; i++) if (this[i] === obj) return !0;
            return !1;
        }, 0 !== cube.x) {
            var left = board[cube.x - 1][cube.y];
            left.color !== cube.color || alreadyFoundNeighbors.contains(left) || (alreadyFoundNeighbors.push(left), 
            alreadyFoundNeighbors = findNeighbors(left, alreadyFoundNeighbors));
        }
        if (cube.x !== board.width() - 1) {
            var right = board[cube.x + 1][cube.y];
            right.color !== cube.color || alreadyFoundNeighbors.contains(right) || (alreadyFoundNeighbors.push(right), 
            alreadyFoundNeighbors = findNeighbors(right, alreadyFoundNeighbors));
        }
        if (0 !== cube.y) {
            var below = board[cube.x][cube.y - 1];
            below.color !== cube.color || alreadyFoundNeighbors.contains(below) || (alreadyFoundNeighbors.push(below), 
            alreadyFoundNeighbors = findNeighbors(below, alreadyFoundNeighbors));
        }
        if (cube.y !== board.height() - 1) {
            var above = board[cube.x][cube.y + 1];
            above.color !== cube.color || alreadyFoundNeighbors.contains(above) || (alreadyFoundNeighbors.push(above), 
            alreadyFoundNeighbors = findNeighbors(above, alreadyFoundNeighbors));
        }
        return alreadyFoundNeighbors;
    }
    var camera, scene, objects = (new THREE.Raycaster(), new THREE.Vector2(), new THREE.Projector(), 
    []), renderer = new THREE.WebGLRenderer(), score = 0;
    Array.matrix = function(m, n, initial) {
        var a, i, j, mat = [];
        for (i = 0; m > i; i += 1) {
            for (a = [], j = 0; n > j; j += 1) a[j] = initial;
            mat[i] = a;
        }
        return mat;
    };
    var board = Array.matrix(10, 10, 0);
    board.width = function() {
        return this.length;
    }, board.height = function() {
        return this[0].length;
    }, window.onload = init;
}(), module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                esnext: !0
            },
            files: [ "./*.js" ]
        },
        uglify: {
            development: {
                files: {
                    "./output/built.js": [ "./*.js" ]
                }
            },
            options: {
                mangle: !1,
                beautify: !0
            }
        },
        clean: {
            options: {},
            files: [ "./output/built.js" ]
        }
    }), grunt.loadNpmTasks("grunt-contrib-jshint"), grunt.loadNpmTasks("grunt-contrib-uglify"), 
    grunt.loadNpmTasks("grunt-contrib-clean"), grunt.registerTask("default", [ "jshint", "clean", "uglify" ]);
};