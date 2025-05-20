import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DropdownMenuExample } from "./components/dropdown-menu";

const meta = {
  title: "Example/Dropdown-menu",
  component: DropdownMenuExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof DropdownMenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
}

