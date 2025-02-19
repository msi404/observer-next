'use client';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { Zoom } from '@/app/_components/zoom';
import {EditProvniceAdminForm} from '@/app/_components/forms/edit-province-admin-form'
export const useProvniceAdminsColumns = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  // @ts-ignore
  const provinceAdminsColumns: ColumnDef<ConfirmedVoters>[] = [
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
      id: 'govCenter',
      accessorKey: 'govCenter.name',
      header: 'مكتب المحافظة',
      cell: ({ cell }: { cell: any }) => {
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
      id: 'profileImg',
      accessorKey: 'profileImg',
      header: 'الصورة الشخصية',
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return <Zoom className='border rounded-full w-16 h-16' preview={value} />;
      }
    },
    hasPermission(user, 'view:addPronviceAdmin') && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditProvniceAdminForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    provinceAdminsColumns
  };
};
