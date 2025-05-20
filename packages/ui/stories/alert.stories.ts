import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertDemo } from "./components/alert";

const meta = {
  title: "Example/Alert",
  component: AlertDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AlertDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
