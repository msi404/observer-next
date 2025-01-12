"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ContactRound, TrendingUp, Hash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Container } from "@/app/_components/container";
import { DataCard } from "@/app/_components/data-card";
import { DataTable } from "@/app/_components/data-table";

import { electionResultsData } from "@/app/_utils/faker";
import Placeholder from "@/app/_assets/images/placeholder.png";

const electionResults: ElectionResult[] = electionResultsData;

const ElectionResultsPage = () => {
  const { t } = useTranslation();

  const electionResultsColumns: ColumnDef<ElectionResultsHeader>[] = [
    {
      accessorKey: "photo",
      header: t("electionResults:table.header.personalPhoto"),
      cell: ({ row }) => {
        const photoUrl = row.getValue("photo") as string;
        return (
          <Image
            placeholder="blur"
            blurDataURL={Placeholder.blurDataURL}
            width={48}
            height={48}
            src={photoUrl}
            alt={t("electionResults:table.alt.personalPhoto")}
            className="w-12 h-12 rounded-lg"
          />
        );
      },
    },
    { accessorKey: "name", header: t("electionResults:table.header.name") },
    { accessorKey: "number", header: t("electionResults:table.header.candidateNumber") },
    { accessorKey: "state", header: t("electionResults:table.header.governorate") },
    { accessorKey: "listNumber", header: t("electionResults:table.header.listNumber") },
    {
      accessorKey: "votes",
      header: () => (
        <div className="flex justify-center items-center gap-4">
          <TrendingUp />
          {t("electionResults:table.header.numberOfVotes")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("votes") as number}</div>
      ),
    },
    {
      accessorKey: "listIndex",
      header: () => (
        <div className="flex justify-center items-center gap-4">
          <Hash />
          {t("electionResults:table.header.listIndex")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("listIndex") as number}</div>
      ),
    },
  ];

  return (
    <Container>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataCard
            description={t("electionResults:cards.candidates")}
            total={5}
            icon={<ContactRound size={40} />}
          />
          <DataCard
            description={t("electionResults:cards.totalOfListVotes")}
            total={10}
            icon={<TrendingUp size={40} />}
          />
        </div>
        <DataTable
          searchPlaceholder={t("electionResults:searchForCandidateNameInput")}
          searchTerm="name"
          columns={electionResultsColumns}
          data={electionResults}
        />
      </div>
    </Container>
  );
};

export default ElectionResultsPage;
