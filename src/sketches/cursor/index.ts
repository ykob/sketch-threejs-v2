import {
  Clock,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';
import { toggleSketchUI } from '~/utils/';
import { Background } from './background';
import { Camera } from './camera';
import { CollisionTarget } from './collision-target';

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
const scene = new Scene();
const camera = new Camera();
const resolution = new Vector2();
const pointer = new Vector2();
const raycaster = new Raycaster();
const textureLoader = new TextureLoader();
const clock = new Clock(false);
const background = new Background();
const collisionTarget = new CollisionTarget();

const resize = async () => {
  renderer.setSize(0, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  resolution.set(window.innerWidth, window.innerHeight);
  renderer.setSize(resolution.x, resolution.y);
  camera.resize(resolution);
  collisionTarget.resize(camera);
};

const update = () => {
  const delta = clock.getDelta();

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObject(collisionTarget);

  if (intersects.length > 0) {
    const { x, y } = intersects[0].point;
  }
  renderer.render(scene, camera);
  background.update(delta);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  camera.lookAt(scene.position);

  const textures = await Promise.all([
    textureLoader.loadAsync('/threejs-experiments/img/noise_2x1.jpg'),
    textureLoader.loadAsync('/threejs-experiments/img/confetti.png'),
  ]);

  background.start(textures[0]);
  scene.add(background);
  scene.add(collisionTarget);

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
  toggleSketchUI();
};

start();
