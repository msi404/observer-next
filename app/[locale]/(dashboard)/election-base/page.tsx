'use client';
import { type NextPage } from 'next';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Container } from '@/app/_components/container';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/_components/ui/tabs';
import {EmptyTable} from '@/app/_components/empty-table'
import { ErrorTable } from '@/app/_components/error-table'
import {FetchTable} from '@/app/_components/fetch-table'
import { useFilter } from '@/app/_hooks/use-filter';
import { Table } from '@/app/_components/table'
import { Switch, Match } from '@/app/_components/switch'
import {LoadingTable} from '@/app/_components/loading-table'
import { useElectionBaseTable } from '@/app/_hooks/use-election-base-table';
import { AddConfirmVoterEmptyForm } from '@/app/_components/forms/add-confirm-voter-empty-form'
import { AddConfirmVoterForm } from '@/app/_components/forms/add-confirm-voter-form'
import { AddPossibleVoterForm } from '@/app/_components/forms/add-possible-voter-form'
import { AddPossibleVoterEmptyForm } from '@/app/_components/forms/add-possible-voter-empty-form'
import {Retry} from '@/app/_components/retry'

const ElectionBasePage: NextPage = () => {  
  const {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    voters,
    refetch,
    confirmedVotersTable,
    confirmedVotersColumnFilter,
    clearConfirmedVotersFilters,
  } = useElectionBaseTable();

  const { FilterConfirmedVoters, FilterPossibleVoters } = useFilter();

  const { t } = useTranslation();

  return (
    <Container>
      <Tabs defaultValue="political-entities">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger className="w-full" value="political-entities">
            {t('electionBase:confirmedVoters.tabTitle')}
          </TabsTrigger>
          <TabsTrigger value="electoral-distribution">
            {t('electionBase:possibleVoters.tabTitle')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="political-entities">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Switch>
              <Match when={isError}>
                <ErrorTable retry={refetch}/>
              </Match>
              <Match when={isLoading}>
                <LoadingTable />
              </Match>
              <Match when={isFetching}>
                <FetchTable />
              </Match>
              <Match when={isSuccess && voters?.data?.items.length === 0}>
                <EmptyTable Add={<AddConfirmVoterEmptyForm />} retry={refetch}/>
              </Match>
              <Match when={isSuccess && voters?.data?.items.length > 0}>
              <Table
              Filter={FilterConfirmedVoters}
              Add={ AddConfirmVoterForm }
              Retry={<Retry refetch={refetch}/>}
              columnFilter={confirmedVotersColumnFilter}
              clearFilter={clearConfirmedVotersFilters}
              table={ confirmedVotersTable } />
              </Match>
           </Switch>
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Switch>
              <Match when={isError}>
                <ErrorTable retry={refetch}/>
              </Match>
              <Match when={isFetching}>
                <FetchTable />
              </Match>
              <Match when={isSuccess && voters?.data?.items.length === 0}>
                <EmptyTable Add={<AddPossibleVoterEmptyForm />} retry={refetch}/>
              </Match>
              <Match when={isSuccess && voters?.data?.items.length > 0}>
              <Table
              Filter={FilterPossibleVoters}
              Add={ AddPossibleVoterForm }
              columnFilter={confirmedVotersColumnFilter}
              clearFilter={clearConfirmedVotersFilters}
              table={ confirmedVotersTable } />
              </Match>
           </Switch>
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default ElectionBasePage;
