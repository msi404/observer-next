import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"
import {Show} from '@/app/_components/utils/show'
import { cn } from "@/app/_lib/utils"
import { Button } from "@/app/_components/ui/button"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const toggleSorted = () =>
  {
    if ( column.getIsSorted() === "asc" )
    {
      column.toggleSorting(true)
    } else
    {
      column.toggleSorting(false)
    }
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
          <Button
            onClick={toggleSorted}
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
        <span>{ title }</span>
        <Show when={column.getIsSorted() === "asc"} fallback={<ArrowDown />}>
        <ArrowUp />
        </Show>            
        </Button>
    </div>
  )
}
