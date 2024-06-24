import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);

// DragControls
let dragControls;
let isDragEnabled = false;

function enableDrag() {
    dragControls = new DragControls([cube], camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function (event) {
        orbitControls.enabled = false;
    });
    dragControls.addEventListener('dragend', function (event) {
        orbitControls.enabled = true;
    });
}

function disableDrag() {
    if (dragControls) {
        dragControls.deactivate();
        dragControls.dispose();
        dragControls = null;
    }
}

document.getElementById('toggleDrag').addEventListener('click', () => {
    if (isDragEnabled) {
        disableDrag();
        document.getElementById('toggleDrag').innerText = 'Enable Drag';
    } else {
        enableDrag();
        document.getElementById('toggleDrag').innerText = 'Disable Drag';
    }
    isDragEnabled = !isDragEnabled;
});

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Rotate Cube button functionality
document.getElementById('rotateCube').addEventListener('click', () => {
    cube.rotation.x += 0.5;
    cube.rotation.y += 0.5;
});
