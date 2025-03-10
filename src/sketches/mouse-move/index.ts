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
import { Confetti } from './confetti';

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
const confetti = new Confetti();
const background = new Background();
const collisionTarget = new CollisionTarget();

let isDragging = false;

const resize = async () => {
  renderer.setSize(0, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  resolution.set(window.innerWidth, window.innerHeight);
  renderer.setSize(resolution.x, resolution.y);
  camera.resize(resolution);
  collisionTarget.resize(camera);
};

const startDragging = () => {
  isDragging = true;
};

const stopDragging = () => {
  isDragging = false;
};

const drag = (x: number, y: number) => {
  if (!isDragging) return;
  pointer.x = (x / resolution.x) * 2 - 1;
  pointer.y = -(y / resolution.y) * 2 + 1;
};

const update = () => {
  const delta = clock.getDelta();

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObject(collisionTarget);
  if (intersects.length > 0) {
    const { x, y } = intersects[0].point;
    confetti.setTarget(x, y);
  }

  renderer.render(scene, camera);
  confetti.update(delta);
  background.update(delta);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  camera.lookAt(scene.position);

  await textureLoader.loadAsync('/sketch-threejs-v2/img/noise_2x1.jpg');

  await Promise.all([
    textureLoader.loadAsync('/sketch-threejs-v2/img/noise_2x1.jpg'),
    textureLoader.loadAsync('/sketch-threejs-v2/img/confetti.png'),
  ]).then(([noiseTexture, imageTexture]) => {
    confetti.start(imageTexture);
    background.start(noiseTexture);
  });

  scene.add(background);
  scene.add(confetti);
  scene.add(collisionTarget);

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
  window.addEventListener('mousedown', startDragging);
  window.addEventListener('mousemove', (e) => {
    drag(e.clientX, e.clientY);
  });
  window.addEventListener('mouseup', stopDragging);
  window.addEventListener('touchstart', startDragging);
  window.addEventListener('touchmove', (e) => {
    drag(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchend', stopDragging);
  toggleSketchUI();
};

start();
