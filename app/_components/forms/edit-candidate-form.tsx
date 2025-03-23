/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { BasicDialog } from '@/app/_components/custom/basic-dialog';
import { Trash, Pencil, Eye, KeyRound } from 'lucide-react';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Combobox } from '@/app/_components/custom/combobox';
import { Input } from '@/app/_components/ui/input';
import { DatePicker } from '@/app/_components/custom/date-picker';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { Spinner } from '@/app/_components/spinner';
import { cn } from '@/app/_lib/utils';
import { Switch, Match } from '@/app/_components/utils/switch';
import { Show } from '@/app/_components/utils/show';
import { Dropzone } from '@/app/_components/custom/dropzone';
import { useChangeUserPassword } from '@/app/_hooks/actions/use-change-user-password';
import { useEditCandidate } from '@/app/_hooks/actions/use-edit-candidate';
import { RequiredBadge } from '@/app/_components/custom/required-badge';

interface EditDataEntryFormProps {
  item: any;
  id: string; // Ideally, replace `any` with a proper interface
}

export const EditCandidateForm = ({ item, id }: EditDataEntryFormProps) => {
  const {
    openDelete,
    onUpdate,
    setOpenDelete,
    setOpenUpdate,
    onDelete,
    isLoadingDelete,
    isLoadingUpdate,
    isLoadingFile,
    openUpdate,
    isUsernameTaken,
    isUsernameTakenSuccess,
    onCheckUsernameTaken,
    selectedCuta,
    setSelectedGovCenter,
    onGovCenterScrollEnd,
    fileRef,
    govCentersSearch,
    form
  } = useEditCandidate({ item });
  const {
    isLoadingChangePassword,
    onPasswordChange,
    setChangePasswordOpen,
    changePasswordOpen,
    changePasswordform
  } = useChangeUserPassword({ role: item.role, id: item.id });
  return (
    <div className="flex gap-4 items-center">
      <BasicDialog
        className="!max-w-[425px]"
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
        title="حذف مرشح"
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
      <Link href={`candidate/${id}`}>
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
          <Eye size="20px" />
        </motion.button>
      </Link>
      <BasicDialog
        className="!max-w-[425px]"
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
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
            <KeyRound size="20px" />
          </motion.button>
        }
        title="تغيير كلمة المرور"
        description="ادخل المعطيات الاتية لتغيير كلمة المرور"
      >
        <Form {...changePasswordform}>
          <form
            className="grid gap-5"
            onSubmit={changePasswordform.handleSubmit(onPasswordChange)}
          >
            {/* Form Fields */}
            <div className="grid gap-4">
              {/* Name */}
              <FormField
                control={changePasswordform.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      كلمة المرور الجديدة <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={cn(
                          changePasswordform.formState.errors.newPassword &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingChangePassword}
                        placeholder="******"
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
                <Button type="submit" disabled={isLoadingChangePassword}>
                  تغيير
                  {isLoadingChangePassword && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button variant="outline" disabled={isLoadingChangePassword}>
                    الغاء
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
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
        title="تعديل مرشح"
        description="ادخل المعطيات الاتية لتعديل عنصر"
      >
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onUpdate)}>
            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      اسم المرشح <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.name &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingFile || isLoadingUpdate}
                        placeholder="اسم المرشح"
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
                    <FormLabel>
                      اسم المستخدم <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <div className="*:not-first:mt-2">
                        <div className="flex rounded-md shadow-xs">
                          <Input
                            className={cn(
                              form.formState.errors.username &&
                                'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive',
                              '-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10'
                            )}
                            disabled={isLoadingUpdate || isLoadingFile}
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      البريد الالكتروني <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className={cn(
                          form.formState.errors.email &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingFile || isLoadingUpdate}
                        placeholder="البريد الالكتروني"
                        {...field}
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
                    <FormLabel>
                      رقم الهاتف <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className={cn(
                          form.formState.errors.phone &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingFile || isLoadingUpdate}
                        placeholder="رقم الهاتف"
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
                        disabled={isLoadingUpdate || isLoadingFile}
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
              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      تاريخ الميلاد <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        disabled={isLoadingUpdate || isLoadingFile}
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
                  <FormLabel>
                    مكتب المحافظة <RequiredBadge />
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      options={govCentersSearch}
                      value={field.value} // Controlled by React Hook Form
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedGovCenter(value);
                      }} // Updates React Hook Form on change
                      onScrollEnd={onGovCenterScrollEnd}
                      label="اختيار مكتب المحافظة"
                      disabled={isLoadingUpdate || isLoadingFile}
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
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    الديانة
                  </FormLabel>
                  <FormControl>
                    <Select
                      disabled={
                        isLoadingUpdate ||
                        isLoadingFile ||
                        !selectedCuta ||
                        selectedCuta?.every((value) => value?.religion === null)
                      }
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="الديانة" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="0">مسلم</SelectItem>
                        <Show
                          when={
                            selectedCuta?.find(
                              (cuta) => cuta.religion === 2
                            ) !== undefined
                          }
                        >
                          <SelectItem value="2">مسيحي</SelectItem>
                        </Show>
                        <Show
                          when={
                            selectedCuta?.find(
                              (cuta) => cuta.religion === 4
                            ) !== undefined
                          }
                        >
                          <SelectItem value="4">ايزيدي</SelectItem>
                        </Show>
                        <Show
                          when={
                            selectedCuta?.find(
                              (cuta) => cuta.religion === 6
                            ) !== undefined
                          }
                        >
                          <SelectItem value="6">صابئي</SelectItem>
                        </Show>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ethnicity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    القومية
                  </FormLabel>
                  <FormControl>
                    <Select
                      disabled={
                        isLoadingUpdate ||
                        isLoadingFile ||
                        !selectedCuta ||
                        selectedCuta?.every(
                          (value) => value?.ethnicity === null
                        )
                      }
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="القومية" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="0">عربي</SelectItem>
                        <Show
                          when={
                            selectedCuta?.find(
                              (cuta) => cuta.ethnicity === 2
                            ) !== undefined
                          }
                        >
                          <SelectItem value="2">كردي</SelectItem>
                        </Show>
                        <Show
                          when={
                            selectedCuta?.find(
                              (cuta) => cuta.ethnicity === 6
                            ) !== undefined
                          }
                        >
                          <SelectItem value="6">شبكي</SelectItem>
                        </Show>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
              {/* Serial Number */}
              <FormField
                control={form.control}
                name="candidateSerial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      رقم المرشح <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className={cn(
                          form.formState.errors.candidateSerial &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="رقم المرشح "
                        disabled={isLoadingUpdate || isLoadingFile}
                        value={field.value ?? ''} // Ensures it's always defined
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : ''
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Serial Number */}
              <div className='grid md:col-span-2'>
              <FormField
                control={form.control}
                name="candidateListSerial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      رقم القائمة <RequiredBadge />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className={cn(
                          form.formState.errors.candidateListSerial &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        placeholder="رقم القائمة "
                        disabled={isLoadingUpdate || isLoadingFile}
                        value={field.value ?? ''} // Ensures it's always defined
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : ''
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
                </div>
              <div className="grid md:col-span-2">
                {/* Image Upload */}
                <Dropzone
                  setFile={(voterFile: any) => (fileRef.current = voterFile)}
                  label="اختيار صورة بطاقة الناخب"
                  defaultImage={item.profileImg}
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
                <Button
                  type="submit"
                  disabled={isLoadingUpdate || isLoadingFile}
                >
                  تعديل
                  {(isLoadingUpdate || isLoadingFile) && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button
                    variant="outline"
                    disabled={isLoadingUpdate || isLoadingFile}
                  >
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
