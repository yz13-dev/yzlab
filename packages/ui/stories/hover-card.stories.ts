import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { HoverCardDemo } from "./components/hover-card";

const meta = {
  title: "Example/HoverCard",
  component: HoverCardDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HoverCardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
