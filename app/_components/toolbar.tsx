'use client';
import { type FC } from 'react';
import { useSelector } from 'react-redux';
import {
  ChevronDownIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
  BoldIcon,
  type LucideIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ItalicIcon,
  UnderlineIcon,
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
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import { useAddPost } from '@/app/_hooks/actions/use-add-post';
import { Show } from '@/app/_components/show';
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

const AlignButton = () => {
  const editor = useSelector(selectEditor);
  const alignmens = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon
    },
    {
      label: 'Align Justify',
      value: 'justify',
      icon: AlignJustifyIcon
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <AlignLeftIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignmens.map(({ label, value, icon: Icon }) => (
          <Button
            variant='ghost'
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4'/>
            <span className='text-sm'>{label}</span>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
  const {
    onSubmit,
    openAdd,
    setOpenAdd,
    isLoadingFile,
    isLoadingPost,
    form,
    fileRef
  } = useAddPost();
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
      },
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run()
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run()
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run()
      }
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-sm min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      <For each={sections[0]}>
        {(item, index) => <ToolbarButton key={index} {...item} />}
      </For>
      <AlignButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <BasicDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        title="اضافة حدث"
        description="ادخل المعطيات الاتية لاضافة حدث"
        button={
          <Button
            variant="outline"
            className="rtl:mr-auto rtl:ml-8 ltr:ml-auto ltr:mr-8"
          >
            حفظ
          </Button>
        }
      >
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.title &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="العنوان"
                        disabled={isLoadingPost || isLoadingFile}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <Dropzone
                setFile={(file) => (fileRef.current = file)}
                label="اختيار صورة الفعالية"
              />
              <Show when={fileRef.current === null}>
                <span className="text-destructive">يجب رفع صورة الفعالية</span>
              </Show>
            </div>
            <div className=" relative">
              <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
            </div>
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button type="submit" disabled={isLoadingPost || isLoadingFile}>
                  نشر
                  {(isLoadingPost || isLoadingFile) && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button
                    variant="outline"
                    disabled={isLoadingPost || isLoadingFile}
                  >
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
