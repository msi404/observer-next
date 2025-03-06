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
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { Spinner } from '@/app/_components/spinner';
import { Combobox } from '@/app/_components/combobox';
import { cn } from '@/app/_lib/utils';
import { useEditDataEntry } from '@/app/_hooks/actions/use-edit-data-entry';
import { Switch, Match } from '@/app/_components/switch';
interface EditDataEntryFormProps {
  item: any; // Ideally, replace `any` with a proper interface
}

export const EditDataEntryForm = ({ item }: EditDataEntryFormProps) => {
  const {
    openDelete,
    onUpdate,
    setOpenDelete,
    setOpenUpdate,
    onDelete,
    isLoadingDelete,
    isLoadingUpdate,
    openUpdate,
    govCentersSearch,
    isUsernameTaken,
    isUsernameTakenSuccess,
    onCheckUsernameTaken,
    onGovCenterScrollEnd,
    form
  } = useEditDataEntry({ item });
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
        title="حذف مدخل بيانات"
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
        title="تعديل مدخل بيانات"
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
                    <FormLabel>اسم الموظف الثلاثي</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.name &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingUpdate}
                        placeholder="اسم الموظف الثلاثي"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <div className="*:not-first:mt-2">
                        <div className="flex rounded-md shadow-xs">
                          <Input
                            className={cn(
                              form.formState.errors.username &&
                                'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive',
                              '-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10'
                            )}
                            disabled={isLoadingUpdate}
                            placeholder="اسم المستخدم"
                            {...field}
                          />
                          <button
                            onClick={onCheckUsernameTaken}
                            type="button"
                            className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            التحقق
                          </button>
                        </div>
                      </div>
                    </FormControl>
                    <Switch>
                      <Match
                        when={
                          isUsernameTaken === true && isUsernameTakenSuccess
                        }
                      >
                        <p className="text-destructive font-medium text-xs">
                          اسم المستخدم قيد الاستخدام
                        </p>
                      </Match>
                      <Match
                        when={
                          isUsernameTaken === false && isUsernameTakenSuccess
                        }
                      >
                        <p className="text-green-600 font-medium text-xs">
                          اسم المستخدم متاح
                        </p>
                      </Match>
                    </Switch>
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
                name="govCenterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مكتب المحافظة</FormLabel>
                    <FormControl>
                      <Combobox
                        options={govCentersSearch}
                        value={field.value} // Controlled by React Hook Form
                        onChange={field.onChange} // Updates React Hook Form on change
                        onScrollEnd={onGovCenterScrollEnd}
                        label="اختيار مكتب المحافظة"
                        disabled={isLoadingUpdate}
                        className={cn(
                          form.formState.errors.govCenterId &&
                            'border-destructive focus:border-destructive focus:ring-destructive'
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        className={cn(
                          form.formState.errors.phone &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingUpdate}
                        placeholder="رقم الهاتف"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الالكتروني</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.email &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="البريد الالكتروني"
                        disabled={isLoadingUpdate}
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
                <Button type="submit" disabled={isLoadingUpdate}>
                  تعديل
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
