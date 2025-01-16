"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/container";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basic-dialog";
import { observersData } from "@/app/_utils/faker";
import Placeholder from "@/app/_assets/images/placeholder.png";

const observers: Observer[] = observersData;

const ObserversPage = () => {
  const { t } = useTranslation();

  const observerColumns: ColumnDef<ObserversHeader>[] = [
    {
      accessorKey: "photo",
      header: t("observers:table.header.observerPhoto"),
      cell: ({ row }) => {
        const photoUrl = row.getValue("photo") as string;
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
    { accessorKey: "name", header: t("observers:table.header.name") },
    { accessorKey: "phoneNumber", header: t("observers:table.header.phoneNumber") },
    { accessorKey: "gender", header: t("observers:table.header.gender") },
    { accessorKey: "dataEntry", header: t("observers:table.header.dataEntry") },
    { accessorKey: "state", header: t("observers:table.header.governorate") },
    { accessorKey: "pollingCenter", header: t("observers:table.header.pollingCenter") },
    { accessorKey: "stationNumber", header: t("observers:table.header.stationNumber") },
  ];

  return (
    <Container>
      <DataTable
        searchPlaceholder={t("observers:searchForObserversInput")}
        searchTerm="name"
        primaryAction={
          <BasicDialog
          open
          onOpenChange={() => console.log('test')}
            buttonLabel={t("stateMangers:actions.filterAction")}
            buttonIcon={<Filter />}
            title={t("observers:dialog.filterTitle")}
            description={t("observers:dialog.filterDescription")}
            primaryAction={<Button>{t("observers:dialog.applyFilter")}</Button>}
            secondaryAction={<Button variant="outline">{t("observers:dialog.cancelFilter")}</Button>}
          >
            {["name", "phone", "gender", "state", "pollingCenter"].map((id, index) => (
              <div className="grid grid-cols-1 items-center gap-4" key={index}>
                <Input id={id} placeholder={t(`observers:dialog.filterPlaceholder.${id}`)} className="col-span-3" />
              </div>
            ))}
          </BasicDialog>
        }
        columns={observerColumns}
        data={observers}
      />
    </Container>
  );
};

export default ObserversPage;
