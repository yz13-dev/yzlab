import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { StackExample } from "./components/stack";

const meta = {
  title: "Widgets/Stack",
  component: StackExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StackExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
