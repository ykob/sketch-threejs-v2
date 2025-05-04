import {
  Clock,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';
import { toggleSketchUI } from '~/utils/';
import { Background } from './background';
import { Camera } from './camera';
import { Image } from './image';
import { Particles } from './particles';

const app = document.getElementById('app');
const content = document.getElementById('content');
const canvas = document.createElement('canvas');
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
const scene = new Scene();
const camera = new Camera();
const resolution = new Vector2();
const textureLoader = new TextureLoader();
const clock = new Clock(false);
const imageElements = document.querySelectorAll('.image');
const images: Image[] = [];
const particles = new Particles(resolution);
const background = new Background();

const resize = async () => {
  renderer.setSize(0, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  resolution.set(window.innerWidth, window.innerHeight);
  renderer.setSize(resolution.x, resolution.y);
  camera.resize(resolution);
  for (let i = 0; i < imageElements.length; i++) {
    const image = images[i];
    const rect = imageElements[i].getBoundingClientRect();

    image.resize(rect.width, rect.height);
  }
};

const update = () => {
  const delta = clock.getDelta();

  images.forEach((image) => image.update(resolution, camera, delta));
  particles.update(delta);
  background.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target instanceof HTMLElement) {
        const targetElement = entry.target;
        const index = parseInt(targetElement.dataset.index || '-1');

        if (isNaN(index) || index < 0 || index >= imageElements.length) return;
        images[index].show();
        observer.unobserve(targetElement);
        return;
      }
    });
  },
  {
    root: content,
    rootMargin: '0px',
    threshold: 0.5,
  },
);

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  camera.lookAt(scene.position);
  scene.add(particles);
  scene.add(background);

  const textures = await Promise.all([
    textureLoader.loadAsync('/threejs-experiments/img/noise.jpg'),
    textureLoader.loadAsync('/threejs-experiments/img/noise_2x1.jpg'),
  ]);

  particles.start(textures[1]);
  background.start(textures[1]);
  textures[0].wrapS = RepeatWrapping;
  textures[0].wrapT = RepeatWrapping;

  imageElements.forEach((element) => {
    if (!(element instanceof HTMLImageElement)) return;

    const image = new Image(element);
    const index = parseInt(element.dataset.index || '-1');

    if (isNaN(index) || index < 0 || index >= imageElements.length) return;
    images[index] = image;
    scene.add(image);
    observer.observe(element);

    textureLoader
      .loadAsync(element.getAttribute('src') || '')
      .then((texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        image.start(textures[0], texture);
      });
  });

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
  toggleSketchUI();
};

start();
