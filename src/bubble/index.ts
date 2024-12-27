import { Scene, TextureLoader, WebGLRenderer } from 'three';
import { Bubble } from './bubble';
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
const bubble = new Bubble();
const textureLoader = new TextureLoader();

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
};

const update = () => {
  bubble.update(performance.now() / 1000);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(bubble);
  camera.lookAt(scene.position);

  await textureLoader
    .loadAsync('/img/noise.jpg')
    .then((texture) => {
      bubble.start(texture);
    })
    .catch((error) => console.error(error));

  resize();
  update();

  window.addEventListener('resize', resize);
};

start();
