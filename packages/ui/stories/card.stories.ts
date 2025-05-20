import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { CardWithForm } from "./components/card";

const meta = {
  title: "Example/Card",
  component: CardWithForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CardWithForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
