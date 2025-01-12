'use client';
import { type FC } from 'react';
import { useSelector } from 'react-redux';
import {
  ChevronDownIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/app/_lib/utils';
import { For } from '@/app/_components/for';
import { selectEditor } from '@/app/_lib/features/editorSlice';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/app/_components/ui/dropdown-menu';
import { Separator } from '@/app/_components/ui/separator';
import {type Level} from '@tiptap/extension-heading'

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  icon: Icon
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const HeadingLevelButton = () => {
  const editor = useSelector(selectEditor);
  const headings = [
    { label: 'Normal Text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' }
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal Text';
  };
	
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
			  <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
		  </DropdownMenuTrigger>
		  <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
			  <For each={headings}>
				  { ( {label, value, fontSize}, index ) => (
					  <button
						  onClick={ () =>
						  {
							  if ( value === 0 )
							  {
								  editor?.chain().focus().setParagraph().run()
							  } else
							  {
								  editor?.chain().focus().toggleHeading({level: value as Level}).run()
							  }
						  }}
						  key={ index }
						  style={ { fontSize } }
						  className={ cn(
							  'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							  (value === 0 && !editor?.isActive('heading') || editor?.isActive('heading', {level: value})) && 'bg-neutral-200/80'
						  ) }
					  >
						  {label}
					  </button>
				  )}
			  </For>
		  </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Toolbar = () => {
  const editor = useSelector(selectEditor);
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run()
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run()
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print()
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false'
          );
        }
      }
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-sm min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      <For each={sections[0]}>
        {(item, index) => <ToolbarButton key={index} {...item} />}
		  </For>
		  <Separator orientation='vertical' className='h-6 bg-neutral-300' />
		  <HeadingLevelButton />
    </div>
  );
};
