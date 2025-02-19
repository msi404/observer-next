'use client';
import { motion } from 'motion/react';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Trash, Pencil } from 'lucide-react';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { DatePicker } from '@/app/_components/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select';
import { Combobox } from '@/app/_components/combobox';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { Spinner } from '@/app/_components/spinner';
import { cn } from '@/app/_lib/utils';
import { useEditPossibleVoter } from '@/app/_hooks/actions/use-edit-possible-voter';

interface EditPossibleVoterFormProps {
  item: any; // Ideally, replace `any` with a proper interface
}

export const EditPossilbeVoterForm = ({ item }: EditPossibleVoterFormProps) => {
  const {
    openDelete,
    onUpdate,
    setOpenDelete,
    setOpenUpdate,
    onDelete,
    isLoadingDelete,
    isLoadingUpdate,
    openUpdate,
    pollingCentersSearch,
    usersSearch,
    form
  } = useEditPossibleVoter({ item });
  return (
    <div className="flex gap-4 items-center ">
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
        title="حذف ناخب محتمل"
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
        title="تعديل ناخب محتمل"
        description="ادخل المعطيات الاتية لتعديل عنصر"
      >
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onUpdate)}>
            {/* Form Fields */}
            <div className="grid gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الناخب الثلاثي</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.name &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingUpdate}
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
                    <FormLabel>العنوان</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.address &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="العنوان"
                        disabled={isLoadingUpdate}
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
                    <FormLabel>تاريخ الميلاد</FormLabel>
                    <FormControl>
                      <DatePicker
                        className={cn(
                          form.formState.errors.dateOfBirth &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingUpdate}
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
                    <FormLabel>مركز الاقتراع</FormLabel>
                    <FormControl>
                    <Combobox
                    options={pollingCentersSearch}
                    value={field.value} // Controlled by React Hook Form
                    onChange={field.onChange} // Updates React Hook Form on change
                    label="مركز الاقتراع"
                    disabled={isLoadingUpdate}
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
                        //@ts-ignore
                        value={field.value} // Controlled by React Hook Form
                        onChange={field.onChange} // Updates React Hook Form on change
                        label="المرشح"
                        disabled={isLoadingUpdate}
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
                    <FormLabel>رقم بطاقة الناخب</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.serial &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="رقم بطاقة الناخب"
                        disabled={isLoadingUpdate}
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
                    <FormLabel>الجنس</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoadingUpdate}
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

            {/* Separator */}
            <div className="relative">
              <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
            </div>

            {/* Form Actions */}
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button
                  type="submit"
                  disabled={isLoadingUpdate}
                >
                  تحديث
                  {isLoadingUpdate && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button variant="outline" disabled={isLoadingUpdate}>
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
