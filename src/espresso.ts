import * as THREE from "three";
import { SceneMirror } from "./scene-mirror";
import { instrumentScene } from "./instrument-scene";

export function initEspressoMirror(scene: THREE.Scene): SceneMirror {
  let container = document.createElement("div");
  container.id = "scene-mirror";
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.right = "0";
  container.style.background = "white";
  container.style.zIndex = "100";
  container.style.maxHeight = "100vh";
  container.style.overflowY = "auto";
  document.body.appendChild(container);

  const sceneMirror = new SceneMirror(scene, container);

  instrumentScene(scene, () => {
    sceneMirror.update();
  });

  return sceneMirror;
}
