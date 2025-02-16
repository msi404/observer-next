'use client';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import {EditDataEntryForm} from '@/app/_components/forms/edit-data-entry-form'
export const useDataEntryColumns = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  // @ts-ignore
  const dataEntriesColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='اسم الموظف'
        />
      )
    },
    {
      id: 'provinceOffice',
      accessorKey: 'gov.name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='مكتب المحافظة'
        />
      ),
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
    },
    {
      id: 'phone',
      accessorKey: 'phone',
      header: 'رقم الهاتف'
	  },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'البريد الالكتروني'
	  },
     {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditDataEntryForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    dataEntriesColumns
  };
};
