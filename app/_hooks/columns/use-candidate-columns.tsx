'use client';
import { useSelector } from 'react-redux';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/custom/table-header';
import { Zoom } from '@/app/_components/custom/zoom';
import { EditCandidateForm } from '@/app/_components/forms/edit-candidate-form'

export const useCandidateColumns = () => {
  const user = useSelector(selectUser);
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
      ),
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
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
    },
    {
      id: 'govCenter',
      accessorKey: 'govCenter.name',
      header: 'مكتب المحافظة',
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
      id: 'profileImg',
      accessorKey: 'profileImg',
      header: 'الصورة الشخصية',
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return <Zoom preview={value} className='rounded-full' />;
      }
    },
    hasPermission(user, 'view:editCandidate') && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditCandidateForm id={row.original.id} item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    candidatesColumns
  };
};
