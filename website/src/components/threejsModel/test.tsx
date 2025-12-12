"use client";
import CarModel3D from "./CarModel3D";

export default function Scene() {
  return (
    <CarModel3D 
      modelPath="/models/mclaren_f1.glb"
      scale={1.4}
      autoRotate={false}
      enableControls={true}
    />
  );
}

