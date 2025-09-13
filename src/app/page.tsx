'use client'
import dynamic from 'next/dynamic'

const CanvasComponent = dynamic(() => import('@/modules/3d/CanvasComponent'), {
  ssr: false,
})

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <CanvasComponent>
        <Scene />
      </CanvasComponent>
    </>
  )
}
