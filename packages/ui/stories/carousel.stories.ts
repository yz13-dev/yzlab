import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { CarouselDemo } from "./components/carousel";

const meta = {
  title: "Example/Carousel",
  component: CarouselDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CarouselDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
