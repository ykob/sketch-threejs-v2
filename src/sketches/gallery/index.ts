import { Clock, Scene, WebGLRenderer } from 'three';
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
const imageElements = document.querySelectorAll('.image');
const images: Image[] = [];
const clock = new Clock(false);

const resize = async () => {
  renderer.setSize(0, 0);

  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
};

const update = () => {
  // const delta = clock.getDelta();

  images.forEach((image) => image.update(camera));

  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  camera.lookAt(scene.position);

  imageElements.forEach((element) => {
    const image = new Image(element);
    images.push(image);
    scene.add(image);
  });

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
};

start();
