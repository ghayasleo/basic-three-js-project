import * as THREE from "three";
import stars from "../img/stars.jpg"
import scene from "./scene";

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars, stars, stars, stars, stars, stars
])