import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Bubble } from './bubble';

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
const scene = new Scene();
const camera = new PerspectiveCamera();
const bubble = new Bubble();

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
};

const update = () => {
  bubble.rotation.x += 0.01;
  bubble.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = () => {
  if (!app || !canvas) return;

  camera.position.z = 5;
  camera.far = 100;
  camera.setFocalLength(50);
  camera.lookAt(scene.position);

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(bubble);

  resize();
  update();

  window.addEventListener('resize', resize);
};

start();
