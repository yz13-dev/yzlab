import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../src/components/ui/skeleton";

const meta = {
  title: "Example/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-10 h-10 rounded-full",
  },
};
