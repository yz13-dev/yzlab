import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxDemo } from "./components/checkbox";

const meta = {
  title: "Example/Checkbox",
  component: CheckboxDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CheckboxDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
