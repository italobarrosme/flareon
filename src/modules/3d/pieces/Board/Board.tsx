import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Group } from 'three'

type BoardProps = {
  width?: number
  height?: number
  color?: string
  lineColor?: string
  env?: any
  onClick?: (mesh: Group) => void
}

// Cache global para geometrias do board
const geometryCache = new Map<string, THREE.PlaneGeometry>()
const materialCache = new Map<string, THREE.MeshStandardMaterial>()

const getGeometry = (width: number, height: number) => {
  const key = `${width}x${height}`
  if (!geometryCache.has(key)) {
    geometryCache.set(key, new THREE.PlaneGeometry(width, height))
  }
  return geometryCache.get(key)!
}

const getMaterial = (color: string) => {
  if (!materialCache.has(color)) {
    materialCache.set(
      color,
      new THREE.MeshStandardMaterial({
        color,
        // Otimizações de material
        flatShading: true, // Reduzir cálculos de iluminação
      })
    )
  }
  return materialCache.get(color)!
}

export const Board = ({
  width = 16,
  height = 6,
  color = '#f9f9f9',
  lineColor = '#964b00',
  env,
  onClick,
}: BoardProps) => {
  const boardRef = useRef<Group>(null)

  // Usar geometrias e materiais cacheados
  const frameGeometry = useMemo(
    () => getGeometry(width, height),
    [width, height]
  )
  const boardGeometry = useMemo(
    () => getGeometry(width - 0.3, height - 0.3),
    [width, height]
  )
  const frameMaterial = useMemo(() => getMaterial(lineColor), [lineColor])
  const boardMaterial = useMemo(() => getMaterial(color), [color])

  useEffect(() => {
    // Não fazer dispose de recursos compartilhados
    return () => {
      // Cleanup mínimo - recursos são gerenciados globalmente
    }
  }, [])

  return (
    <group
      dispose={null}
      position={[0, 7, 0.2]}
      castShadow
      receiveShadow
      onClick={() => {
        if (onClick && boardRef.current) {
          onClick(boardRef.current)
        }
      }}
      ref={boardRef}
    >
      {/* fundo do quadro */}
      <mesh
        geometry={frameGeometry}
        material={frameMaterial}
        material-envMap={'city'}
      />

      <mesh
        geometry={boardGeometry}
        material={boardMaterial}
        position={[0, 0, 0.05]}
        material-envMap={env}
      />
    </group>
  )
}
