'use client'

import { ThreeElements, useThree } from '@react-three/fiber'
import { DragControls, Html, Text } from '@react-three/drei'
import { useRef, useState, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { useBoardLimits } from '../Board/hooks'

type PostItProps = ThreeElements['group'] & {
  label: string
  color?: string
  onInteractionStart?: () => void
  onInteractionEnd?: () => void
  onTextChange?: (newText: string) => void
}

// Geometria compartilhada para todos os post-its (singleton)
const sharedGeometry = new THREE.PlaneGeometry(1, 1)

// Cache de materiais para evitar recriação
const materialCache = new Map<string, THREE.MeshStandardMaterial>()

const getMaterial = (color: string, opacity: number = 1) => {
  const key = `${color}-${opacity}`
  if (!materialCache.has(key)) {
    materialCache.set(
      key,
      new THREE.MeshStandardMaterial({
        color,
        transparent: opacity < 1,
        opacity,
      })
    )
  }
  return materialCache.get(key)!
}

export const PostIt = ({
  color = 'yellow',
  label,
  onInteractionStart,
  onInteractionEnd,
  onTextChange,
  ...props
}: PostItProps) => {
  // Usar os limites dinâmicos baseados no Board, considerando a posição atual
  const currentPosition = (props.position as [number, number, number]) || [
    0, 7, 0.4,
  ]
  const dragLimits = useBoardLimits(undefined, currentPosition)

  const ref = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const [isDragging, setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(label)
  const { gl, invalidate } = useThree()

  // Materiais memoizados
  const normalMaterial = useMemo(() => getMaterial(color, 1), [color])
  const draggingMaterial = useMemo(() => getMaterial(color, 0.8), [color])

  // Função para lidar com double click
  const handleDoubleClick = useCallback(
    (event: any) => {
      event.stopPropagation()
      setIsEditing(true)
      onInteractionStart?.() // Desabilitar OrbitControls durante a edição
    },
    [onInteractionStart]
  )

  // Função para salvar a edição
  const handleSaveEdit = useCallback(() => {
    onTextChange?.(editText)
    setIsEditing(false)
    onInteractionEnd?.() // Reabilitar OrbitControls
  }, [editText, onTextChange, onInteractionEnd])

  // Função para cancelar a edição
  const handleCancelEdit = useCallback(() => {
    setEditText(label) // Voltar ao texto original
    setIsEditing(false)
    onInteractionEnd?.() // Reabilitar OrbitControls
  }, [label, onInteractionEnd])

  return (
    <DragControls
      ref={ref}
      autoTransform={true}
      dragLimits={[dragLimits.x, dragLimits.y, dragLimits.z]}
      onDragStart={() => {
        setIsDragging(true)
        gl.domElement.style.cursor = 'grabbing'
        onInteractionStart?.()
        invalidate()
      }}
      onDrag={() => {
        if (ref.current) {
          ref.current.position.z = Math.max(
            0.1,
            Math.min(0.5, ref.current.position.z)
          )
        }
      }}
      onDragEnd={() => {
        setIsDragging(false)
        gl.domElement.style.cursor = 'auto'
        onInteractionEnd?.()
        invalidate()
      }}
      onHover={() => {
        if (!isDragging) {
          gl.domElement.style.cursor = 'grab'
        }
      }}
    >
      <group {...props}>
        <mesh
          ref={meshRef}
          geometry={sharedGeometry} // Usar geometria compartilhada
          material={isDragging ? draggingMaterial : normalMaterial} // Usar materiais cacheados
          castShadow
          receiveShadow
          onDoubleClick={handleDoubleClick}
        />

        <Text
          position={[0, 0, 0.1]}
          rotation={[0, 0, 0]}
          fontSize={0.1}
          color="black"
        >
          {label}
        </Text>

        {isEditing && (
          <Html
            center
            distanceFactor={10}
            occlude={false}
            transform={false}
            position={[0, 0, 0.1]}
          >
            <div
              style={{
                background: color,
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                minWidth: '200px',
                transform: 'translateY(-50%)',
              }}
            >
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSaveEdit()
                  } else if (e.key === 'Escape') {
                    handleCancelEdit()
                  }
                }}
                autoFocus
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '12px',
                  color: '#333',
                  width: '180px',
                  height: '60px',
                  display: 'block',
                }}
                placeholder="Digite o texto..."
              />
              <div
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  gap: '6px',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={handleSaveEdit}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          </Html>
        )}
      </group>
    </DragControls>
  )
}
