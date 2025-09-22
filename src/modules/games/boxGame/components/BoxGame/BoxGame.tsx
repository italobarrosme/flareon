import {
  Group,
  Texture,
  TextureLoader,
  MeshStandardMaterial,
  RepeatWrapping,
} from 'three'
import { BoxData } from '../../type'
import { useMemo, useRef } from 'react'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'

type CapinhaProps = {
  onClick: (e: ThreeEvent<MouseEvent>, id: string) => void
  texture: Texture
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
}

type BoxGameProps = {
  onClick: (e: ThreeEvent<MouseEvent>, id: string) => void
} & BoxData

export const BoxGame = ({
  position,
  rotation,
  thumbnail,
  onClick,
  id,
}: BoxGameProps) => {
  const texture = useMemo(() => {
    const tex = new TextureLoader().load(thumbnail)

    // 🔥 espelhamento horizontal
    tex.wrapS = RepeatWrapping
    tex.wrapT = RepeatWrapping
    tex.repeat.x = -1
    tex.offset.x = 1 // corrige o deslocamento

    tex.needsUpdate = true
    return tex
  }, [thumbnail])

  return (
    <Capinha
      onClick={(e) => onClick(e, id)}
      id={id}
      rotation={rotation}
      position={position}
      texture={texture}
    />
  )
}

export function Capinha({
  onClick,
  rotation,
  position,
  texture,
  id,
}: CapinhaProps) {
  const capinhaRef = useRef<Group>(null)
  const { nodes, materials } = useGLTF('/capinha/capinha.glb') as any

  const customMaterial = useMemo(() => {
    return new MeshStandardMaterial({ map: texture })
  }, [texture])

  return (
    <group
      ref={capinhaRef}
      scale={0.1}
      dispose={null}
      onClick={(e: ThreeEvent<MouseEvent>) => onClick(e, id)}
      position={position}
      rotation={rotation}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4?.geometry}
        material={materials.plastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6?.geometry}
        material={materials.foil}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8?.geometry}
        material={customMaterial}
      />
    </group>
  )
}

useGLTF.preload('/capinha/capinha.glb')
