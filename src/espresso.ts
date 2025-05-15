import * as THREE from "three";
import { SceneMirror, SceneMirrorOptions } from "./scene-mirror";
import { instrumentScene } from "./instrument-scene";

/**
 * Initializes and attaches the SceneMirror integration for Espresso testing.
 *
 * @param scene The Three.js scene to mirror.
 * @param camera The Three.js camera to use.
 * @param options Optional configuration for SceneMirror.
 * @param container Optional container element. If not provided, one will be created.
 */
export function initEspressoMirror(
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: SceneMirrorOptions = {},
  container?: HTMLElement
): SceneMirror {
  if (!container) {
    container = document.createElement("div");
    container.id = "scene-mirror";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.right = "0";
    container.style.background = "white";
    container.style.zIndex = "100";
    container.style.maxHeight = "100vh";
    container.style.overflowY = "auto";
    document.body.appendChild(container);
  }

  const mirrorOptions: SceneMirrorOptions = {
    camera,
    ...options,
  };

  const sceneMirror = new SceneMirror(scene, container, mirrorOptions);

  instrumentScene(scene, () => {
    sceneMirror.update();
  });

  return sceneMirror;
}
