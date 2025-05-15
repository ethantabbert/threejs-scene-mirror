# Three.js Scene Mirror

A package that generates an HTML mirror of a Three.js scene for testing and debugging purposes.

## Installation

```bash
npm install https://github.com/ethantabbert/threejs-scene-mirror
```

## Usage

```typescript
import * as THREE from "three";
import { initEspressoMirror } from "threejs-scene-mirror";

// Create your Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Add objects to your scene
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
mesh.name = "Red Box";
scene.add(mesh);

// Initialize the SceneMirror with Espresso integration
// This will create a container and attach it to the document body
// It also instruments the scene to automatically update when objects are added/removed
const sceneMirror = initEspressoMirror(scene, camera);

// Optional: Configure with custom options
// const sceneMirror = initEspressoMirror(scene, camera, {
//   // custom options here
// });

// Optional: Use with your own container
// const container = document.getElementById('my-custom-container');
// const sceneMirror = initEspressoMirror(scene, camera, {}, container);

// Get metadata for the selected object
const selectedObject = scene.getObjectByName("Red Box");
if (selectedObject) {
  sceneMirror.setSelectedObject(selectedObject);
  const metadata = sceneMirror.getAllObjectMetadata(selectedObject);
  console.log(metadata);
}
```
