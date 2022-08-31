import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import stars from "../img/stars.jpg";

// creating renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

// creating scene
const scene = new THREE.Scene();

// creating a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// creating orbit
const orbit = new OrbitControls(camera, renderer.domElement);

// helps in visualizing the 3 axis
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)

// set camera position
camera.position.set(-10, 30, 30);

// change orbit on changing camera
orbit.update();

// creating a box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// creating a plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xFAFAFA,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

// helps in creating a grid
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// creating a sphere
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x00FFFF,
  wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

// creating light source
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// // creating directional light
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0)
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// // adding shadow helper
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

// creating spot light
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight, 0xFFFFFF);
scene.add(sLightHelper);

// creating fog
scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0, 0.01);

// adding background
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars, stars, stars, stars, stars, stars
])

renderer.setClearColor(0xFFEA00);

// creating a gui instance
const gui = new dat.GUI();

// creating gui options
const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
  spotLightY: 100,
}

// sphere color adjust
gui.addColor(options, "sphereColor").onChange((e) => sphere.material.color.set(e));
// sphere wireframe allowance
gui.add(options, "wireframe").onChange((e) => sphere.material.wireframe = e);
// sphere speed
gui.add(options, "speed", 0, 0.01)

gui.add(options, "angle", 0, 1)
gui.add(options, "penumbra", 0, 1)
gui.add(options, "intensity", 0, 1)
gui.add(options, "spotLightY", 0, 100)

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  console.log({x: e.clientX, y: e.clientY})
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.x = (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereID = sphere.id;
const planeID = plane.id;
const boxID = box.id;

// animating box
const animate = () => {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  spotLight.position.set(-100, options.spotLightY, 0);
  sLightHelper.update();

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  // console.log({ sphereID, planeID, boxID }, intersects);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === sphereID) {
      intersects[i].object.material.color.set(0xFF0000);
    }
  }

  // connecting scene and camera
  renderer.render(scene, camera);
}

// rendering box animation
renderer.setAnimationLoop(animate);