'use client';
import { type FC, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover';
import {Command, CommandInput, CommandGroup, CommandEmpty, CommandList, CommandItem} from '@/app/_components/ui/command'
import { cn } from '@/app/_lib/utils';

type ComboboxType = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  disabled?: boolean;
};

export const Combobox: FC<ComboboxType> = ({
  options,
  value,
  onChange,
  label,
  className,
  disabled,
}) => {
  const [open, setOpen] = useState(false); // Add Popover state control

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue); // Update the form value
    setOpen(false); // Close the Popover after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {options.find((option) => option.value === value)?.label || label}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <Command>
          <CommandInput placeholder='ابحث...' className='h-9' />
          <CommandList>
            <CommandEmpty>لم يتم العثور على العنصر</CommandEmpty>
            <CommandGroup>
            {options.map((option) => (
          <CommandItem
            key={option.value}
            onSelect={() => handleSelect(option.value)}
          >
            <Check
              className={cn('h-4 w-4 mr-2', value === option.value ? 'opacity-100' : 'opacity-0')}
            />
            {option.label}
          </CommandItem>
        ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
