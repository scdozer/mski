import * as THREE from "three";
import { DoubleSide } from "three";
import React, { Suspense } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import Refract from "./../refractor";
import { OrbitControls } from "@react-three/drei";
import img from "./../../assets/main.jpeg";
import { Html } from "@react-three/drei";

// import img from "/assets/main.jpeg";

function Image() {
  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[6, 6]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        toneMapped={true}
        // side={FrontSide}
        side={DoubleSide}
      />
    </mesh>
  );
}

export default function HomeCanvas() {
  return (
    <Canvas colorManagement>
      <ambientLight intensity={0.9} />
      <Suspense fallback={null}>
        <OrbitControls />
        <group position={[0, 1, 0]}>
          <Image />
          <Refract />
          {/* <Html scaleFactor={8}>
            <div class="overlay">move me</div>
          </Html> */}
        </group>
      </Suspense>
    </Canvas>
  );
}
