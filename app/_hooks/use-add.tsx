'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import {
  usePollingCentersQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useUploadFileMutation } from '@/app/_services/mutationApi';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { SquarePen, PenSquare } from 'lucide-react';
import { useToast } from '@/app/_hooks/use-toast';
import { addVoterSchema } from '@/app/_validation/elecationBase';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DatePicker } from '@/app/_components/date-picker';
import { Spinner } from '@/app/_components/spinner';
import { Dropzone } from '@/app/_components/dropzone';
import { Combobox } from '@/app/_components/combobox';
import { cn } from '@/app/_lib/utils';
import {baseApi} from '@/app/_services/api'
import {useCreateVoterMutation} from '@/app/_services/mutationApi'
export const useAdd = () => {
  const AddConfirmedVoterOnEmpty = () =>
  {
    const [createVoter, {isLoading}] = useCreateVoterMutation()
    const [usersSearch, setUsersSearch] = useState<
      { value: string; label: string }[]
    >([]);
    const [pollingCentersSearch, setpollingCentersSearch] = useState<
      { value: string; label: string }[]
    >([]);

    const { data: pollingCenters, isLoading: isLoadingPollingCenters } =
      usePollingCentersQuery('');

    const [uploadFile, { isLoading: isLoadingFile }] =
      useUploadFileMutation();
    const { data: users, isLoading: isLoadingUsers } =
      useUsersQuery('Role=102');
    const fileRef = useRef<File | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof addVoterSchema>>({
      resolver: zodResolver(addVoterSchema),
      defaultValues: {
        name: '',
        // @ts-ignore
        birthDate: '',
        gender: '',
        img: '',
        address: '',
        pollingCenterId: '',
        candidateId: '',
        serial: ''
      }
    });

    const onSubmit = async (values: z.infer<typeof addVoterSchema>) => {

      if (!fileRef.current) {
        console.error('No file selected!');
        return;
      }

      try
      {
      const formData = new FormData();
      formData.append('file', fileRef.current as File);
        const response = await uploadFile( formData );
        if ( !isLoadingFile )
        {
          form.setValue( 'img', `${baseApi}${response?.data?.data}` );
          const result = await createVoter({ ...values, img: `${baseApi}${response?.data?.data}` });
          console.log(result);
        }
      } catch ( error )
      {
        console.log(error);
      }
    };

    useEffect(() => {
      if (!isLoadingUsers) {
        setUsersSearch(
          users?.data.items.map((user: any) => ({
            value: user.id,
            label: user.name
          }))
        );
      }
      if (!isLoadingPollingCenters) {
        setpollingCentersSearch(
          pollingCenters?.data.items.map((pollingCenter: any) => ({
            value: pollingCenter.id,
            label: pollingCenter.name
          }))
        );
      }
    }, [ users, isLoadingUsers, pollingCenters, isLoadingPollingCenters ] );
    
    // useEffect(() => {
    //   if (!isLoadingFile) {
        // const newFile = `${baseApi}${fileURL?.data}`;
    //     setFile(newFile);
    //     console.log("Updated file:", file); // ✅ Logs correctly
    //   }
    // }, [isLoadingFile]);

    const DialogComponent = useMemo(
      () => (
        <BasicDialog
          open={open}
          onOpenChange={setOpen}
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
              <div className="grid gap-4">
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
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="العنوان"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serial"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="رقم بطاقة الناخب"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">انثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pollingCenterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox
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
                <FormField
                  control={form.control}
                  name="candidateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox
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
                <Dropzone
                  setFile={ ( voterFile ) =>
                  {
                    fileRef.current = voterFile; // Store directly in ref
                  }}
                  label="اختيار صورة بطاقة الناخب"
                />
              </div>
              <div className=" relative">
                <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
              </div>
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
    return DialogComponent;
  };
  const AddConfirmedVoter = () => {
    const [usersSearch, setUsersSearch] = useState<
      { value: string; label: string }[]
    >([]);
    const [pollingCenterFilters, setPollingCenterFilters] = useState<
      { id: string; value: string }[]
    >([]);
    const [candidateFilters, setcandidateFilters] = useState<
      { id: string; value: string }[]
    >([]);
    const { data: pollingCenters, isLoading: isLoadingPollingCenters } =
      usePollingCentersQuery('');
    const { data: users, isLoading: isLoadingUsers } = useUsersQuery('');
    const [file, setFile] = useState<File>();
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof addVoterSchema>>({
      resolver: zodResolver(addVoterSchema),
      defaultValues: {
        name: '',
        // @ts-ignore
        birthDate: '',
        gender: '',
        iDimage: '',
        address: '',
        pollingCenterId: '',
        candidateId: '',
        voterType: ''
      }
    });

    const onSubmit = async (values: z.infer<typeof addVoterSchema>) => {
      console.log(values);
      console.log(file);
    };
    useEffect(() => {
      if (!isLoadingUsers) {
        setUsersSearch(
          users?.data.items.map((user: any) => ({
            value: user.id,
            label: user.username
          }))
        );
      }
    }, [users, isLoadingUsers]);

    const DialogComponent = useMemo(
      () => (
        <BasicDialog
          open={open}
          onOpenChange={setOpen}
          button={
            <Button className="lg:w-1/4">
              اضافة
              <SquarePen />
            </Button>
          }
          title="اضافة ناخب مؤكد"
          description="ادخل المعطيات الاتية لاضافة عنصر"
        >
          <Form {...form}>
            <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
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
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="العنوان"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serial"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="رقم الناخب"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">انثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pollingCenterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox
                          options={pollingCenters?.data.items}
                          setSelect={(value) =>
                            setPollingCenterFilters(() => [
                              ...pollingCenterFilters,
                              { id: 'pollingCenter', value: value }
                            ])
                          }
                          label="مركز الاقتراع"
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
                      <FormControl>
                        <Combobox
                          options={usersSearch}
                          setSelect={(value) =>
                            setcandidateFilters(() => [
                              ...candidateFilters,
                              { id: 'candidate', value: value }
                            ])
                          }
                          label="المرشح"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Dropzone
                  setFile={(voterFile) => setFile(voterFile)}
                  label="اختيار صورة الناخب"
                />
              </div>
              <div className=" relative">
                <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
              </div>
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
    return DialogComponent;
  };

  const AddPossibleVoter = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof addVoterSchema>>({
      resolver: zodResolver(addVoterSchema),
      defaultValues: {
        name: '',
        // @ts-ignore
        birthDate: '',
        gender: '',
        address: '',
        pollingCenterId: '',
        candidateId: '',
        voterType: ''
      }
    });

    const onSubmit = async (values: z.infer<typeof addVoterSchema>) => {
      console.log(values);
    };

    const DialogComponent = useMemo(
      () => (
        <BasicDialog
          open={open}
          onOpenChange={setOpen}
          button={
            <Button className="lg:w-1/4">
              اضافة
              <SquarePen />
            </Button>
          }
          title="اضافة ناخب محتمل"
          description="ادخل المعطيات الاتية لاضافة عنصر"
        >
          <Form {...form}>
            <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
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
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="العنوان"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serial"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="رقم الناخب"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">انثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pollingCenterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="المركز"
                          disabled={false}
                          {...field}
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
                      <FormControl>
                        <Input
                          placeholder="المرشح"
                          disabled={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className=" relative">
                <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
              </div>
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
    return DialogComponent;
  };

  return {
    AddConfirmedVoterOnEmpty,
    AddConfirmedVoter,
    AddPossibleVoter
  };
};
