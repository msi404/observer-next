'use client';

// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import {useAddProvinceAdmin} from '@/app/_hooks/actions/use-add-province-admin'
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
import { Separator } from '@/app/_components/ui/separator';

// Shared Components
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DatePicker } from '@/app/_components/date-picker';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import { Show } from '@/app/_components/show';
// Utils
import { cn } from '@/app/_lib/utils';
export const AddProvinceAdminForm = () => {
  const { openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingProvinceAdmin,
    isLoadingFile,
    fileRef } = useAddProvinceAdmin();

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
        title="اضافة مدير محافظة"
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
                        disabled={isLoadingProvinceAdmin || isLoadingFile}
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
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.username &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingProvinceAdmin || isLoadingFile}
                        placeholder="اسم المستخدم"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='password'
                        className={cn(
                          form.formState.errors.password &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingProvinceAdmin || isLoadingFile}
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
                    <FormControl>
                      <DatePicker
                        disabled={isLoadingProvinceAdmin || isLoadingFile}
                        value={field.value}
                        onChange={field.onChange}
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
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.phone &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingProvinceAdmin || isLoadingFile}
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
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.email &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="البريد الالكتروني"
                        disabled={isLoadingProvinceAdmin || isLoadingFile}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Image Upload */}
              <Dropzone
                setFile={(voterFile) => (fileRef.current = voterFile)}
                label="اختيار صورة الشخصية"
              />
              <Show when={fileRef.current === null}>
                <span className="text-destructive">
                  يجب رفع صورة الشخصية
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
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  اضافة
                  {(isLoadingProvinceAdmin || isLoadingFile) && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button
                    variant="outline"
                    disabled={isLoadingProvinceAdmin || isLoadingFile}
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
