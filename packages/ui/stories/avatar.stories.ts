import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { FullAvatar } from "./components/avatar";

const meta = {
  title: "Example/Avatar",
  component: FullAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof FullAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/101273441?v=4",
    fallback: "YZ",
    alt: "AVATAR",
  },
};
