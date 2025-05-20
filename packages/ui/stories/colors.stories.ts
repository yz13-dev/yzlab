import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import Colors from "./components/colors";

const meta = {
  title: "Config/Colors",
  component: Colors,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
