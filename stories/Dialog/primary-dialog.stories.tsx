import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BasicDialog } from "@/stories/Dialog/primary-dialog";
import { Button } from "@/stories/Button/button";

const meta: Meta<typeof BasicDialog> = {
  title: "Components/BasicDialog",
  component: BasicDialog,
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BasicDialog>;

export const Default: Story = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <BasicDialog
      {...args}
      open={open}
      onOpenChange={setOpen}
      button={<Button onClick={() => setOpen(true)}>Open Dialog</Button>}
    >
      <p>This is a basic dialog content.</p>
    </BasicDialog>
  );
};

Default.args = {
  title: "Dialog Title",
  description: "This is a description for the dialog.",
};
