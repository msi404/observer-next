"use client";
import { useTranslation } from "react-i18next";

import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from '@/app/_components/ui/input'
import {Button} from '@/app/_components/ui/button'
import { Container } from "@/app/_components/container";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basic-dialog";
import {DataTableColumnHeader} from '@/app/_components/table-header'
import { stateManagersData } from "@/app/_utils/faker";

const stateMangers: StateMangers[] = stateManagersData;

const StateMangersPage = () => {
	const { t } = useTranslation();

	const stateMangersColumns: ColumnDef<StateMangersHeader>[] = [
		{
			accessorKey: "name",
			header: ( { column } ) => (
				<DataTableColumnHeader column={column} title={t("stateMangers:table.header.name")} />
			),
		},
		{
			accessorKey: "phoneNumber",
			header: t("stateMangers:table.header.phoneNumber"),
		},
		{
			accessorKey: "state",
			header: t("stateMangers:table.header.governorate"),
		},
		{
			accessorKey: "entityName",
			header: t("stateMangers:table.header.party"),
		},
	];
	return (
		<Container>
			<DataTable
				searchPlaceholder={ t( "stateMangers:actions.searchByNameInput" ) }
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
				columns={stateMangersColumns}
				data={stateMangers}
			/>
		</Container>
	);
};

export default StateMangersPage;
