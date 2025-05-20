import "@/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import TagsDemo from "./components/tags";

const meta = {
  title: "Example/Tags",
  component: TagsDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TagsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
