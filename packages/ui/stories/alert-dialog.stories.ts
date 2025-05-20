import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialogDemo } from "./components/alert-dialog";

const meta = {
  title: "Example/AlertDialog",
  component: AlertDialogDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AlertDialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
