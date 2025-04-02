import { Clock, Scene, TextureLoader, WebGLRenderer } from 'three';
import { debounce } from '~/utils';
import { toggleSketchUI } from '~/utils/';
import { Background } from './background';
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
const background = new Background();
const textureLoader = new TextureLoader();
const clock = new Clock(false);

const resize = async () => {
  renderer.setSize(0, 0);

  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
};

const update = () => {
  const delta = clock.getDelta();

  bubbles.update(delta, camera.position);
  background.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(bubbles);
  scene.add(background);
  camera.lookAt(scene.position);

  await textureLoader
    .loadAsync('/threejs-experiments/img/noise.jpg')
    .then((texture) => {
      bubbles.start(texture);
      background.start(texture);
    })
    .catch((error) => console.error(error));

  resize();
  update();
  clock.start();

  window.addEventListener('resize', debounce(resize, 100));
  toggleSketchUI();
};

start();
