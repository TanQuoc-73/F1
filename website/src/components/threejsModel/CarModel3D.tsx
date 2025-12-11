"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

interface CarModelProps {
  modelPath: string;
  scale?: number;
  autoRotate?: boolean;
  enableControls?: boolean;
}

function CarModel({ modelPath, scale = 1 }: { modelPath: string; scale: number }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} />;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color="#444444" />
    </mesh>
  );
}

export default function CarModel3D({
  modelPath,
  scale = 1.4,
  autoRotate = false,
  enableControls = true,
}: CarModelProps) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[5, 2, 5]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
      <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
      
      {/* 3D Model */}
      <Suspense fallback={<LoadingFallback />}>
        <CarModel modelPath={modelPath} scale={scale} />
      </Suspense>
      
      {/* Controls */}
      {enableControls && (
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
      )}
    </Canvas>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/mclaren_f1.glb');
