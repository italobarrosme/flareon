import React from 'react';
import { useGLTF } from '@react-three/drei';

interface CaseProps {
  [key: string]: any;
}

export function Case(props: CaseProps) {
  const { nodes, materials } = useGLTF('/case.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.case as any).geometry}
        material={materials.case}
      />
    </group>
  );
}

useGLTF.preload('/case.glb');
