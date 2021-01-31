import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import Refract from "./../diamonds/";
import { OrbitControls } from "@react-three/drei";
import { BackSide, FrontSide } from "three";

// import img from "/assets/main.jpeg";

function Image() {
  const texture = useLoader(THREE.TextureLoader, "/assets/main.jpeg");
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[6, 6]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        toneMapped={true}
        // side={FrontSide}
        // side={Backside}
      />
    </mesh>
  );
}

export default function HomeCanvas() {
  return (
    <Canvas colorManagement>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <OrbitControls />
        <Image />
        <Refract />
      </Suspense>
    </Canvas>
  );
}
