import * as THREE from "three";

export class SceneMirror {
  private scene: THREE.Scene;
  private container: HTMLElement;
  private selectedObject: THREE.Object3D | null = null;

  constructor(scene: THREE.Scene, container: HTMLElement) {
    this.scene = scene;
    this.container = container;
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

  private render(): void {
    const objects = this.scene.children;
    let html = `<ul style="list-style: none; padding: 0;">`;
    objects.forEach((obj) => {
      const isSelected = obj === this.selectedObject;
      html += `<li
                data-test-id="${obj.name || obj.type}"
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

    this.container.querySelectorAll("[data-test-id]").forEach((item) =>
      item.addEventListener("click", (event) => {
        const target = event.currentTarget as HTMLElement;
        const id = parseInt(target.getAttribute("data-object-id") || "", 10);
        const object = this.scene.getObjectById(id);
        if (object) {
          this.setSelectedObject(object);
          // emit an event or callback with metadata here
          console.log("Selected object raw metadata:", object);
        }
      })
    );
  }
}
