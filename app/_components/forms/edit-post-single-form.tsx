'use client';
import Link from 'next/link'
import { motion } from 'motion/react';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Trash, Pencil } from 'lucide-react';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Input } from '@/app/_components/ui/input';
import {AutosizeTextarea} from '@/app/_components/ui/autosize-textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/app/_components/ui/form';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import { cn } from '@/app/_lib/utils';
import {useEditPostSingle} from '@/app/_hooks/actions/use-edit-post-single'
import {Show} from '@/app/_components/show'
interface EditPostFormProps {
  item: any; // Ideally, replace `any` with a proper interface
}
export const EditPostFormSingle = ({ item }: EditPostFormProps) => {
  const {
    openDelete,
    onUpdate,
    setOpenDelete,
    setOpenUpdate,
    onDelete,
    isLoadingDelete,
    isLoadingUpdate,
    isLoadingFile,
    fileRef,
    openUpdate,
    form
  } = useEditPostSingle({ item });

  return (
    <div className="flex gap-4 items-center">
      <BasicDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        button={
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: {
                damping: 0,
                ease: 'linear',
                duration: 0.2
              }
            }}
            className="bg-slate-200 p-2 cursor-pointer rounded-full text-gray-500 hover:text-destructive"
          >
            <Trash size="20px" />
          </motion.button>
        }
        title="حذف فعالية"
        description="هل انت متأكد من انك تريد حذف العنصر؟"
      >
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isLoadingDelete}
            >
              حذف
              {isLoadingDelete && (
                <div className=" scale-125">
                  <Spinner />
                </div>
              )}
            </Button>
            <DialogClose asChild aria-label="Close">
              <Button variant="outline" disabled={isLoadingDelete}>
                الغاء
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </BasicDialog>
      <Link href={`/events/${item.id}/edit`}>
      <motion.button
            whileHover={{
              scale: 1.1,
              transition: {
                damping: 0,
                ease: 'linear',
                duration: 0.2
              }
            }}
            className="bg-slate-200 p-2 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <Pencil size="20px" />
          </motion.button>
      </Link>
    </div>
  );
};
