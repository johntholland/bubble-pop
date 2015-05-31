//bubble.js

"use strict"

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var projector = new THREE.Projector();
var objects = [];
var renderer = new THREE.WebGLRenderer();
var camera;
var scene;

window.onload = init;

	    // once everything is loaded, we run our Three.js stuff.
    function init() 
    {


        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


        //raycaster = new THREE.Raycaster();
        //mouse = new THREE.Vector2();

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );

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

        // call the render function
        renderer.render(scene, camera);

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    }

    function addCubes (scene)
    {
        for (var i = 0 ; i < 10; i++)
        {
            for (var j = 0 ; j < 10; j++)
            {
                // create a cube
                var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

                var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff });
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                // position the cube
                cube.position.x = (5 * j) -11;
                cube.position.y = (5 * i);
                cube.position.z = 0;

                cube.name = "cube-" + i + j;
                // add the cube to the scene
                scene.add(cube);
                objects.push(cube);
            };
        };
    }

    function onDocumentMouseDown(event) 
    {

        var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) 
        {

            console.log(intersects[0].object.name);
            intersects[0].object.color = 0xffffff;
            scene.remove(intersects[0].object);
            renderer.render(scene, camera);
        }
    }




