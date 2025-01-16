'use client';

import { type FC, useState } from 'react';
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

export const DatePicker: FC = () => {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <Calendar1Icon className="mr-2 w-4 h-4" />
          {date ? format(date, 'PPP') : <span>تاريخ الميلاد</span>}{' '}
          {/* Check for date validity */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={ date }
          captionLayout="dropdown-buttons"
          onSelect={setDate}
          initialFocus
          fromYear={ 1960 }
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
};
