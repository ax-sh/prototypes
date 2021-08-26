import React from "react";
import styled from "styled-components";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Cylinder,
  OrbitControls,
  Sphere,
  useAspect,
  useHelper,
} from "@react-three/drei";
import * as THREE from "three";
import { BoxHelper } from "three";

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
  const mesh = ref;
  const { camera, size: { width, height } } = useThree();


  // useHelper(mesh, BoxHelper, "cyan");
  React.useEffect(() => {
    const o = mesh.current;
    if (!o) return;
    // const g = o.geometry.computeBoundingBox();
    // console.log({camera, o, g}, "jj")


    // // Just to help others out, I got the desired effect working with an orthographic camera by setting the zoom.
    // const aabb = new THREE.Box3().setFromObject(o);
    //
    // camera.zoom = Math.min(
    //     width / (aabb.max.x - aabb.min.x),
    //     height / (aabb.max.y - aabb.min.y)
    // );
    // camera.updateProjectionMatrix();
  }, []);
  // const boundingSphere = o?.geometry.boundingSphere
  //  const viewWidth = 1000
  // camera.zoom = viewWidth / ( boundingSphere?.radius * 2 )
  //
  // console.log(boundingSphere,"jj")
  // camera.zoom = -8
  // camera.updateProjectionMatrix()

  // const aspect = window.innerWidth / window.innerHeight;
  //
  // const fov = camera.fov * (Math.PI / 180);
  //
  // const objectSize = 0.6 + ( 0.5 * Math.sin( Date.now() * 0.001 ) );
  //
  //
  // const cameraPosition = new THREE.Vector3(
  //     0,
  //     o.position.y + Math.abs( objectSize / Math.sin( fov / 2 ) ),
  //     0
  // );
  // console.log({ aspect, fov, objectSize });
  // camera.position.copy( cameraPosition );
  // // camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
  // // const radius = o.geometry.boundingSphere.radius;
  // // const aspect = window.width / window.height;
  // // const distanceFactor = Math.abs((aspect * radius) / Math.sin(camera.fov / 2));
  // // console.log({ o, camera, distanceFactor, pp:camera.fov });
  // camera.position.z = 10;

  return (
      <Center alignTop>


    <mesh ref={ref}>
      {range.map((i) => (
        <Helix
          color={COLORS[i % COLORS.length]}
          position={[1, i * step.vertical, 0]}
          rotation={[0, i * -step.rotation, 0]}
        />
      ))}
    </mesh>   </Center>
  );
};

const Helix3D = (props: any) => {
  return (
    <ViewStyled {...props}>
      <Canvas mode={"concurrent"}>
        <color attach="background" args={["black"]} />
        <DNA />
        {/*<OrbitControls enablePan={false} autoRotate rotateSpeed={5}  />*/}
      </Canvas>
    </ViewStyled>
  );
};

export default Helix3D;
