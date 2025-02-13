'use client';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { calcAge } from '@/app/_utils/calc-age';
import { Zoom } from '@/app/_components/zoom';
import {EditConfirmedVoterForm} from '@/app/_components/forms/edit-confirmed-voter-form'
export const useConfirmedVotersColumns = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  // @ts-ignore
  const confirmedVotersColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.name')}
        />
      )
    },
    {
      id: 'dateOfBirth',
      accessorKey: 'birth',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.age')}
        />
      ),
      cell: ({ cell }: { cell: any }) => {
        return (
          <span className="flex justify-center items-center">
            {calcAge(cell.getValue())}
          </span>
        );
      }
    },
    {
      id: 'province',
      accessorKey: 'province.gov.name',
      header: t('electionBase:confirmedVoters.table.header.governorate')
    },
    {
      id: 'pollingCenter',
      accessorKey: 'pollingCenter.name',
      header: t( 'electionBase:confirmedVoters.table.header.pollingCenter' ),
      cell: ({ cell }: { cell: any }) => {
        return <span className='text-xs'>{cell.getValue()}</span>;
      }
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'العنوان',
      cell: ({ cell }: { cell: any }) => {
        return <span className=' text-xs'>{cell.getValue()}</span>;
      }
    },
    {
      id: 'gender',
      accessorKey: 'gender',
      header: t('electionBase:confirmedVoters.table.header.gender'),
      cell: ({ cell }: { cell: any }) => {
        return <Fragment>{cell.getValue() === 0 ? 'ذكر' : 'انثى'}</Fragment>;
      }
    },
    {
      id: 'candidate',
      accessorKey: 'candidate.name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.candidateName')}
        />
      ),
      cell: ({ cell }: { cell: any }) => {
        return <span>{cell.getValue() ?? 'لا يوجد'}</span>;
      }
    },
    {
      id: 'serial',
      accessorKey: 'serial',
      header: t('electionBase:confirmedVoters.table.header.candidateNumber')
    },
    {
      id: 'img',
      accessorKey: 'card',
      header: t('electionBase:confirmedVoters.table.header.cardPhoto'),
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return <Zoom className='border w-16' preview={value} />;
      }
    },
    hasPermission(user, 'view:confirmedVotersActions') && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditConfirmedVoterForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    confirmedVotersColumns
  };
};
