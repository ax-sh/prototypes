import React from "react";
import { ComponentMeta } from "@storybook/react";
import Helix3D from "./index";

export default {
  title: "3D/Helix3D",
  component: Helix3D,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Helix3D>;

export const Default = () => <Helix3D />;
