import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

export default box;
