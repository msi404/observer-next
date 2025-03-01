"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Retry } from "@/stories/Retry/retry";

const meta: Meta<typeof Retry> = {
  title: "Components/Retry",
  component: Retry,
};

export default meta;
type Story = StoryObj<typeof Retry>;

export const Default: Story = {
  args: {
    refetch: () => alert("Refetch triggered!"),
  },
};
