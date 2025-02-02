'use client';
import { type FC ,useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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
import {cn} from '@/app/_lib/utils'

type ComboboxType = {
	options: { value: string, label: string; }[],
	label: string,
	className?: string,
	disabled?: boolean,
	setSelect: (value: string) => void
}

export const Combobox: FC<ComboboxType> = ({options, label, className, setSelect, disabled}) =>
{
	const [ open, setOpen ] = useState<boolean>( false )
	const [ value, setValue ] = useState<string>( '' )

	const onSelect = (currentValue: string) =>
	{
		setValue( ( currentValue === value ? "" : currentValue ) )
		setSelect(currentValue)
		setOpen(false)
	}
	
	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					variant='outline'
					role='combobox'
					aria-expanded={ open }
					className={ cn( 'w-full justify-between', className ) }
				>
				<Show when={value} fallback={label}>
					{options.find((option) => option.value === value)?.label}
				</Show>
					<ChevronsUpDown className='ml-2 h-4 shrink-0 opacity-50'/>		
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-96 p-0'>
				<Command>
					<CommandInput placeholder='بحث...' />
						<CommandList className='max-h-60'>
						<CommandEmpty>لم يتم العثور على { label }</CommandEmpty>
							<CommandGroup>
							<For each={options}>
									{ ( option, index ) => (
										<CommandItem
											key={ option.value }
											value={ option.value }
											onSelect={(currentValue) => onSelect(currentValue)}
										>
											<Check className={ cn( 'mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0' ) } />
											{ option.label }
										</CommandItem>
									)}
								</For>
							</CommandGroup>
						</CommandList>
				</Command>

			</PopoverContent>
		</Popover>
	)
}