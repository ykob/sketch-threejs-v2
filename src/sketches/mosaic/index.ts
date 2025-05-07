import {
  Clock,
  NearestFilter,
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
const imageElements = document.querySelectorAll('.slideshow-large-image');
const buttonElements = document.querySelectorAll('.slideshow-navi-button');
const images: Image[] = [];
const particles = new Particles(resolution);
const background = new Background();

let currentImageIndex = 0;

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

const start = async () => {
  if (!app || !canvas) return;

  app.appendChild(canvas);
  renderer.setClearColor(0x000000, 1.0);
  camera.lookAt(scene.position);
  scene.add(particles);
  scene.add(background);

  const textures = await Promise.all([
    textureLoader.loadAsync('/threejs-experiments/img/mosaic_noise_2x1.png'),
    textureLoader.loadAsync('/threejs-experiments/img/mosaic_noise.png'),
    textureLoader.loadAsync('/threejs-experiments/img/noise.jpg'),
  ]);

  textures[0].wrapS = RepeatWrapping;
  textures[0].wrapT = RepeatWrapping;
  textures[0].magFilter = NearestFilter;
  textures[0].minFilter = NearestFilter;
  textures[1].wrapS = RepeatWrapping;
  textures[1].wrapT = RepeatWrapping;
  textures[1].magFilter = NearestFilter;
  textures[1].minFilter = NearestFilter;
  textures[2].wrapS = RepeatWrapping;
  textures[2].wrapT = RepeatWrapping;
  background.start(textures[0]);
  particles.start(textures[2]);

  imageElements.forEach((element) => {
    const image = new Image(element);

    images.push(image);
    scene.add(image);
    image.start(textures[1]);
  });

  buttonElements.forEach((element) => {
    element.addEventListener('click', () => {
      const index = Number(element.getAttribute('value') || 0);

      if (index === currentImageIndex) return;
      currentImageIndex = index;
      for (let i = 0; i < images.length; i++) {
        if (i === index) {
          buttonElements[i].classList.add('active');
          images[i].show();
        } else {
          buttonElements[i].classList.remove('active');
          images[i].hide();
        }
      }
    });
  });

  resize();
  update();
  clock.start();

  window.addEventListener('resize', resize);
  toggleSketchUI();
  images[0].show();
};

start();
