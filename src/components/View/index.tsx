import React from "react";
import styled from "styled-components";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Cylinder,
  OrbitControls,
  Sphere,
  useAspect,
} from "@react-three/drei";
import * as THREE from "three";

// Double Helix
// A DNA molecule consists of two strands that wind around each other like a twisted ladder. Each strand has a backbone made of alternating groups of sugar (deoxyribose) and phosphate groups. Attached to each sugar is one of four bases: adenine (A), cytosine (C), guanine (G), or thymine (T).

const ViewStyled = styled.section`
  height: 100vh;
`;
// const COLORS = ["#FDD400", "#FDB232", "#02B8A2", "#01535F"];
const COLORS = ["#ff14af", "#39ff14", "#6514ff"];

const Ball = (props: any) => {
  const segments = 365;
  const radius = 0.2;
  return <Sphere args={[radius, segments, segments]} {...props} />;
};

const Tube = ({ color }: any) => {
  const radius = 0.1;
  const length = 6;
  return (
    <Cylinder
      args={[radius, radius, length]}
      rotation={[0, 0, (90 * Math.PI) / 180]}
      position={[0, 0, 0]}
      // attach="geometry"
    >
      <meshBasicMaterial attach="material" color={color} />
    </Cylinder>
  );
};

const Helix = ({ color, ...props }: any) => {
  return (
    <group {...props}>
      <Ball position={[3, 0, 0]} />
      <Tube color={color} />
      <Ball position={[-3, 0, 0]} />
    </group>
  );
};
const range = [...Array(20).keys()];
const step = {
  rotation: 0.4,
  vertical: 2,
};
const DNA = () => {
  const ref = React.useRef();
  const scale = useAspect(
    100, // Pixel-width
    100, // Pixel-height
    1 // Optional scaling factor
  );

  const { camera } = useThree();
  useFrame(() => {
    // @ts-ignore
    ref.current.rotation.y += 0.1;
    // console.log(camera.fov
    //
    // // Calculate the camera distance
    // let distance = Math.abs( objectSize / Math.sin( fov / 2 ) );)

    let vFoV = camera.getEffectiveFOV();
    let hFoV = camera.fov * camera.aspect;
    let FoV = Math.min(vFoV, hFoV);
    let FoV2 = FoV / 2;

    let dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    console.log(hFoV, vFoV, dir);
  });
  return (
    <mesh ref={ref} scale={scale} position={[0, -1, 0]}>
      {range.map((i) => (
        <Helix
          color={COLORS[i % COLORS.length]}
          position={[1, i * step.vertical, 0]}
          rotation={[0, i * -step.rotation, 0]}
        />
      ))}
    </mesh>
  );
};

const Helix3D = (props: any) => {
  return (
    <ViewStyled {...props}>
      <Canvas mode={"concurrent"}>
        <color attach="background" args={["black"]} />
        <DNA />
        {/*<OrbitControls enablePan={false} autoRotate rotateSpeed={5} />*/}
      </Canvas>
    </ViewStyled>
  );
};

export default Helix3D;
