'use client';
// External libraries
import { motion } from 'motion/react';
import { BellPlus } from 'lucide-react';

// Hooks
import { useAddNotification } from '@/app/_hooks/actions/use-add-notifications';

// UI Components
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import {AutosizeTextarea, AutosizeTextAreaRef} from '@/app/_components/ui/autosize-textarea'
import {
  Form,
  FormControl,
  FormItem,
  FormField
} from '@/app/_components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select';
import { Separator } from '@/app/_components/ui/separator';

// Shared Components
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Spinner } from '@/app/_components/spinner';
// Utils
import { cn } from '@/app/_lib/utils';
export const AddNotificationsForm = () => {
  const { openAdd, setOpenAdd, form, onSubmit, isLoadingNotification } =
    useAddNotification();

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
          <BellPlus size="35px" />
        </motion.button>
      }
      title="ارسال اشعار"
      description="ادخل المعطيات الاتية لارسال اشعار"
    >
      <Form {...form}>
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <div className="grid gap-4">
            {/* Gender */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isLoadingNotification}
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger
                        className={cn(
                          form.formState.errors.role &&
                            'border-destructive focus:border-destructive focus:ring-destructive', 'w-full'
                        )}
                      >
                        <SelectValue placeholder="ارسال الى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="102">المرشحين</SelectItem>
                        <SelectItem value="104">المراقبين</SelectItem>
                        <SelectItem value="12">مدراء المحافظة</SelectItem>
                        <SelectItem value="10">ممثلين الكيان</SelectItem>
                        <SelectItem value="100">مدخلين البيانات</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Name */}
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
                      disabled={isLoadingNotification}
                      placeholder="العنوان"
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
                      disabled={isLoadingNotification}
                      placeholder="المحتوى"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Separator */}
          <div className="relative">
            <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button type="submit" disabled={isLoadingNotification}>
                ارسال
                {isLoadingNotification && (
                  <div className=" scale-125">
                    <Spinner />
                  </div>
                )}
              </Button>
              <DialogClose asChild aria-label="Close">
                <Button variant="outline" disabled={isLoadingNotification}>
                  الغاء
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </BasicDialog>
  );
};
