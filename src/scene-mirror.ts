import * as THREE from "three";

export interface SceneMirrorOptions {
  camera?: THREE.Camera;
}

export class SceneMirror {
  private scene: THREE.Scene;
  private container: HTMLElement;
  private options: SceneMirrorOptions;
  private selectedObject: THREE.Object3D | null = null;

  constructor(
    scene: THREE.Scene,
    container: HTMLElement,
    options: SceneMirrorOptions = {}
  ) {
    this.scene = scene;
    this.container = container;
    this.options = options;
    this.setupUI();
  }

  private setupUI(): void {
    this.render();
  }

  public update(): void {
    this.render();
  }

  public setSelectedObject(object: THREE.Object3D): void {
    this.selectedObject = object;
    this.render();
  }

  public getAllObjectMetadata(object: THREE.Object3D): THREE.Object3DJSON {
    return object.toJSON();
  }

  public getSelectedObjectMetadata(): Record<string, any> | null {
    if (!this.selectedObject) return null;
    return {
      id: this.selectedObject.id,
      name: this.selectedObject.name || this.selectedObject.type,
      position: this.selectedObject.position,
      // add other metadata
    };
  }

  private render(): void {
    const objects = this.scene.children;
    let html = `<ul style="list-style: none; padding: 0;">`;
    objects.forEach((obj) => {
      const isSelected = obj === this.selectedObject;
      html += `<li 
                data-object-id="${obj.id}" 
                style="
                    padding: 4px;
                    margin: 2px 0;
                    background: ${isSelected ? "#cceeff" : "#f7f7f7"};
                    cursor: pointer;
                    border: 1px solid #ccc;">
                ${obj.name || obj.type} (id: ${obj.id})
            </li>`;
    });
    html += `</ul>`;
    this.container.innerHTML = html;

    this.container.querySelectorAll("[data-object-id]").forEach((item) =>
      item.addEventListener("click", (event) => {
        const target = event.currentTarget as HTMLElement;
        const id = parseInt(target.getAttribute("data-object-id") || "", 10);
        const object = this.scene.getObjectById(id);
        if (object) {
          this.setSelectedObject(object);
          // emit an event or callback with metadata here
          console.log(
            "Selected object raw metadata:",
            this.getAllObjectMetadata(object)
          );
        }
      })
    );
  }
}
