"use client";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Container } from "@/app/_components/container";
import { DataTable } from "@/app/_components/data-table";
import { BasicDialog } from "@/app/_components/basic-dialog";
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { stateManagersData } from "@/app/_utils/faker";

const stateManagers: StateMangers[] = stateManagersData;

const StateManagersPage = () => {
  const { t } = useTranslation();

  const stateManagersColumns: ColumnDef<StateMangersHeader>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("stateManagers:table.header.name")} />
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: t("stateManagers:table.header.phoneNumber"),
    },
    {
      accessorKey: "state",
      header: t("stateManagers:table.header.governorate"),
    },
    {
      accessorKey: "entityName",
      header: t("stateManagers:table.header.party"),
    },
  ];

  return (
    <Container>
      <DataTable
        searchPlaceholder={t("stateManagers:actions.searchByNameInput")}
        searchTerm="name"
        primaryAction={
          <BasicDialog
          open
          onOpenChange={() => console.log('test')}
            buttonLabel={t("stateManagers:actions.filterAction")}
            buttonIcon={<Filter />}
            title={t("stateManagers:dialog.filterTitle")}
            description={t("stateManagers:dialog.filterDescription")}
          >
            <div className="grid grid-cols-1 items-center gap-4">
              <Input
                id="name"
                placeholder={t("stateManagers:filter.name")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Input
                id="party"
                placeholder={t("stateManagers:filter.party")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Input
                id="governorate"
                placeholder={t("stateManagers:filter.governorate")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Input
                id="phoneNumber"
                placeholder={t("stateManagers:filter.phone")}
                className="col-span-3"
              />
            </div>
          </BasicDialog>
        }
        columns={stateManagersColumns}
        data={stateManagers}
      />
    </Container>
  );
};

export default StateManagersPage;
