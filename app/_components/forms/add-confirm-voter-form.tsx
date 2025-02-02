'use client';

import {useMemo} from 'react';

// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import { useAdd } from '@/app/_hooks/use-add';

// UI Components
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
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
import { DatePicker } from '@/app/_components/date-picker';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import { Combobox } from '@/app/_components/combobox';
import { Show } from '@/app/_components/show';
// Utils
import { cn } from '@/app/_lib/utils';
export const AddConfirmVoterForm = () => {
  const { addConfirmedVoter } = useAdd();
  const {
    open,
    setOpen,
    form,
    onSubmit,
    isLoadingVoter,
    isLoadingFile,
    pollingCentersSearch,
    usersSearch,
    fileRef
  } = addConfirmedVoter();
  const Component = useMemo(
    () => (
      <BasicDialog
        open={open}
        onOpenChange={setOpen}
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
        title="اضافة ناخب مؤكد"
        description="ادخل المعطيات الاتية لاضافة عنصر"
      >
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form Fields */}
            <div className="grid gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.name &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={false}
                        placeholder="اسم الناخب الثلاثي"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.address &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="العنوان"
                        disabled={isLoadingVoter}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker
                        disabled={isLoadingVoter}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Serial Number */}
              <FormField
                control={form.control}
                name="serial"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.serial &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="رقم بطاقة الناخب"
                        disabled={isLoadingVoter}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={isLoadingVoter}
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="الجنس" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">ذكر</SelectItem>
                          <SelectItem value="1">انثى</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Polling Center */}
              <FormField
                control={form.control}
                name="pollingCenterId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        disabled={isLoadingVoter}
                        className={cn(
                          form.formState.errors.pollingCenterId &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        options={pollingCentersSearch}
                        setSelect={(value) =>
                          form.setValue('pollingCenterId', value)
                        }
                        label="مركز الاقتراع"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Candidate */}
              <FormField
                control={form.control}
                name="candidateId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        disabled={false}
                        className={cn(
                          form.formState.errors.candidateId &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        options={usersSearch}
                        setSelect={(value) =>
                          form.setValue('candidateId', value)
                        }
                        label="المرشح"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <Dropzone
                setFile={(voterFile) => (fileRef.current = voterFile)}
                label="اختيار صورة بطاقة الناخب"
              />
              <Show when={fileRef.current === null}>
                <span className="text-destructive">
                  يجب رفع صورة بطاقة الناخب
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
    ),
    [open]
  );

  return Component;
};
