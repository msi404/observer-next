import { type FC, type ReactNode } from 'react';
import {cn} from '@/app/_lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/_components/ui/dialog';
import { Separator } from '@/app/_components/ui/separator';

type BasicDialog = {
  button: ReactNode;
  title: string;
  open: boolean;
  onOpenChange: any;
  description: string;
  children: ReactNode;
  className?: string
};

export const BasicDialog: FC<BasicDialog> = ({
  button,
  title,
  open,
  onOpenChange,
  description,
  children,
  className
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>
      <DialogContent className={cn("max-w-[425px] max-h-[100%] overflow-y-auto", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className=" relative">
          <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
        </div>
        <div className="grid gap-4 py-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
