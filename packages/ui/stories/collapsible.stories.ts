import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { CollapsibleDemo } from "./components/collapsible";

const meta = {
  title: "Example/Collapsible",
  component: CollapsibleDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CollapsibleDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
