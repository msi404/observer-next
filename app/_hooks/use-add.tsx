'use client';
import {useState, useMemo} from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import
	{
		Form,
		FormControl,
		FormItem,
		FormField
} from '@/app/_components/ui/form'
import
	{
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
} from '@/app/_components/ui/select'
import {Separator} from '@/app/_components/ui/separator'
import {SquarePen} from 'lucide-react'
import { useToast } from '@/app/_hooks/use-toast'
import { addVoterSchema } from '@/app/_schema/elecationBase'
import { BasicDialog } from '@/app/_components/basic-dialog'
import { DatePicker } from '@/app/_components/date-picker'
import {Spinner} from '@/app/_components/spinner'
import { Dropzone } from '@/app/_components/dropzone'
import { cn } from '@/app/_lib/utils'

export const useAdd = () =>
{
	const AddConfirmedVoter = () =>
	{
	const [ file, setFile ] = useState<File>()
	const [ open, setOpen ] = useState<boolean>( false )
	const { toast } = useToast()
	const form = useForm<z.infer<typeof addVoterSchema>>( {
		resolver: zodResolver( addVoterSchema ),
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
	} )
	
	const onSubmit = async ( values: z.infer<typeof addVoterSchema> ) =>
	{
    console.log( values );
    console.log(file);
	}

	const DialogComponent = useMemo( () => (
		<BasicDialog
			open={ open }
			onOpenChange={ setOpen }
			button={<Button className='lg:w-1/4'>اضافة<SquarePen/></Button>}
			title='اضافة ناخب مؤكد'
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
                name="voterType"
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
              <Dropzone setFile={ (voterFile) => setFile( voterFile ) } label="اختيار صورة الناخب" />
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
  ), [ open ] )
	return DialogComponent;
	}

	const AddPossibleVoter = () =>
	{
		const [ open, setOpen ] = useState<boolean>( false )
		const { toast } = useToast()
		const form = useForm<z.infer<typeof addVoterSchema>>( {
			resolver: zodResolver( addVoterSchema ),
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
		} )
		
		const onSubmit = async ( values: z.infer<typeof addVoterSchema> ) =>
		{
			console.log(values);
		}
	
		const DialogComponent = useMemo( () => (
			<BasicDialog
				open={ open }
				onOpenChange={ setOpen }
				button={<Button className='lg:w-1/4'>اضافة<SquarePen /></Button>}
				title='اضافة ناخب محتمل'
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
						 name="voterType"
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
		), [ open ] )
		return DialogComponent;
	}

	return {
		AddConfirmedVoter,
		AddPossibleVoter
	}
}