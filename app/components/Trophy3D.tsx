"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/trophy.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.metalness = 0.9;
            mat.roughness = 0.35;
            mat.envMapIntensity = 0.8;
          }
        });
      } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.metalness = 0.9;
        mesh.material.roughness = 0.35;
        mesh.material.envMapIntensity = 0.8;
      }
    }
  });

  return <primitive ref={ref} object={scene} scale={1.4} />;
}

export default function Trophy3D() {
  return (
    <div className="award-trophy-card">
      <div style={{ width: "min(320px, 80vw)", height: "min(340px, 80vw)" }}>
        <Canvas
          camera={{ position: [0, 0.5, 3.2], fov: 35 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} color="#fff" />
          <directionalLight
            position={[3, 4, 3]}
            intensity={1.2}
            color="#fff"
          />
          <directionalLight
            position={[-2, 1, -1]}
            intensity={0.5}
            color="#FFD9A0"
          />
          <Environment preset="city" environmentIntensity={0.4} />
          <Suspense fallback={null}>
            <Model />
            <ContactShadows
              position={[0, -1, 0]}
              opacity={0.3}
              scale={4}
              blur={3}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
