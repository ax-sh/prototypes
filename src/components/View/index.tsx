import React from "react";
import styled from "styled-components";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Cylinder,
  Html,
  OrbitControls,
  Sphere,
  useAspect,
  useHelper,
} from "@react-three/drei";
import * as THREE from "three";
import { BoxHelper } from "three";

// Double Helix
// A DNA molecule consists of two strands that wind around each other like a twisted ladder.
// Each strand has a backbone made of alternating groups of sugar (deoxyribose) and phosphate groups.
// Attached to each sugar is one of four bases: adenine (A), cytosine (C), guanine (G), or thymine (T).

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

const Helix = ({ color, cylinder, ...props }: any) => {
  return (
    <group {...props}>
      <Ball position={[3, 0, 0]} />
      {cylinder && <Tube color={color} />}
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
  const axisRef = React.useRef();
  const controlsRef = React.useRef();
  const mesh = ref;
  const {
    camera,
    size: { width, height },
  } = useThree();

  // useHelper(mesh, BoxHelper, "cyan");

  React.useEffect(() => {
    const o = mesh.current;

    if (!o) return;

    const bbox = new THREE.Box3().setFromObject(o);

    const sphere = bbox.getBoundingSphere(new THREE.Sphere());
    const { center, radius } = sphere;

    const controls = controlsRef.current as any;
    if (controls) {
      controls.reset();
      controls.target.copy(center);
      controls.maxDistance = 5 * radius;
    }

    camera.position.copy(
      center
        .clone()
        .add(new THREE.Vector3(-1.0 * radius, 1.0 * radius, 1.0 * radius))
    );
    camera.far = 10 * radius;
    camera.updateProjectionMatrix();

    const axis = axisRef.current as any;
    if (axis) {
      axis.scale.set(radius, radius, radius);
      axis.position.copy(center);
    }
  }, []);
  useFrame((t) => {
    const f = Math.sin(t.clock.elapsedTime);
    mesh.current.rotation.y += f * 0.04;
    // mesh.current.rotation.x +=  Math.sin(t.clock.elapsedTime) * 90;
    // mesh.current.rotation.y = (90 * Math.PI) / 180;
    // console.log("dsds", t.clock,)
    // mesh.current.rotation.y+=.04
  });

  return (
    <>
      {/*<axesHelper ref={axisRef} />*/}
      <group ref={ref}>
        {range.map((i) => (
          <Helix
            color={COLORS[i % COLORS.length]}
            position={[0, i * step.vertical, 0]}
            rotation={[0, i * -step.rotation, 0]}
            cylinder
          />
        ))}
      </group>
      <OrbitControls ref={controlsRef} enablePan={false} />
    </>
  );
};

const Helix3D = (props: any) => {
  return (
    <ViewStyled {...props}>
      <Canvas mode={"concurrent"}>
        <color attach="background" args={["black"]} />
        <React.Suspense fallback={<Html>LOADING</Html>}>
          <DNA />
        </React.Suspense>

        {/*<OrbitControls enablePan={false} autoRotate rotateSpeed={5}  />*/}
      </Canvas>
    </ViewStyled>
  );
};

export default Helix3D;
