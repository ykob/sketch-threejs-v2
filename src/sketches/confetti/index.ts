import { Clock, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three';
import { Background } from './background';
import { Camera } from './camera';
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
const textureLoader = new TextureLoader();
const clock = new Clock(false);
const confetti = new Confetti();
const background = new Background();

const resize = async () => {
  renderer.setSize(0, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  resolution.set(window.innerWidth, window.innerHeight);
  renderer.setSize(resolution.x, resolution.y);
  camera.resize(resolution);
};

const update = () => {
  const delta = clock.getDelta();

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

  await textureLoader
    .loadAsync('/sketch-threejs-v2/img/noise_2x1.jpg')
    .then((texture) => {
      background.start(texture);
    });

  confetti.start();

  scene.add(background);
  scene.add(confetti);

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
};

start();
