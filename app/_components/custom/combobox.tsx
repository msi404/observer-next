/* eslint-disable @typescript-eslint/no-unused-expressions */
import { type FC, useState, useRef } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/_components/ui/popover';
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandEmpty,
  CommandList,
  CommandItem
} from '@/app/_components/ui/command';
import { cn } from '@/app/_lib/utils';

type ComboboxType = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  disabled?: boolean;
  onScrollEnd?: () => void; // New prop for handling scroll
};

export const Combobox: FC<ComboboxType> = ({
  options,
  value,
  onChange,
  label,
  className,
  disabled,
  onScrollEnd
}) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        onScrollEnd?.();
      }
    }
  };

  return (
    <Popover open={open} modal={true} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {options.find((option) => option.value === value)?.label || <span className='text-gray-400'>{label}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" side="bottom" align="start" avoidCollisions={false}>
        <Command>
          <CommandInput placeholder="ابحث..." className="h-9" />
          <CommandList ref={listRef} onScroll={handleScroll} className="max-h-44 overflow-y-auto">
            <CommandEmpty>لم يتم العثور على العنصر</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} onSelect={() => {onChange(option.value), setOpen(false)}}>
                  <Check className={cn('h-4 w-4 mr-2', value === option.value ? 'opacity-100' : 'opacity-0')} />
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
