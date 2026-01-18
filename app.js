const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // ✅ Other aspect: change background color
  scene.clearColor = new BABYLON.Color3(0.9, 0.9, 0.95);

  // Camera
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2.5,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Light
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.9;

  // ✅ Add 3–4 meshes
  const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
  const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 2, diameter: 1 }, scene);
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 8, height: 8 }, scene);

  // ✅ Change positions (2+)
  box.position.x = -2;
  sphere.position.x = 2;
  sphere.position.y = 1;
  cylinder.position.z = 2;
  cylinder.position.y = 1;

  // ✅ Change colors (materials)
  const redMat = new BABYLON.StandardMaterial("redMat", scene);
  redMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

  const blueMat = new BABYLON.StandardMaterial("blueMat", scene);
  blueMat.diffuseColor = new BABYLON.Color3(0, 0, 1);

  const greenMat = new BABYLON.StandardMaterial("greenMat", scene);
  greenMat.diffuseColor = new BABYLON.Color3(0, 0.8, 0.2);

  box.material = redMat;
  sphere.material = blueMat;
  cylinder.material = greenMat;

  // ✅ Other aspect: animation (rotation)
  scene.registerBeforeRender(() => {
    box.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
  });

  return scene;
};

const scene = createScene();

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Resize
window.addEventListener("resize", () => {
  engine.resize();
});
