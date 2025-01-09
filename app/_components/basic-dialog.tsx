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

type BasicDialog = {
  buttonLabel: string
  buttonIcon?: ReactNode
  title: string
  description: string
  primaryAction: ReactNode
  secondaryAction: ReactNode
  children: ReactNode
}

export const BasicDialog: FC<BasicDialog> = ( {
  buttonLabel,
  buttonIcon,
  title,
  description,
  primaryAction,
  secondaryAction,
  children } ) =>
{
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="lg:w-1/4">{ buttonLabel } {buttonIcon}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
        <Separator className='absolute bottom-1/4 left-1/2 right-1/2 translate-x-1/2 w-screen'/>
        </div>
        <DialogFooter>
          <div className='flex justify-between w-full'>
            {primaryAction}
            {secondaryAction}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
