import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenuDemo } from "./components/context-menu";

const meta = {
  title: "Example/ContextMenu",
  component: ContextMenuDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContextMenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
