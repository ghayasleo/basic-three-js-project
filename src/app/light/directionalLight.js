import * as THREE from "three";

// creating directional light
const source = new THREE.DirectionalLight(0xFFFFFF, 0.8);
source.position.set(-30, 50, 0)
source.castShadow = true;
source.shadow.camera.bottom = -12;

// adding light helper
const helper = new THREE.DirectionalLightHelper(source, 5);

// adding shadow helper
const shadow = new THREE.CameraHelper(source.shadow.camera);

// export
const directionalLight = { source, helper, shadow };
export default directionalLight;
