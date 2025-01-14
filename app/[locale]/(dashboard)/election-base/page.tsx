"use client";

import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {useReactTable, getCoreRowModel,type ColumnDef} from '@tanstack/react-table'

import { Container } from "@/app/_components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";

import { DynamicTable } from '@/app/_components/dynamic-table'

import { confirmedVotersData } from "@/app/_utils/faker";
import Placeholder from "@/app/_assets/images/placeholder.png";

const ElectionBasePage = () =>
{
  const { t } = useTranslation()

  const confirmedVotrs: ConfirmedVoters[] = confirmedVotersData;
  
  const confirmedVotrsColumns: ColumnDef<ConfirmedVotersHeader>[] = [
    {
      accessorKey: "name",
      header: t('electionBase:confirmedVoters.table.header.name'),
    },
    {
      accessorKey: "address",
      header: t('electionBase:confirmedVoters.table.header.address'),
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
      header: t( "electionBase:confirmedVoters.table.header.cardPhoto" ),
      cell: ({ row }) => {
        const photoUrl = row.getValue("cardPhoto") as string;
        return (
          <Image
            placeholder="blur"
            blurDataURL={Placeholder.blurDataURL}
            width={48}
            height={48}
            src={photoUrl}
            alt={t("observers:table.alt.observerPhoto")}
            className="w-12 h-12 rounded-full"
          />
        );
      },
    },
  ];

   const table = useReactTable({
    data: confirmedVotrs,
    columns: confirmedVotrsColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Container>
      <Tabs defaultValue="political-entities">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger className="w-full" value="political-entities">
            {t("electionBase:confirmedVoters.tabTitle")}
          </TabsTrigger>
          <TabsTrigger value="electoral-distribution">
            {t("electionBase:possibleVoters.tabTitle")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="political-entities">
          <motion.div initial={{x: -300}} animate={{x: 0, transition: {damping: 0, ease: 'easeOut'}}}>
            <DynamicTable table={table} />
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">

        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default ElectionBasePage;
