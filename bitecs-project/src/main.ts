import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3, WebGPUEngine } from "@babylonjs/core";
import { eid0, eid1, Position, positionQuery, updateECS, world } from "./ecs";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

async function createEngine() {
  const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
  if (webGPUSupported) {
    const engine = new WebGPUEngine(canvas);
    await engine.initAsync();
    return engine;
  }
  return new Engine(canvas, true);
}

const engine = await createEngine();
const scene = new Scene(engine);
const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 6, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

new HemisphericLight("light", new Vector3(0, 1, 0), scene);

MeshBuilder.CreateBox(eid0.toString(), { size: 1 }, scene);
MeshBuilder.CreateBox(eid1.toString(), { size: 1 }, scene);

async function main() {
  // await engine.initAsync();
  await scene.whenReadyAsync();

  scene.debugLayer.show();

  engine.runRenderLoop(() => {
    updateECS();
  
    for (const eid of positionQuery(world)) {
      const mesh = scene.getMeshByName(eid.toString());
      if (mesh) {
        mesh.position.set(Position.x[eid], Position.y[eid], Position.z[eid]);
      }
    }
  
    scene.render();
  });
}

main();

