import { PerspectiveCamera, Vector3 } from 'three';
import { radians } from '~/utils';

export function getCoordAsPixel(
  camera: PerspectiveCamera,
  position: Vector3,
): {
  x: number;
  y: number;
} {
  const y = Math.abs(
    (camera.position.z - position.z) * Math.tan(radians(camera.fov) / 2) * 2,
  );
  const x = y * camera.aspect;

  return { x, y };
}
