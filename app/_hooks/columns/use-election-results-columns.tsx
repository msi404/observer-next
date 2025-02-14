'use client';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { Zoom } from '@/app/_components/zoom';
import { TrendingUp } from 'lucide-react';

export const useElectionsResultsColumns = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  // @ts-ignore
  const electionResultsColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      id: 'hash',
      accessorKey: 'hash',
      header: '#',
      cell: ({ row }: { row: any }) => {
        return (
          <h1 className="text-xl text-primary font-medium">
            {Number(row.id) + 1}#
          </h1>
        );
      }
    },
    {
      id: 'img',
      accessorKey: 'profileImg',
      header: 'الصورة الشخصية',
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return <Zoom className="rounded-full border w-12 h-12" preview={value} />;
      }
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.name')}
        />
      ),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            <h1 className="text-lg text-primary">{row.original.name}</h1>
            <span className="text-xs text-gray-600">
              رقم المرشح: {row.original.candidateSerial}
            </span>
          </div>
        );
      }
    },
    {
      id: 'pollingCenter',
      accessorKey: 'pollingCenter.name',
      header: t('electionBase:confirmedVoters.table.header.pollingCenter'),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            <h1 className="text-lg text-primary">{row.original.name}</h1>
            <span className="text-xs text-gray-600">
              رقم القائمة: {row.original.candidateListSerial}
            </span>
          </div>
        );
      }
    },
    {
      id: 'votes',
      accessorKey: 'totalVoters',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='عدد الاصوات'
        />
      ),
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <TrendingUp/>
            <div className="text-center">
              <h1 className="text-lg text-primary">
                {row.original.totalVoters}
              </h1>
              <span className="text-xs text-gray-600">عدد الاصوات</span>
            </div>
          </div>
        );
      }
    },
    {
      id: 'list',
      accessorKey: 'totalVoters',
      header: 'تسلسل القائمة',
      cell: ({ cell }: { cell: any }) => {
        return (
          <div className='text-center'>
          <h1 className="text-lg text-primary">{cell.getValue()}</h1>
          <span className="text-xs text-gray-600">
            تسلسل القائمة
          </span>
        </div>
        )
      }
    },
    {
      id: 'pollingCenterSerial',
      accessorKey: 'totalVoters',
      header: 'تسلسل مركز التسجيل',
      cell: ({ cell }: { cell: any }) => {
        return (
          <div className='text-center'>
          <h1 className="text-lg text-primary">{cell.getValue()}</h1>
          <span className="text-xs text-gray-600">
            تسلسل مركز التسجيل
          </span>
        </div>
        )
      }
    },
    {
      id: 'provinceSerial',
      accessorKey: 'totalVoters',
      header: 'تسلسل مكتب المحافظة',
      cell: ({ cell }: { cell: any }) => {
        return (
          <div className='text-center'>
          <h1 className="text-lg text-primary">{cell.getValue()}</h1>
          <span className="text-xs text-gray-600">
            تسلسل مركز التسجيل
          </span>
        </div>
        )
      }
    }
  ].filter(Boolean);

  return {
    electionResultsColumns
  };
};
