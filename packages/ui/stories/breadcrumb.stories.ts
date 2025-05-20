import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbDemo } from "./components/breadcrumb";

const meta = {
  title: "Example/Breadcrumb",
  component: BreadcrumbDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BreadcrumbDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
