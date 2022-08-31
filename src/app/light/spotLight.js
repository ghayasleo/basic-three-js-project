import * as THREE from "three";

// creating spot light
const source = new THREE.SpotLight(0xFFFFFF);
source.castShadow = true;
source.angle = 0.2;

// creating spot light
const helper = new THREE.SpotLightHelper(source, 0xFFFFFF);

const spotLight = { source, helper }
export default spotLight;