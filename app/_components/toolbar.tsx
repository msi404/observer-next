'use client';
import { type FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { DialogFooter, DialogClose } from '@/app/_components/ui/dialog';
import {
  Form,
  FormControl,
  FormItem,
  FormField
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { type Level } from '@tiptap/extension-heading';
import { Dynamic } from '@/app/_components/dynamic';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { addEventSchema } from '@/app/_validation/event';
import { Spinner } from '@/app/_components/spinner';
import {Dropzone} from '@/app/_components/dropzone'
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
      <Dynamic component={Icon} className="size-4" />
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
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        <For each={headings}>
          {({ label, value, fontSize }, index) => (
            <button
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run();
                }
              }}
              key={index}
              style={{ fontSize }}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                ((value === 0 && !editor?.isActive('heading')) ||
                  editor?.isActive('heading', { level: value })) &&
                  'bg-neutral-200/80'
              )}
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
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState<boolean>(false);
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
  const form = useForm<z.infer<typeof addEventSchema>>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: '',
      coverImage: ''
    }
  });
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-sm min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      <For each={sections[0]}>
        {(item, index) => <ToolbarButton key={index} {...item} />}
      </For>
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <BasicDialog
        open={open}
        onOpenChange={setOpen}
        title="اضافة حدث"
        description="ادخل المعطيات الاتية لاضافة حدث"
        button={
          <Button
            variant="outline"
            className="rtl:mr-auto rtl:ml-8 ltr:ml-auto ltr:mr-8"
          >
            اضافة
          </Button>
        }
      >
        <Form {...form}>
          <form className="grid gap-5">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="العنوان" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Dropzone
                setFile={(voterFile) => setFile(voterFile)}
                label="اختيار صورة للحدث"
              />
            </div>
            <div className=" relative">
              <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
            </div>
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button type="submit" disabled={false}>
                  اضافة
                  {false && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button variant="outline" disabled={false}>
                    الغاء
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </BasicDialog>
    </div>
  );
};
