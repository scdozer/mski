import React, { useEffect, useRef, Suspense } from "react";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "react-three-fiber";
import img from "./../../assets/main.jpeg";

const RefractionMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  `varying vec2 vUv;
    varying vec3 worldNormal;
    varying vec3 viewDirection;
    void main() {
      vUv = uv;
      vec4 transformedNormal = vec4(normal, 0.);
      vec4 transformedPosition = vec4(position, 1.0);
  
      worldNormal = normalize( modelViewMatrix * transformedNormal).xyz;
  
      viewDirection = normalize((modelMatrix * vec4( position, 1.0)).xyz - cameraPosition);
  
  
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    }`,
  `uniform sampler2D envmap;
    uniform vec2 resolution;
    varying vec3 viewDirection;
    varying vec3 worldNormal;
    varying vec2 vUv;
  
  
    void main() {
      //vec2 uv = gl_FragCoord.xy / resolution;
      vec2 uv = vUv;
      vec3 normal = worldNormal *4.0;
      vec3 refr = refract(viewDirection, normal, 1.0/1.23);
      vec4 tex = texture2D(envmap, uv + refr.xy);
  
      gl_FragColor = tex;
    }`
);

extend({ RefractionMaterial });

const Refract = () => {
  const ref = useRef();
  const texture = useTexture(img);

  useFrame((state) => {
    if (ref.current.material.uniforms.envmap) {
      ref.current.material.uniforms.envmap.value = texture;
    }
    ref.current.rotateX(0.01);
    ref.current.rotateZ(0.01);
  });
  useEffect(() => {
    //console.log(ref.current.material.uniforms)
    //
    if (ref.current.material.uniforms.envmap) {
      ref.current.material.uniforms.envmap.value = texture;
    }
  }, [texture]);
  return (
    <>
      <Suspense fallback={null}>
        <mesh ref={ref} position={[0, 0, -2]}>
          <sphereBufferGeometry args={[5, 32, 32]} />
          <refractionMaterial />
        </mesh>
      </Suspense>
    </>
  );
};

export default Refract;
