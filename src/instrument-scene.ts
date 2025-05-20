import * as THREE from "three";

export function instrumentScene(
  scene: THREE.Scene,
  onChange: () => void
): void {
  const originalAdd = scene.add;
  const originalRemove = scene.remove;

  scene.add = function (...args: any[]) {
    const result = originalAdd.apply(scene, args);
    onChange();
    return result;
  };

  scene.remove = function (...args: any[]) {
    const result = originalRemove.apply(scene, args);
    onChange();
    return result;
  };
}
