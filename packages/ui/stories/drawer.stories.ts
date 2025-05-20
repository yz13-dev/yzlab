import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { DrawerDemo } from "./components/drawer";

const meta = {
  title: "Example/Drawer",
  component: DrawerDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DrawerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
