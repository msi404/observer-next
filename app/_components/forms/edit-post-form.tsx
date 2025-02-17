'use client';
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
  FormItem
} from '@/app/_components/ui/form';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import { cn } from '@/app/_lib/utils';
import { useEditPost } from '@/app/_hooks/actions/use-edit-post';
import {Show} from '@/app/_components/show'
interface EditPostFormProps {
  item: any; // Ideally, replace `any` with a proper interface
}
export const EditPostForm = ({ item }: EditPostFormProps) => {
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
  } = useEditPost({ item });

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
      <BasicDialog
        open={openUpdate}
        onOpenChange={setOpenUpdate}
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
            className="bg-slate-200 p-2 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <Pencil size="20px" />
          </motion.button>
        }
        title="تعديل فعالية"
        description="ادخل المعطيات الاتية لتعديل عنصر"
      >
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onUpdate)}>
            {/* Form Fields */}
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
                        disabled={isLoadingUpdate || isLoadingFile}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AutosizeTextarea
                        maxHeight={400}
                        className={cn(
                          form.formState.errors.content &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="المحتوى"
                        disabled={isLoadingUpdate || isLoadingFile}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Image Upload */}
              <Dropzone
                setFile={(file) => (fileRef.current = file)}
                label="اختيار صورة العالية"
                defaultImage={item.img}
              />
              <Show when={fileRef.current === null}>
                <span className="text-destructive">
                  يجب رفع صورة الفعالية
                </span>
              </Show>
            </div>

            {/* Separator */}
            <div className="relative">
              <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
            </div>

            {/* Form Actions */}
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button type="submit" onClick={onUpdate} disabled={isLoadingUpdate || isLoadingFile}>
                  تعديل
                  {(isLoadingUpdate || isLoadingFile) && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button variant="outline" disabled={isLoadingUpdate || isLoadingFile}>
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
