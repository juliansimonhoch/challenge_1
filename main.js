 import './style.css';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    
    // VARIABLES
    let width = window.innerWidth;
    let height = window.innerHeight;
    var geometries = [];
    let materials = [];
    var cubes = [];
    
    console.log(width, height)
    
    // CREATE A SCENE AND CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 20)
    
    // CREATE GEOMETRIES, MATERIALS, AND CUBES
    for (let i = 1; i <= 5; i++) {
        geometries[i] = new THREE.BoxGeometry(i, i, i);
        materials[i] = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        cubes[i] = new THREE.Mesh(geometries[i], materials[i]);
        cubes[i].position.set(i, i * i, i);
    }
    
    
    cubes.forEach(function (element, index) {
        scene.add(cubes[index]);
    });
    
    // CREATE RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const container = document.querySelector('#threejs-container')
    container.append(renderer.domElement)
    
    // CREATE MOUSE CONTROL
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // HANDLE WINDOW RESIZE
    function handleResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.render(scene, camera);
    }
    
    window.addEventListener('resize', handleResize);
    
    // ANIMATE AND RENDER
    function animate() {
        requestAnimationFrame(animate);
    
        controls.update();
    
        // Rotate each cube individually
        cubes.forEach(function (cube, index) {
            cube.rotation.x += 0.01 * (index + 1);
            cube.rotation.y += 0.01 * (index + 1);
        });
    
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        handleResize();
    });