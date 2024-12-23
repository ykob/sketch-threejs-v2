import { WebGLRenderer } from 'three';

const canvas = document.createElement('canvas');
const renderer = new WebGLRenderer();

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const start = () => {
  if (!canvas) return;

  renderer.domElement = canvas;

  resize();

  window.addEventListener('resize', resize);
};

start();
