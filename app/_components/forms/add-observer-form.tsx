'use client';

// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import { useAddObserver } from '@/app/_hooks/actions/use-add-observer';
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
import { Combobox } from '@/app/_components/combobox';
import { Separator } from '@/app/_components/ui/separator';

// Shared Components
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Dropzone } from '@/app/_components/dropzone';
import { Show } from '@/app/_components/show';
import { DatePicker } from '@/app/_components/date-picker';
import { Spinner } from '@/app/_components/spinner';
import { Switch, Match } from '@/app/_components/switch';
// Utils
import { cn } from '@/app/_lib/utils';
export const AddObserverForm = () => {
  const {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    isLoadingFile,
    govCentersSearch,
    pollingCentersSearch,
    stationsSearch,
    onGovCenterScrollEnd,
    onPollingCenterScrollEnd,
    onStationScrollEnd,
    setSelectedGovCenter,
    setSelectedPollingCenter,
    selectedGovCenter,
    selectedPollingCenter,
    isUsernameTaken,
    isUsernameTakenSuccess,
    onCheckUsernameTaken,
    fileRef
  } = useAddObserver();

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
      title="اضافة مراقب"
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
                      disabled={isLoadingUser || isLoadingFile}
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
                          disabled={isLoadingUser || isLoadingFile}
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
                      when={isUsernameTaken === true && isUsernameTakenSuccess}
                    >
                      <p className="text-destructive font-medium text-xs">
                        اسم المستخدم قيد الاستخدام
                      </p>
                    </Match>
                    <Match
                      when={isUsernameTaken === false && isUsernameTakenSuccess}
                    >
                      <p className="text-green-600 font-medium text-xs">
                        اسم المستخدم متاح
                      </p>
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
                      disabled={isLoadingUser || isLoadingFile}
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
                      disabled={isLoadingUser || isLoadingFile}
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
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedGovCenter(value);
                        setSelectedPollingCenter(null);
                      }} // Updates React Hook Form on change
                      onScrollEnd={onGovCenterScrollEnd}
                      label="اختيار مكتب المحافظة"
                      disabled={isLoadingUser || isLoadingFile}
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
              name="pollingCenterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مركز الاقتراع</FormLabel>
                  <FormControl>
                    <Combobox
                      options={pollingCentersSearch}
                      value={field.value} // Controlled by React Hook Form
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedPollingCenter(value);
                      }} // Updates React Hook Form on change
                      onScrollEnd={onPollingCenterScrollEnd}
                      label="اختيار مركز اقتراع"
                      disabled={
                        isLoadingUser || isLoadingFile || !selectedGovCenter
                      }
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
              name="stationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محطة التسجيل</FormLabel>
                  <FormControl>
                    <Combobox
                      options={stationsSearch}
                      value={field.value} // Controlled by React Hook Form
                      onChange={field.onChange} // Updates React Hook Form on change
                      onScrollEnd={onStationScrollEnd}
                      label="اختيار محطة التسجيل"
                      disabled={
                        isLoadingUser || isLoadingFile || !selectedPollingCenter
                      }
                      className={cn(
                        form.formState.errors.stationId &&
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
                      disabled={isLoadingUser || isLoadingFile}
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
                      disabled={isLoadingUser || isLoadingFile}
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
              <span className="text-destructive">يجب رفع صورة الشخصية</span>
            </Show>
          </div>

          {/* Separator */}
          <div className="relative">
            <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button type="submit" disabled={isLoadingUser || isLoadingFile}>
                اضافة
                {(isLoadingUser || isLoadingFile) && (
                  <div className=" scale-125">
                    <Spinner />
                  </div>
                )}
              </Button>
              <DialogClose asChild aria-label="Close">
                <Button
                  variant="outline"
                  disabled={isLoadingUser || isLoadingFile}
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
