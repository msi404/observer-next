'use client';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import {EditPartiesRepresentersForm} from '@/app/_components/forms/edit-parties-representers-form';
export const usePartiesRepresentersColumns = () =>
{
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  // @ts-ignore
  const partiesRepresentersColumns: ColumnDef<ConfirmedVoters>[] = [
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
      header: 'رقم الهاتف',
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
	  },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'البريد الالكتروني',
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
	  },
     {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditPartiesRepresentersForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    partiesRepresentersColumns
  };
};
