'use client';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { Zoom } from '@/app/_components/zoom';
import { EditCandidateForm } from '@/app/_components/forms/edit-candidate-form'

export const useCandidateColumns = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  // @ts-ignore
  const candidatesColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='اسم المرشح'
        />
      )
    },
    {
      id: 'candidateSerial',
      accessorKey: 'candidateSerial',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='رقم المرشح'
        />
      ),
    },
    {
      id: 'candidateListSerial',
      accessorKey: 'candidateListSerial',
      header: 'رقم القائمة'
    },
    {
      id: 'pollingCenter',
      accessorKey: 'pollingCenter.name',
      header: 'مكتب المحافظة'
    },
    {
      id: 'phone',
      accessorKey: 'phone',
      header: 'رقم الهاتف'
    },
    {
      id: 'profileImg',
      accessorKey: 'profileImg',
      header: 'الصورة الشخصية',
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return value;
      }
    },
    hasPermission(user, 'view:confirmedVotersActions') && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditCandidateForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    candidatesColumns
  };
};
