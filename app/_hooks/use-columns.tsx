'use client';
import { useState, Fragment, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {motion} from 'motion/react'
import
	{
	type ColumnDef
} from '@tanstack/react-table'
import { z } from 'zod'
import { Trash, SquarePen } from 'lucide-react'

import {selectUser} from '@/app/_lib/features/authSlice'
import {hasPermission} from '@/app/_auth/auth-rbac'
import { addVoterSchema } from '@/app/_validation/elecation-base'
import { BasicDialog } from '@/app/_components/basic-dialog'
import { DialogFooter, DialogClose } from '@/app/_components/ui/dialog'
import { Button } from '@/app/_components/ui/button'
import {Input} from '@/app/_components/ui/input'
import
	{
		Form,
		FormControl,
		FormField,
		FormItem
} from '@/app/_components/ui/form'
import
	{
		Select,
		SelectTrigger,
		SelectValue,
		SelectItem,
		SelectContent
} from '@/app/_components/ui/select'
import {Separator} from '@/app/_components/ui/separator'
import {Dropzone} from '@/app/_components/dropzone'
import {cn} from '@/app/_lib/utils'
import {Spinner} from '@/app/_components/spinner'
import { DataTableColumnHeader } from '@/app/_components/table-header'
import {DatePicker} from '@/app/_components/date-picker'
import {useDeleteVoterMutation} from '@/app/_services/mutationApi'
import { useVotersQuery } from '@/app/_services/fetchApi'
import { calcAge } from '@/app/_utils/calc-age'
import { Zoom } from '@/app/_components/zoom'
export const useColumns = () =>
{
	const user = useSelector(selectUser)
	const { t } = useTranslation();

	const possibleVotersColumns: ColumnDef<PossibleVoters>[] = [
		{
		  accessorKey: 'name',
		  header: ({ column }) => (
			 <DataTableColumnHeader
				column={column}
				title={t('electionBase:possibleVoters.table.header.name')}
			 />
		  )
		},
		{
		  accessorKey: 'address',
		  header: t('electionBase:possibleVoters.table.header.address')
		},
		{
		  accessorKey: 'state',
		  header: t('electionBase:possibleVoters.table.header.governorate')
		},
		{
		  accessorKey: 'pollingCenter',
		  header: t('electionBase:possibleVoters.table.header.pollingCenter')
		},
		{
		  accessorKey: 'dataEntry',
		  header: t('electionBase:possibleVoters.table.header.dataEntry')
		},
		{
		  accessorKey: 'candidate',
		  header: ({ column }) => (
			 <DataTableColumnHeader
				column={column}
				title={t('electionBase:possibleVoters.table.header.candidateName')}
			 />
		  )
		}
	 ];
  
	 // @ts-ignore
	 const confirmedVotersColumns: ColumnDef<ConfirmedVoters>[] = [
		{
		  accessorKey: 'name',
		  header: ({ column }: any) => (
			 <DataTableColumnHeader
				column={column}
				title={t('electionBase:confirmedVoters.table.header.name')}
			 />
		  )
		},
		{
		  accessorKey: 'dateOfBirth',
		  header: ({ column }: any) => (
			 <DataTableColumnHeader
				column={column}
				title={t('electionBase:confirmedVoters.table.header.age')}
			 />
			),
			cell: ( {cell}: {cell: any}  ) => {
				return (
					<span className='flex justify-center items-center'>
						{calcAge(cell.getValue())}
				  </span>
			  )
			}
		},
		{
		  accessorKey: 'pollingCenter.gov',
		  header: t('electionBase:confirmedVoters.table.header.governorate')
		},
		{
		  accessorKey: 'pollingCenter.name',
		  header: t('electionBase:confirmedVoters.table.header.pollingCenter')
		},
		{
		  accessorKey: 'gender',
			header: t( 'electionBase:confirmedVoters.table.header.gender' ),
			cell: ( {cell}: {cell: any} ) =>
			{
				return (
					<Fragment>
						{cell.getValue() === 0 ? 'ذكر' : 'انثى'}
				  </Fragment>
			  )
		  }
		},
		{
		  accessorKey: 'candidate.name',
		  header: ({ column }: any) => (
			 <DataTableColumnHeader
				column={column}
				title={t('electionBase:confirmedVoters.table.header.candidateName')}
			 />
		  )
		},
		{
		  accessorKey: 'serial',
		  header: t('electionBase:confirmedVoters.table.header.candidateNumber')
		},
		{
		  accessorKey: 'img',
		  header: t('electionBase:confirmedVoters.table.header.cardPhoto'),
			cell: ( { cell }: any ) =>
			{
				const value = cell.getValue()		 
				return (
					<Zoom preview={value} />
				)
			}
		},
		hasPermission( user, 'view:confirmedVotersActions' ) && {
		  id: 'actions',
		  accessorKey: 'actions',
		  header: 'الاجرائات',
		  cell: ({row}: {row: any}) =>
		  {
			const [deleteVoter, {isLoading}] = useDeleteVoterMutation()
			const {refetch} = useVotersQuery('')
			 const [openDelete, setOpenDelete] = useState<boolean>(false);
			 const [ openEdit, setOpenEdit ] = useState<boolean>( false );
			 const [ file, setFile ] = useState<File>()
				const form = useForm<z.infer<typeof addVoterSchema>>( {
				  resolver: zodResolver( addVoterSchema ),
				  defaultValues: {
					 name: row.original.name,
					 // @ts-ignore
					 birthDate: row.original.dateOfBirth,
					 gender: row.original.gender,
					 iDimage: '',
					 address: '',
					 pollingCenterId: row.original.pollingCenter.name,
					 candidateId: '',
					 voterType: row.original.serial
				  }
				} )
				const onSubmit = async ( values: z.infer<typeof addVoterSchema> ) =>
				{
				  console.log( values );
				  console.log(file);
				}
			  
			  const onDelete = async () =>
			  {
				  await deleteVoter( row.original.id )
				  refetch()
			  }
			 return (
				<div className="flex justify-between items-center gap-2">
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
			 title="حذف ناخب مؤكد"
			 description="هل انت متأكد من انك تريد حذف العنصر؟"
		  >
			 <DialogFooter>
				<div className="flex justify-between w-full">
				  <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
					 حذف
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
		  </BasicDialog>
		  <BasicDialog
			 open={openEdit}
			 onOpenChange={setOpenEdit}
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
				  <SquarePen size="20px" />
				</motion.button>
			 }
			 title="تعديل ناخب مؤكد"
			 description="ادخل المعطيات الاتية لتعديل عنصر"
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
								  defaultValue={field.value.toString()}
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
						  تعديل
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
			 </div>
			 )
		  }
		}
	 ].filter( Boolean )
	
	return {
		possibleVotersColumns,
		confirmedVotersColumns
	 }
}