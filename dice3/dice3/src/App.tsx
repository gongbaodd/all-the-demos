'use client'

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url, texture }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5
  })

  // Apply the texture to all meshes in the scene
  scene.traverse((child) => {


    if (child.isMesh) {
      console.log(child.material)
      // console.log(child.material?.wrapT)
      // console.log(child.material?.minFilter)
      // console.log(child.material?.magFilter)
    }

    if (child.isMesh && texture) {

      if (child.material?.map) {

        texture.wrap = child.material.map.wrap;
        // texture.wrapT = child.material.map.wrapT;
        // texture.minFilter = child.material.map.minFilter
        // texture.magFilter = child.material.map.magFilter// Set vertical wrap
      }

      texture.rotation = Math.PI; 


      child.material.map = texture
      child.material.needsUpdate = true

    }
  })

  console.log(scene)

  return <primitive ref={ref} object={scene} scale={[2, 2, 2]} />
}

function Scene({ modelUrl, texture }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{
      width: '100vw', // Set to 100% of the viewport width
      height: '100vh', // Set to 100% of the viewport height
    }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model url={modelUrl} texture={texture} />
        <Environment preset="lobby" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default function Component() {
  const [texture, setTexture] = useState(null)
  const modelUrl = "dice.glb" // Using the sample duck model

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    console.log(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const texture = new THREE.Texture(img)
          texture.needsUpdate = true
          setTexture(texture)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1">
        <Scene modelUrl={modelUrl} texture={texture} />
        <input onChange={handleFileUpload} type="file" id="uvMapUpload" accept="image/*" style={{ position: "absolute", top: 0, left: 0 }} />
      </div>
    </div>
  )
}