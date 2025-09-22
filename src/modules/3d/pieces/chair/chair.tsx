import React from 'react';
import { useGLTF } from '@react-three/drei';

interface ChairProps {
  [key: string]: any;
}

export function Chair(props: ChairProps) {
  const { nodes, materials } = useGLTF('/chair.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.model as any).geometry}
        material={materials.model}
      />
    </group>
  );
}

useGLTF.preload('/chair.glb');
