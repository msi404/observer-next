/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import { useAddConfirmedVoter } from '@/app/_hooks/actions/use-add-confirmed-voter';

// UI Components
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage
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
import { BasicDialog } from '@/app/_components/custom/basic-dialog';
import { DatePicker } from '@/app/_components/custom/date-picker';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/custom/dropzone';
import { Combobox } from '@/app/_components/custom/combobox';
import { Show } from '@/app/_components/utils/show';
import {RequiredBadge} from '@/app/_components/custom/required-badge'

// Utils
import { cn } from '@/app/_lib/utils';
export const AddConfirmVoterForm = () => {
  const {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingVoter,
    isLoadingFile,
    pollingCentersSearch,
    usersSearch,
    fileRef,
    onPollingCenterScrollEnd,
    onUserScrollEnd
  } = useAddConfirmedVoter();

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
          <PenSquare size="25px" />
        </motion.button>
      }
      title="اضافة ناخب مؤكد"
      description="ادخل المعطيات الاتية لاضافة عنصر"
    >
      <Form {...form}>
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الناخب الثلاثي <RequiredBadge /></FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        form.formState.errors.name &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      disabled={isLoadingFile || isLoadingVoter}
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
                  <FormLabel>العنوان <RequiredBadge /></FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        form.formState.errors.address &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      placeholder="العنوان"
                      disabled={isLoadingVoter || isLoadingFile}
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
                  <FormLabel>تاريخ الميلاد <RequiredBadge /></FormLabel>
                  <FormControl>
                    <DatePicker
                      className={cn(
                        form.formState.errors.dateOfBirth &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      disabled={isLoadingVoter || isLoadingFile}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pollingCenterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مركز الاقتراع <RequiredBadge /></FormLabel>
                  <FormControl>
                    <Combobox
                      options={pollingCentersSearch}
                      value={field.value} // Controlled by React Hook Form
                      onChange={field.onChange} // Updates React Hook Form on change
                      onScrollEnd={onPollingCenterScrollEnd}
                      label="اختيار مركز اقتراع"
                      disabled={isLoadingVoter || isLoadingFile}
                      className={cn(
                        form.formState.errors.pollingCenterId &&
                          'border-destructive focus:border-destructive focus:ring-destructive'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المرشح</FormLabel>
                  <FormControl>
                    <Combobox
                      options={usersSearch}
                      onScrollEnd={onUserScrollEnd}
                      //@ts-ignore
                      value={field.value} // Controlled by React Hook Form
                      onChange={field.onChange} // Updates React Hook Form on change
                      label="اختيار مرشح"
                      disabled={isLoadingVoter || isLoadingFile}
                      className={cn(
                        form.formState.errors.candidateId &&
                          'border-destructive focus:border-destructive focus:ring-destructive'
                      )}
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
                  <FormLabel>رقم بطاقة الناخب <RequiredBadge /></FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        form.formState.errors.serial &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      placeholder="رقم بطاقة الناخب"
                      disabled={isLoadingVoter || isLoadingFile}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid md:col-span-2">
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الجنس <RequiredBadge /></FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoadingVoter || isLoadingFile}
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
            </div>

            <div className="grid md:col-span-2">
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
          </div>

          {/* Separator */}
          <div className="relative">
            <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button type="submit" disabled={isLoadingVoter || isLoadingFile}>
                اضافة
                {(isLoadingVoter || isLoadingFile) && (
                  <div className=" scale-125">
                    <Spinner />
                  </div>
                )}
              </Button>
              <DialogClose asChild aria-label="Close">
                <Button
                  variant="outline"
                  disabled={isLoadingVoter || isLoadingFile}
                >
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
