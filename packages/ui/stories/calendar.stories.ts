import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDemo } from "./components/calendar";

const meta = {
  title: "Example/Calendar",
  component: CalendarDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CalendarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
