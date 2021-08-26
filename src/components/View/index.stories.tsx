import React from "react";
import { ComponentMeta } from "@storybook/react";
import Helix3D from "./index";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
// import { withKnobs, number } from '@storybook/addon-knobs'

export default {
  title: "3D/Helix3D",
  component: Helix3D,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Helix3D>;

export const Default = () => <Helix3D />;

function MeshDistortMaterialScene() {
  return (
    <Icosahedron args={[1, 4]}>
      <MeshDistortMaterial
        attach="material"
        color="#f25042"
        speed={1}
        distort={1}
        radius={1}
      />
    </Icosahedron>
  );
}

export const MeshDistortMaterialSt = () => <MeshDistortMaterialScene />;
// MeshDistortMaterialSt.storyName = 'c'
