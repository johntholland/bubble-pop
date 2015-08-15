//bubble.js
(function(){

"use strict";

var mouse = new THREE.Vector2();
var projector = new THREE.Projector();
var renderer = new THREE.WebGLRenderer();
var camera;
var scene;

var width = 10;
var height = 10;
var score = 0;



Array.matrix = function(m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

var board = Array.matrix(10, 10, 0);
board.width = function() {
    return this.length;
};
board.height = function() {
    return this[0].length;
};

window.onload = init;

// once everything is loaded, we run our Three.js stuff.
function init() {


    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // initialize object to perform world/screen calculations

    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    addCubes(scene);


    // position and point the camera to the center of the scene
    camera.position.x = 13;
    camera.position.y = 20;
    camera.position.z = 90;
    //camera.lookAt(scene.position);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(20, 80, 91);

    scene.add(spotLight);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var scoreText = document.getElementById('score');

    // call the render function
    renderer.render(scene, camera);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
}

function addCubes(scene) {
    var cubeColors = ["rgb(255,0,0)", "rgb(255,255,0)", "rgb(255,0,255)",
        "rgb(0,255,0)", "rgb(255,125,0)"
    ];

    for (var y = 0; y < board.height(); y++) {
        for (var x = 0; x < board.width(); x++) {

            var colorChoice = cubeColors[Math.floor(Math.random() * cubeColors.length)];

            // create a cube
            var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

            var cubeMaterial = new THREE.MeshLambertMaterial({
                color: colorChoice
            });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            // position the cube
            cube.position.x = (5 * x) - 11;
            cube.position.y = (5 * y);
            cube.position.z = 0;

            cube.name = x + y;
            cube.x = x;
            cube.y = y;

            cube.color = colorChoice;

            board[x][y] = cube;

            // add the cube to the scene
            scene.add(cube);
        }
    }
}

function onDocumentMouseDown(event) {

    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector = vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        //find all alike neighbors
        var neighbors = findNeighbors(intersects[0].object, [intersects[0].object]);
        
        console.log(intersects[0].object.x + intersects[0].object.y + " Clicked");

        intersects[0].object.color = 0xffff00;
        renderer.render(scene, camera);

        if( neighbors.length < 2)
            return;
        

        for (var i = 0; i < neighbors.length; i++) {
            neighbors[i].IsPopped = true;
            scene.remove(neighbors[i]);
            board[neighbors[i].x, neighbors[i].y] = null;
        }

        shift()
        score = score + (2 * neighbors.length);

        document.getElementById('score').innerHTML = 'Score: ' + score;

        renderer.render(scene, camera);
    }
}

function shift()
{
    for (var i = board.length - 1; i >= 0; i--) 
    {
        //if all cubes in column are popped
        if (AllCubesInColumnArePopped(i)) 
            {
                var cubesToMoveOver = CubesInColumnsLeftOf(i);
                MoveCubesOver(cubesToMoveOver);
            };
        //move all columns to the left to the right one.

        for (var j = board[0].length - 1; j >= 0; j--) 
        {
            if (board[i][j].IsPopped == true) 
                {
                    //move all cubes above this cube down 1
                    var cubesToMoveDown = CubesAbove(board[i][j]);
                    MoveCubesDown(cubesToMoveDown);
                };
        };
    };
}

function AllCubesInColumnArePopped(column)
{
    for (var j = board[0].length - 1; j >= 0; j--) 
        {
            if (!(board[j][column].IsPopped == true))
            {
                return false
            }
        }

        return true;
}

function CubesInColumnsLeftOf(column)
{

}

function CubesAbove(cube)
{
    var listOfCubes = [];

    //console.log("cubes above: " + cube.name);

    var x = cube.x;

    var startingY = cube.y;

    for (var i = startingY + 1; i < board[x].length; i++) 
    {
        listOfCubes.push(board[x][i]);
        //console.log(board[x][i]);
    };
    
    return listOfCubes;
}

function MoveCubesDown(cubes)
{
    for (var i = cubes.length - 1; i >= 0; i--) {
        cubes[i].y = cubes[i].y - 1;
        cubes[i].position.y = cubes[i].position.y -5;
    };
}

function MoveCubesOver(cubes)
{
    for (var i = cubes.length - 1; i >= 0; i--) {
        cubes[i].x = cubes[i].x -1;
        cubes[i].position.x =  cubes[i].position.x - 5;
    };
}

function findNeighbors(cube, alreadyFoundNeighbors) {
    alreadyFoundNeighbors.contains = function(obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };


    //no more room to the left
    if (cube.x !== 0) {
        var left = board[cube.x - 1][cube.y];

        if (left.color === cube.color && !alreadyFoundNeighbors.contains(left)) {
            alreadyFoundNeighbors.push(left);
            alreadyFoundNeighbors = findNeighbors(left, alreadyFoundNeighbors);
        }
    }

    //no more room to the right
    if (cube.x !== board.width() - 1) {
        var right = board[cube.x + 1][cube.y];

        if (right.color === cube.color && !alreadyFoundNeighbors.contains(right)) {
            alreadyFoundNeighbors.push(right);
            alreadyFoundNeighbors = findNeighbors(right, alreadyFoundNeighbors);
        }
    }


    //no more room below
    if (cube.y !== 0) {
        var below = board[cube.x][cube.y - 1];

        if (below.color === cube.color && !alreadyFoundNeighbors.contains(below)) {
            alreadyFoundNeighbors.push(below);
            alreadyFoundNeighbors = findNeighbors(below, alreadyFoundNeighbors);
        }
    }

    //no more room above
    if (cube.y !== board.height() - 1) {
        var above = board[cube.x][cube.y + 1];

        if (above.color === cube.color && !alreadyFoundNeighbors.contains(above)) {
            alreadyFoundNeighbors.push(above);
            alreadyFoundNeighbors = findNeighbors(above, alreadyFoundNeighbors);
        }
    }

    return alreadyFoundNeighbors;

    //if y is same but x is +1 or -1 then isNeighbor
    //if x is same but y is +1 or -1 then isNeighbor
    //if isNeighbor then if alreadyFoundNeighbor doesn't already contain cube then add cube
}


})();
