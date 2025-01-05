"use client";
import {useTranslation} from 'react-i18next'
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from '@/app/_components/ui/input'
import {Button} from '@/app/_components/ui/button'
import { Container } from "@/app/_components/container";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/app/_components/ui/tabs";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basicDialog";

import { possibleVotersData, confirmedVotersData } from "@/app/utils/faker";
import Placeholder from "@/app/_assets/images/placeholder.png";

const possibleVoters: PossibleVoters[] = possibleVotersData;

const confirmedVoters: ConfirmedVoters[] = confirmedVotersData;

const ElectionBasePage = () =>
{
	const { t } = useTranslation()
	
	const possibleVotersColumns: ColumnDef<PossibleVotersHeader>[] = [
		{
			accessorKey: "name",
			header: t("electionBase:possibleVoters.table.header.name"),
		},
		{
			accessorKey: "address",
			header: t("electionBase:possibleVoters.table.header.address"),
		},
		{
			accessorKey: "state",
			header: t("electionBase:possibleVoters.table.header.governorate"),
		},
		{
			accessorKey: "pollingCenter",
			header: t("electionBase:possibleVoters.table.header.pollingCenter"),
		},
		{
			accessorKey: "dataEntry",
			header: t("electionBase:possibleVoters.table.header.dataEntry"),
		},
		{
			accessorKey: "candidate",
			header: t("electionBase:possibleVoters.table.header.candidateName"),
		},
	];
	

const confirmedVotersColumns: ColumnDef<ConfirmedVotersHeader>[] = [
	{
		accessorKey: "name",
		header: t("electionBase:confirmedVoters.table.header.name"),
	},
	{
		accessorKey: "address",
		header: t("electionBase:confirmedVoters.table.header.address"),
	},
	{
		accessorKey: "state",
		header: t("electionBase:confirmedVoters.table.header.governorate"),
	},
	{
		accessorKey: "pollingCenter",
		header: t("electionBase:confirmedVoters.table.header.pollingCenter"),
	},
	{
		accessorKey: "dataEntry",
		header: t("electionBase:confirmedVoters.table.header.dataEntry"),
	},
	{
		accessorKey: "candidate",
		header: t("electionBase:confirmedVoters.table.header.candidateName"),
	},
	{
		accessorKey: "candidateNumber",
		header: t("electionBase:confirmedVoters.table.header.candidateNumber"),
	},
	{
		accessorKey: "cardPhoto",
		header: t("electionBase:confirmedVoters.table.header.cardPhoto"),
		cell: ({ row }) => {
			const photoUrl = row.getValue("cardPhoto");
			return (
				<Image
					placeholder="blur"
					blurDataURL={Placeholder.blurDataURL}
					width={48}
					height={48}
					src={photoUrl as string}
					alt="صورة البطاقة"
					className="w-12 h-12 rounded-lg"
				/>
			);
		},
	},
];
	return (
		<Container>
			<Tabs defaultValue="political-entities">
				<TabsList className="grid w-full grid-cols-2 mb-6">
					<TabsTrigger value="political-entities">
						{t("electionBase:confirmedVoters.tabTitle")}
					</TabsTrigger>
					<TabsTrigger value="electoral-distribution">
					{t("electionBase:possibleVoters.tabTitle")}
					</TabsTrigger>
				</TabsList>
				<TabsContent value="political-entities">
					<DataTable
						searchPlaceholder={t("electionBase:confirmedVoters.searchForConfirmedVotersInput")}
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
						columns={confirmedVotersColumns}
						data={confirmedVoters}
					/>
				</TabsContent>
				<TabsContent value="electoral-distribution">
					<DataTable
						searchPlaceholder={t("electionBase:possibleVoters.searchForPossibleVotersInput")}
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
						columns={possibleVotersColumns}
						data={possibleVoters}
					/>
				</TabsContent>
			</Tabs>
		</Container>
	);
};

export default ElectionBasePage;
