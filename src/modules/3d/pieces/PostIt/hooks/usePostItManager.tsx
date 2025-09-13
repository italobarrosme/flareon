'use client'

import { useState, useCallback, useMemo } from 'react'
import * as THREE from 'three'
import { clampPositionToBoardLimits } from '../../Board/hooks'

export type PostItData = {
  id: string
  position: [number, number, number]
  label: string
  color?:
    | 'yellow'
    | 'lightblue'
    | 'lightgreen'
    | 'pink'
    | 'orange'
    | 'lightcoral'
    | 'green'
}

// Pool de objetos para reutilização
class PostItPool {
  private pool: THREE.Object3D[] = []
  private maxSize = 100 // Limitar pool size

  get(): THREE.Object3D | null {
    return this.pool.pop() || null
  }

  release(obj: THREE.Object3D) {
    if (this.pool.length < this.maxSize) {
      // Limpar estado do objeto antes de retornar ao pool
      obj.position.set(0, 0, 0)
      obj.rotation.set(0, 0, 0)
      obj.scale.set(1, 1, 1)
      this.pool.push(obj)
    }
  }

  clear() {
    this.pool.forEach((obj) => {
      obj.traverse((child) => {
        if ('geometry' in child && child.geometry) {
          ;(child.geometry as THREE.BufferGeometry).dispose()
        }
        if ('material' in child && child.material) {
          const material = child.material as THREE.Material | THREE.Material[]
          if (Array.isArray(material)) {
            material.forEach((mat) => mat.dispose())
          } else {
            material.dispose()
          }
        }
      })
    })
    this.pool = []
  }
}

const postItPool = new PostItPool()

export const usePostItManager = () => {
  // Posições iniciais válidas dentro do Board
  const initialPostIts: PostItData[] = [
    {
      id: '1',
      position: clampPositionToBoardLimits([0, 7, 0.4]), // Centro do Board (sincronizado)
      label: 'Primeiro',
      color: 'yellow',
    },
  ]

  const [postIts, setPostIts] = useState<PostItData[]>(initialPostIts)

  const addPostIt = useCallback((postIt: Omit<PostItData, 'id'>) => {
    const id = `postit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    // Garantir que a posição do novo post-it esteja dentro dos limites do Board
    const clampedPosition = clampPositionToBoardLimits(postIt.position)
    setPostIts((prev) => [
      ...prev,
      { ...postIt, id, position: clampedPosition },
    ])
  }, [])

  const removePostIt = useCallback((id: string) => {
    setPostIts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updatePostIt = useCallback(
    (id: string, updates: Partial<PostItData>) => {
      setPostIts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      )
    },
    []
  )

  const clearAllPostIts = useCallback(() => {
    setPostIts([])
    postItPool.clear()
  }, [])

  // Criar múltiplos post-its de uma vez (para testes de stress)
  const createBatch = useCallback(
    (count: number, startPosition: [number, number, number] = [0, 7, 0.3]) => {
      const colors = [
        'yellow',
        'lightblue',
        'lightgreen',
        'pink',
        'orange',
        'lightcoral',
      ]
      const newPostIts: PostItData[] = []

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        const radius = Math.ceil(i / 10) * 2

        // Calcular posição e garantir que fique dentro do Board
        const calculatedPosition: [number, number, number] = [
          startPosition[0] + Math.cos(angle) * radius,
          startPosition[1] + Math.sin(angle) * radius,
          startPosition[2],
        ]

        newPostIts.push({
          id: `batch-${Date.now()}-${i}`,
          position: clampPositionToBoardLimits(calculatedPosition),
          label: `Post-it ${i + 1}`,
          color: colors[i % colors.length] as PostItData['color'],
        })
      }

      setPostIts((prev) => [...prev, ...newPostIts])
    },
    []
  )

  // Stats para monitoramento
  const stats = useMemo(
    () => ({
      count: postIts.length,
      poolSize: postItPool?.['pool']?.length || 0,
      memoryUsage: postIts.length * 0.1, // Estimativa em MB
    }),
    [postIts.length]
  )

  return {
    postIts,
    addPostIt,
    removePostIt,
    updatePostIt,
    clearAllPostIts,
    createBatch,
    stats,
  }
}
