import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { MenubarDemo } from "./components/menubar";

const meta = {
  title: "Example/Menubar",
  component: MenubarDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MenubarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
