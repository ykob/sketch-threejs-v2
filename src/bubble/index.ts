import { Scene, WebGLRenderer } from 'three';
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

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
};

const update = () => {
  bubble.rotation.x += 0.01;
  bubble.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(bubble);
  camera.lookAt(scene.position);

  resize();
  update();

  window.addEventListener('resize', resize);
};

start();
