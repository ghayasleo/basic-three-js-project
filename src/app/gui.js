import * as dat from "dat.gui";
import sphere from "./objects/sphere";

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

export default options;
