import "@/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TooltipExample } from "./components/tooltip";

const meta = {
  title: "Example/Tooltip",
  component: TooltipExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onCheckedChange: fn() },
} satisfies Meta<typeof TooltipExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
}
