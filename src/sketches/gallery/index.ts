import { Clock, Scene, WebGLRenderer } from 'three';
import { debounce } from '~/utils';
import { Camera } from './camera';
import { Image } from './image';

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
const scene = new Scene();
const camera = new Camera();
const image = new Image();
const clock = new Clock(false);

const resize = async () => {
  renderer.setSize(0, 0);

  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
  image.resize(camera);
};

const update = () => {
  // const delta = clock.getDelta();

  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(image);
  camera.lookAt(scene.position);

  resize();
  update();
  clock.start();

  window.addEventListener('resize', debounce(resize, 100));
};

start();
