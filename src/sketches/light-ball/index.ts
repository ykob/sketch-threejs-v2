import {
  Clock,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';
import { debounce } from '~/utils';
import { toggleSketchUI } from '~/utils/';
import { Background } from './background';
import { Camera } from './camera';
import { LightBall } from './light-ball';

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
const background = new Background();
const lightBall = new LightBall(resolution);
const textureLoader = new TextureLoader();
const clock = new Clock(false);

const resize = async () => {
  renderer.setSize(0, 0);

  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.resize(w, h);
  resolution.set(w, h);
};

const update = () => {
  const delta = clock.getDelta();

  background.update(delta);
  lightBall.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  scene.add(background);
  scene.add(lightBall);
  camera.lookAt(scene.position);

  await textureLoader
    .loadAsync('/sketch-threejs-v2/img/noise_2x1.jpg')
    .then((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      background.start(texture);
      lightBall.start(texture);
    })
    .catch((error) => console.error(error));

  resize();
  update();
  clock.start();

  window.addEventListener('resize', debounce(resize, 100));
  toggleSketchUI();
};

start();
