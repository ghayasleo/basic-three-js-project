import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import renderer from "./renderer";
import camera from "./camera";
import scene from "./scene";
import spotLight from "./light/spotLight";
import box from "./objects/box";
import axisHelper from "./helper/axis";
import plane from "./objects/plane";
import gridHelper from "./helper/grid";
import sphere from "./objects/sphere";
import "./background";
import animation from "./animation";

// creating orbit
const orbit = new OrbitControls(camera, renderer.domElement);

// helps in visualizing the 3 axis
scene.add(axisHelper)

// set camera position
camera.position.set(-10, 30, 30);

// change orbit on changing camera
orbit.update();

// creating a box
scene.add(box);

// creating a plane
scene.add(plane);

// helps in creating a grid
scene.add(gridHelper);

// creating a sphere
scene.add(sphere);

// creating spot light
scene.add(spotLight.source);
scene.add(spotLight.helper);

// rendering box animation
renderer.setAnimationLoop(animation);