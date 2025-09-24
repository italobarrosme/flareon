type GameInfoPlaneProps = {
  position: [number, number, number]
  visible?: boolean
  children: React.ReactNode
}

export const GameInfoPlane = ({
  position,
  visible = true,
  children,
}: GameInfoPlaneProps) => {
  if (!visible) return null

  return (
    <group position={position}>
      {/* Plano de fundo 3D */}
      <mesh>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.95} />
      </mesh>

      {/* Borda do plano */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[4.1, 5.1]} />
        <meshStandardMaterial color="#16213e" transparent opacity={0.8} />
      </mesh>

      {children}
    </group>
  )
}
