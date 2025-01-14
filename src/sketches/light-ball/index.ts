import { Clock, Scene, TextureLoader, WebGLRenderer } from 'three';
import { debounce } from '~/utils';
import { Background } from './background';
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

  background.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(background);
  camera.lookAt(scene.position);

  await textureLoader
    .loadAsync('/img/noise.jpg')
    .then((texture) => {
      background.start(texture);
    })
    .catch((error) => console.error(error));

  resize();
  update();
  clock.start();

  window.addEventListener('resize', debounce(resize, 100));
};

start();
