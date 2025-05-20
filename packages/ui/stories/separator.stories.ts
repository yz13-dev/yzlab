import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../src/components/ui/separator";

const meta = {
  title: "Example/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "!w-80",
  },
};
