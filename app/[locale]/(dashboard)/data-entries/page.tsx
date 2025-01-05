"use client";
import {useTranslation} from 'react-i18next'
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from '@/app/_components/ui/input'
import {Button} from '@/app/_components/ui/button'
import { Container } from "@/app/_components/container";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basicDialog";

import { dataEntriesData } from "@/app/utils/faker";

const dataEntries: DataEntry[] = dataEntriesData;

const DataEntriesPage = () =>
{
	const { t } = useTranslation()
	
	const dataEntriesColumns: ColumnDef<DataEntriesHeader>[] = [
		{
			accessorKey: "name",
			header: t("dataEntries:table.header.name"),
		},
		{
			accessorKey: "phoneNumber",
			header: t("dataEntries:table.header.phoneNumber"),
		},
		{
			accessorKey: "entityName",
			header: t("dataEntries:table.header.party"),
		},
		{
			accessorKey: "state",
			header: t("dataEntries:table.header.governorate"),
		},
		{
			accessorKey: "stateManger",
			header: t("dataEntries:table.header.governorateManger"),
		},
	];
	return (
		<Container>
			<DataTable
				searchPlaceholder={t("dataEntries:searchForDataEntriesInput")}
				searchTerm="name"
				primaryAction={
					<BasicDialog
						buttonLabel={ t( "stateMangers:actions.filterAction" ) }
						buttonIcon={<Filter />}
						title="تصفية العناصر"
						description="تصفية العناصر حسب المعطيات الاتية"
						primaryAction={ <Button>تصفية</Button> }
						secondaryAction={<Button variant='outline'>الغاء</Button>}>
						<div className="grid grid-cols-1 items-center gap-4">
							<Input
								id="name"
								placeholder="الاسم"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-1 items-center gap-4">
							<Input
								id="name"
								placeholder="الاسم"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-1 items-center gap-4">
							<Input
								id="name"
								placeholder="الاسم"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-1 items-center gap-4">
							<Input
								id="name"
								placeholder="الاسم"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-1 items-center gap-4">
							<Input
								id="username"
								placeholder="المحافظة"
								className="col-span-3"
							/>
						</div>
					</BasicDialog>
				}
				columns={dataEntriesColumns}
				data={dataEntries}
			/>
		</Container>
	);
};

export default DataEntriesPage;
