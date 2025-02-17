'use client';

import { type FC } from 'react';
import { format } from 'date-fns';
import { Calendar1Icon } from 'lucide-react';

import { cn } from '@/app/_lib/utils';
import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/_components/ui/popover';

export const DatePicker: FC<{value: Date | null, onChange: VoidFunction, disabled?: boolean, className?: string}> = ({value, onChange, disabled, className}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn(className)} asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <Calendar1Icon className="mr-2 w-4 h-4" />
          {value ? format(value, 'PPP') : <span>تاريخ الميلاد</span>}{' '}
          {/* Check for date validity */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={disabled}
          mode="single"
          // @ts-ignore
          selected={value}
          captionLayout="dropdown-buttons"
          onSelect={onChange}
          initialFocus
          fromYear={ 1960 }
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
};
