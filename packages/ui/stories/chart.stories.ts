import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { ChartDemo } from "./components/chart";

const meta = {
  title: "Example/Chart",
  component: ChartDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ChartDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
