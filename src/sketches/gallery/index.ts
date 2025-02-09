import {
  Clock,
  RepeatWrapping,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';
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

  images.forEach((image) => image.update(camera, delta));
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  camera.lookAt(scene.position);

  const noiseTexture = await textureLoader.loadAsync(
    '/sketch-threejs-v2/img/noise.jpg',
  );

  noiseTexture.wrapS = RepeatWrapping;
  noiseTexture.wrapT = RepeatWrapping;
  imageElements.forEach((element) => {
    const image = new Image(element);

    images.push(image);
    scene.add(image);

    textureLoader
      .loadAsync(element.getAttribute('src') || '')
      .then((texture) => {
        image.start(noiseTexture, texture);
      });
  });

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
};

start();
