'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Copilot({ mouse }) {
  const ref = useRef()
  const { scene } = useGLTF('/agent.glb')

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.current.x * 0.5, 0.1)
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.current.y * 0.5, 0.1)
    }
  })

  return <primitive object={scene} ref={ref}  scale={0.5} position={[0, -1, -1.5]} />
}

export default function CopilotModel() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    mouse.current = {
      x: ((e.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((e.clientY - bounds.top) / bounds.height - 0.5) * 2,
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 0, 5]} />
        <Copilot mouse={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
