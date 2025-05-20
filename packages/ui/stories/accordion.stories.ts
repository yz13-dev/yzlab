import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { AccordionDemo } from "./components/accordion";

const meta = {
  title: "Example/Accordion",
  component: AccordionDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccordionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
