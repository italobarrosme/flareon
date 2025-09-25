import * as THREE from 'three'

type ProjectToWorldProps = {
  x: number
  y: number
  camera: THREE.Camera
  mode: 'xy' | 'xz' | 'yz' | 'free'
  fixed: number
  size: {
    width: number
    height: number
  }
}

export const projectToWorld = ({
  x,
  y,
  camera,
  mode,
  fixed,
  size,
}: ProjectToWorldProps) => {
  const vec = new THREE.Vector3(
    (x / size.width) * 2 - 1,
    -(y / size.height) * 2 + 1,
    0
  ).unproject(camera)

  switch (mode) {
    case 'xy':
      return vec.set(vec.x, vec.y, fixed)
    case 'xz':
      return vec.set(vec.x, fixed, vec.z)
    case 'yz':
      return vec.set(fixed, vec.y, vec.z)
    case 'free':
      return vec
  }
}
