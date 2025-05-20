import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { CommandExample } from "./components/command";

const meta = {
  title: "Example/Command",
  component: CommandExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CommandExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
