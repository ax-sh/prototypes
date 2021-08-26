import React from 'react';
import { ComponentMeta } from '@storybook/react';
import View from "./index";


export default {
  title: 'Example/View',
  component: View,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof View>;


export const Default = () => <View >Button</View>;
export const Primary = () => <View >j</View>;
//
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
//
// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };
