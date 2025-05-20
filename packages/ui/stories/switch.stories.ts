import "@/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Switch } from "../src/components/ui/switch";

const meta = {
  title: "Example/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onCheckedChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
