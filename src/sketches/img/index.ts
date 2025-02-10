import {
  Clock,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector2,
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
const resolution = new Vector2();
const imageElements = document.querySelectorAll('.image');
const images: Image[] = [];
const textureLoader = new TextureLoader();
const clock = new Clock(false);

const resize = async () => {
  renderer.setSize(0, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  resolution.set(window.innerWidth, window.innerHeight);
  renderer.setSize(resolution.x, resolution.y);
  camera.resize(resolution);
};

const update = () => {
  const delta = clock.getDelta();

  images.forEach((image) => image.update(resolution, camera, delta));
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
