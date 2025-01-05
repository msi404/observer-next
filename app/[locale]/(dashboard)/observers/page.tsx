"use client";

import {useTranslation} from 'react-i18next'
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from '@/app/_components/ui/input'
import {Button} from '@/app/_components/ui/button'
import { Container } from "@/app/_components/container";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basicDialog";
import { observersData } from "@/app/utils/faker";
import Placeholder from "@/app/_assets/images/placeholder.png";

const observers: Observer[] = observersData;

const ObserversPage = () =>
{
	const { t } = useTranslation()
	
	const observerColumns: ColumnDef<ObserversHeader>[] = [
		{
			accessorKey: "photo",
			header: t("observers:table.header.observerPhoto"),
			cell: ({ row }) => {
				const photoUrl = row.getValue("photo");
				return (
					<Image
						placeholder="blur"
						blurDataURL={Placeholder.blurDataURL}
						width={48}
						height={48}
						src={photoUrl as string}
						alt="صورة الشخصية للمرشح"
						className="w-12 h-12 rounded-full"
					/>
				);
			},
		},
		{
			accessorKey: "name",
			header: t("observers:table.header.name"),
		},
		{
			accessorKey: "phoneNumber",
			header: t("observers:table.header.phoneNumber"),
		},
		{
			accessorKey: "gender",
			header: t("observers:table.header.gender"),
		},
		{
			accessorKey: "dataEntry",
			header: t("observers:table.header.dataEntry"),
		},
		{
			accessorKey: "state",
			header: t("observers:table.header.governorate"),
		},
		{
			accessorKey: "pollingCenter",
			header: t("observers:table.header.pollingCenter"),
		},
		{
			accessorKey: "stationNumber",
			header: t("observers:table.header.stationNumber"),
		},
	];
	return (
		<Container>
			<DataTable
				searchPlaceholder={t("observers:searchForObserversInput")}
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
				columns={observerColumns}
				data={observers}
			/>
		</Container>
	);
};

export default ObserversPage;
