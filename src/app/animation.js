import camera from "./camera";
import box from "./objects/box";
import renderer from "./renderer";
import scene from "./scene";
import options from "./gui"
import spotLight from "./light/spotLight";
import sphere from "./objects/sphere";

let step = 0;

const animation = () => {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.source.angle = options.angle;
  spotLight.source.penumbra = options.penumbra;
  spotLight.source.intensity = options.intensity;
  spotLight.source.position.set(-100, options.spotLightY, 0);
  spotLight.helper.update();

  // connecting scene and camera
  renderer.render(scene, camera);
}

export default animation;