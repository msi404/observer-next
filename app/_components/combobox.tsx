'use client';
import { type FC, type ReactNode ,useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/app/_lib/utils';
import { Button } from '@/app/_components/ui/button';
import
	{
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList
} from '@/app/_components/ui/command';
	
import
	{
		Popover,
		PopoverContent,
		PopoverTrigger
} from '@/app/_components/ui/popover';
import {Show} from '@/app/_components/show'
import { For } from '@/app/_components/for'
import { Dynamic } from '@/app/_components/dynamic'

type ComboboxType = {
	options: { value: string, label: string; }[],
	label: string,
	setSelect: () => void
}

export const Combobox: FC<ComboboxType> = ({options, label, setSelect}) =>
{
	const [ open, setOpen ] = useState<boolean>( false )
	const [ value, setValue ] = useState<string>( '' )

	const onSelect = (currentValue: string) =>
	{
		setValue( ( currentValue === value ? "" : currentValue ) )
		setOpen(false)
	}
	
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={ open }
					className='w-full justify-between'
				>
				<Show when={value} fallback={label}>
					{options.find((option) => option.value === value)?.label}
				</Show>
					<ChevronsUpDown className='ml-2 h-4 shrink-0 opacity-50'/>		
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-full p-0'>
				<Command>
					<CommandInput placeholder='Search...'>
						<CommandList>
							<CommandEmpty>No { label } found.</CommandEmpty>
							<CommandGroup>
								<For each={options}>
									{ ( option, index ) => (
										<CommandItem
											key={ option.value }
											value={ option.value }
											onSelect={(currentValue) => onSelect(currentValue)}
										>
											<Check className={ cn( 'mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0' ) } />
											<Dynamic component={ option.label } />
											{option.label}
										</CommandItem>
									)}
								</For>
							</CommandGroup>
						</CommandList>
					</CommandInput>
				</Command>

			</PopoverContent>
		</Popover>
	)
}