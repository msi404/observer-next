import {type ReactNode, type FC} from 'react'

import { cn } from "@/app/_lib/utils";
import { Button } from '@/app/_components/ui/button'

export const ThemedButton: FC<{children: ReactNode, className?: string}> = ({children, className}) => {
  return (
	  <Button className={ cn( "lg:w-1/4", className ) }>{children}</Button>
  );
}