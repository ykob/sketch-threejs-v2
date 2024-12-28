import { Clock, Scene, TextureLoader, WebGLRenderer } from 'three';
import { Bubbles } from './bubbles';
import { Camera } from './camera';

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
const scene = new Scene();
const camera = new Camera();
const bubbles = new Bubbles();
const textureLoader = new TextureLoader();
const clock = new Clock(false);

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
};

const update = () => {
  const delta = clock.getDelta();

  bubbles.update(delta, camera.position);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(bubbles);
  camera.lookAt(scene.position);

  await textureLoader
    .loadAsync('/img/noise.jpg')
    .then((texture) => {
      bubbles.start(texture);
    })
    .catch((error) => console.error(error));

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
};

start();
