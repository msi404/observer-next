'use client';

// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import { useAddPartiesRepresenters } from '@/app/_hooks/actions/use-add-parties-representers';
// UI Components
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Combobox } from '@/app/_components/combobox';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage
} from '@/app/_components/ui/form';
import { Separator } from '@/app/_components/ui/separator';

// Shared Components
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DatePicker } from '@/app/_components/date-picker';
import { Spinner } from '@/app/_components/spinner';
import {Switch, Match} from '@/app/_components/switch'
// Utils
import { cn } from '@/app/_lib/utils';

export const AddPartiesRepresentersForm = () => {
  const {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    electoralEntitiesSearch,
    onElectoralEntitiesScrollEnd,
    onCheckUsernameTaken,
    isUsernameTakenSuccess,
    isUsernameTaken
  } = useAddPartiesRepresenters();

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
      title="اضافة ممثل كيان"
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
                  <FormLabel>اسم الموظف الثلاثي</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        form.formState.errors.name &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      disabled={isLoadingUser}
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
                      disabled={isLoadingUser}
                      placeholder="اسم المستخدم"
                      {...field}
                    />
                    <button onClick={onCheckUsernameTaken} type='button' className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
                      التحقق
                      </button>
                      </div>
                   </div>
                  </FormControl>
                  <Switch>
                  <Match when={isUsernameTaken === true && isUsernameTakenSuccess}>
                      <p className='text-destructive font-medium text-xs'>اسم المستخدم قيد الاستخدام</p>
                  </Match>
                  <Match when={isUsernameTaken === false && isUsernameTakenSuccess}>
                      <p className='text-green-600 font-medium text-xs'>اسم المستخدم متاح</p>
                  </Match>
                    </Switch>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className={cn(
                        form.formState.errors.password &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      disabled={isLoadingUser}
                      placeholder="كلمة المرور"
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
                      disabled={isLoadingUser}
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
              name="electoralEntityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الكيان السياسي</FormLabel>
                  <FormControl>
                    <Combobox
                      options={electoralEntitiesSearch}
                      value={field.value} // Controlled by React Hook Form
                      onChange={field.onChange} // Updates React Hook Form on change
                      onScrollEnd={onElectoralEntitiesScrollEnd}
                      label="اختيار الكيان السياسي"
                      disabled={isLoadingUser}
                      className={cn(
                        form.formState.errors.electoralEntityId &&
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
                      className={cn(
                        form.formState.errors.phone &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                      )}
                      disabled={isLoadingUser}
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
                      disabled={isLoadingUser}
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
              <Button type="submit" disabled={isLoadingUser}>
                اضافة
                {isLoadingUser && (
                  <div className=" scale-125">
                    <Spinner />
                  </div>
                )}
              </Button>
              <DialogClose asChild aria-label="Close">
                <Button variant="outline" disabled={isLoadingUser}>
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
