"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/trophy.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.metalness = 0.85;
          mat.roughness = 0.35;
          mat.color = new THREE.Color("#d4b04a");
        }
      });
    }
  });

  return <primitive ref={ref} object={scene} scale={0.9} />;
}

export default function Trophy3D() {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) return null;

  return (
    <div style={{ display: loaded ? "block" : "none" }}>
        <Canvas
          camera={{ position: [0, 0.5, 4], fov: 38 }}
          style={{
            width: "min(240px, 70vw)",
            height: "min(240px, 70vw)",
            background: "transparent",
            margin: "0 auto",
          }}
          onCreated={() => setLoaded(true)}
          onError={() => setError(true)}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 3]} intensity={2.5} color="#fffbe6" />
          <directionalLight position={[-2, 2, -3]} intensity={0.6} color="#ffd080" />
          <pointLight position={[0, 3, 2]} intensity={1.0} color="#ffffff" />
          <pointLight position={[0, 1, -2]} intensity={0.4} color="#ffe0a0" />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      </div>
  );
}
