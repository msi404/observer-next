"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/stories/DatePicker/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    value: { control: "date" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = (args: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      {...args}
      value={selectedDate}
      onChange={(date: any) => setSelectedDate(date)}
    />
  );
};

Default.args = {
  value: null,
  disabled: false,
};
