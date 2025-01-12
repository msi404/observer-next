"use client";

import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/container";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basic-dialog";

import { candidatesData } from "@/app/_utils/faker";

const candidates: Candidate[] = candidatesData;

const CandidatesPage = () => {
  const { t } = useTranslation();

  const candidatesColumns: ColumnDef<CandidatesHeader>[] = [
    {
      accessorKey: "name",
      header: t("candidates:table.header.name"),
    },
    {
      accessorKey: "phoneNumber",
      header: t("candidates:table.header.phoneNumber"),
    },
    {
      accessorKey: "candidateNumber",
      header: t("candidates:table.header.candidateNumber"),
    },
    {
      accessorKey: "entityName",
      header: t("candidates:table.header.party"),
    },
    {
      accessorKey: "state",
      header: t("candidates:table.header.governorate"),
    },
  ];

  return (
    <Container>
      <DataTable
        searchPlaceholder={t("candidates:searchForCandidatesInput")}
        searchTerm="name"
        primaryAction={
          <BasicDialog
            buttonLabel={t("stateMangers:actions.filterAction")}
            buttonIcon={<Filter />}
            title="تصفية العناصر"
            description="تصفية العناصر حسب المعطيات الاتية"
            primaryAction={<Button>تصفية</Button>}
            secondaryAction={<Button variant="outline">الغاء</Button>}
          >
            {/* Filter Inputs */}
            {[...Array(5)].map((_, index) => (
              <div className="grid grid-cols-1 items-center gap-4" key={index}>
                <Input
                  id={index === 4 ? "username" : "name"}
                  placeholder={index === 4 ? "المحافظة" : "الاسم"}
                  className="col-span-3"
                />
              </div>
            ))}
          </BasicDialog>
        }
        columns={candidatesColumns}
        data={candidates}
      />
    </Container>
  );
};

export default CandidatesPage;
