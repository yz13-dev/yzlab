import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { InputOTPDemo } from "./components/input-otp";

const meta = {
  title: "Example/InputOTP",
  component: InputOTPDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof InputOTPDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
