import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenuDemo } from "./components/navigation-menu";

const meta = {
  title: "Example/NavigationMenu",
  component: NavigationMenuDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NavigationMenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
