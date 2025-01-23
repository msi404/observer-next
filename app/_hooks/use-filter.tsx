'use client';
import { useEffect ,useState, useMemo, useCallback } from 'react'
import { type Table } from '@tanstack/react-table'
import { BasicDialog } from '@/app/_components/basic-dialog'
import { Input } from '@/app/_components/ui/input'
import { Combobox } from '@/app/_components/combobox'
import { DialogFooter, DialogClose } from '@/app/_components/ui/dialog'
import { Separator } from '@/app/_components/ui/separator'
import {Button} from '@/app/_components/ui/button'
import { Filter } from 'lucide-react'

interface Filter {
	id: string;
	value: string;
}
 

const governorates = [
	{ label: 'بغداد', value: 'بغداد' },
	{ label: 'البصرة', value: 'البصرة' },
	{ label: 'نينوى', value: 'نينوى' },
	{ label: 'أربيل', value: 'أربيل' },
	{ label: 'السليمانية', value: 'السليمانية' },
	{ label: 'دهوك', value: 'دهوك' },
	{ label: 'كركوك', value: 'كركوك' },
	{ label: 'النجف', value: 'النجف' },
	{ label: 'كربلاء', value: 'كربلاء' },
	{ label: 'بابل', value: 'بابل' },
	{ label: 'الأنبار', value: 'الأنبار' },
	{ label: 'ديالى', value: 'ديالى' },
	{ label: 'واسط', value: 'واسط' },
	{ label: 'ميسان', value: 'ميسان' },
	{ label: 'ذي قار', value: 'ذي قار' },
	{ label: 'المثنى', value: 'المثنى' },
	{ label: 'القادسية', value: 'القادسية' },
	{ label: 'صلاح الدين', value: 'صلاح الدين' }
 ];


export const useFilter = () =>
{
	const FilterConfirmedVoters = (table: Table<any>) =>
	{
		const [filters, setFilters] = useState<Filter[]>([]);
		const [ open, setOpen ] = useState( false );
			
			const applyFilters = useCallback(() => {
				table.setColumnFilters(filters);
				setOpen(false);
				setFilters([]);
			 }, [table, filters]);
		  
			 useEffect(() => {
				const handleKeyDown = (e: KeyboardEvent) => {
				  if (e.key === 'Enter') applyFilters();
				};
				document.addEventListener('keydown', handleKeyDown);
				return () => document.removeEventListener('keydown', handleKeyDown);
			 }, [applyFilters]);
		  
			 const DialogComponent = useMemo(
				() => (
				  <BasicDialog
					 open={open}
					 onOpenChange={setOpen}
					 button={<Button className='lg:w-1/4'>تصفية<Filter/></Button>}
					 title="تصفية"
					 description="ادخل المعطيات الاتية لتصفية العناصر"
				  >
					 <Input
						placeholder="العنوان"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'address', value: event.target.value }
						  ])
						}
					 />
					 <Combobox
						options={governorates}
						setSelect={(value) =>
						  setFilters(() => [...filters, { id: 'state', value: value }])
						}
						label="المحافظة"
					 />
		  
					 <Input
						placeholder="مركز الاقتراع"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'pollingCenter', value: event.target.value }
						  ])
						}
					 />
					 <Input
						placeholder="مدخل البيانات"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'dataEntry', value: event.target.value }
						  ])
						}
					 />
					 <Input
						placeholder="المرشح"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'candidate', value: event.target.value }
						  ])
						}
					 />
					 <div className=" relative">
						<Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
					 </div>
					 <DialogFooter>
						<div className="flex justify-between w-full">
						  <Button type="submit" onClick={applyFilters}>
							 تصفية
						  </Button>
						  <DialogClose asChild aria-label="Close">
							 <Button variant="outline">الغاء</Button>
						  </DialogClose>
						</div>
					 </DialogFooter>
				  </BasicDialog>
				),
				[applyFilters, filters, open]
			 );
		  
			 return DialogComponent;
	}

	const FilterPossibleVoters = ( table: Table<any> ) =>
	{
		const [filters, setFilters] = useState<Filter[]>([]);
			const [ open, setOpen ] = useState( false );
			
			const applyFilters = useCallback(() => {
				table.setColumnFilters(filters);
				setOpen(false);
				setFilters([]);
			 }, [table, filters]);
		  
			 useEffect(() => {
				const handleKeyDown = (e: KeyboardEvent) => {
				  if (e.key === 'Enter') applyFilters();
				};
				document.addEventListener('keydown', handleKeyDown);
				return () => document.removeEventListener('keydown', handleKeyDown);
			 }, [applyFilters]);
		  
			 const DialogComponent = useMemo(
				() => (
				  <BasicDialog
					 open={open}
					 onOpenChange={setOpen}
					 button={<Button className='lg:w-1/4'>تصفية<Filter/></Button>}
					 title="تصفية"
					 description="ادخل المعطيات الاتية لتصفية العناصر"
				  >
					 <Input
						placeholder="العنوان"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'address', value: event.target.value }
						  ])
						}
					 />
					 <Combobox
						options={governorates}
						setSelect={(value) =>
						  setFilters(() => [...filters, { id: 'state', value: value }])
						}
						label="المحافظة"
					 />
		  
					 <Input
						placeholder="مركز الاقتراع"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'pollingCenter', value: event.target.value }
						  ])
						}
					 />
					 <Input
						placeholder="مدخل البيانات"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'dataEntry', value: event.target.value }
						  ])
						}
					 />
					 <Input
						placeholder="المرشح"
						onChange={(event) =>
						  setFilters(() => [
							 ...filters,
							 { id: 'candidate', value: event.target.value }
						  ])
						}
					 />
					 <div className=" relative">
						<Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
					 </div>
					 <DialogFooter>
						<div className="flex justify-between w-full">
						  <Button type="submit" onClick={applyFilters}>
							 اضافة
						  </Button>
						  <DialogClose asChild aria-label="Close">
							 <Button variant="outline">الغاء</Button>
						  </DialogClose>
						</div>
					 </DialogFooter>
				  </BasicDialog>
				),
				[applyFilters, filters, open]
			 );
		  
			 return DialogComponent;
	}

	return {
		FilterConfirmedVoters,
		FilterPossibleVoters
	}
}