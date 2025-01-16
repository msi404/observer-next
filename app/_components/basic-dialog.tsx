import {type FC, type ReactNode} from 'react'
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Separator } from '@/app/_components/ui/separator'
import { DialogClose } from '@radix-ui/react-dialog';

type BasicDialog = {
  buttonLabel: string
  buttonIcon?: ReactNode
  title: string
  open: boolean
  onOpenChange: any, 
  description: string
  primaryAction: ReactNode
  secondaryAction: ReactNode
  children: ReactNode
}

export const BasicDialog: FC<BasicDialog> = ( {
  buttonLabel,
  buttonIcon,
  title,
  open,
  onOpenChange,
  description,
  primaryAction,
  secondaryAction,
  children } ) =>
{
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="lg:w-1/4">{ buttonLabel } {buttonIcon}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] max-h-[100%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
           {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          { children }
        </div>
        <div className=' relative'>
        <Separator className='absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen'/>
        </div>
        <DialogFooter>
          <div className='flex justify-between w-full'>
            {primaryAction}
            <DialogClose asChild aria-label='Close'>
            {secondaryAction}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
