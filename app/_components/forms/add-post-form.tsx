'use client';
// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import {useAddPost} from '@/app/_hooks/actions/use-add-post'
// UI Components
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input'
import {AutosizeTextarea} from '@/app/_components/ui/autosize-textarea'
import {
  Form,
  FormField,
  FormControl,
  FormItem
} from '@/app/_components/ui/form';
import { Separator } from '@/app/_components/ui/separator';

// Shared Components
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import {Show} from '@/app/_components/show'
// Utils
import { cn } from '@/app/_lib/utils';
export const AddPostForm = () => {
  const {
	  openAdd,
	  setOpenAdd,
	  form,
	  onSubmit,
    isLoadingPost,
    isLoadingFile,
    fileRef
  } = useAddPost();

  return (
      <BasicDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        button={
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { damping: 0, ease: 'linear', duration: 0.2 }
            }}
            className="bg-slate-200 p-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <PenSquare size="35px" />
          </motion.button>
        }
        title="اضافة فعالية"
        description="ادخل المعطيات الاتية لاضافة عنصر"
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
                      disabled={isLoadingFile || isLoadingPost}
                      placeholder="المحتوى"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Image Upload */}
                      <Dropzone
                        setFile={(voterFile) => (fileRef.current = voterFile)}
                        label="اختيار صورة الفعالية"
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
                <Button type="submit" disabled={isLoadingPost || isLoadingFile}>
                  اضافة
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
    )
};
