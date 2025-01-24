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
import {useElectoralEntitiesTable} from '@/app/_hooks/use-electoral-entities-table'
import { useFilter } from '@/app/_hooks/use-filter';
import { useAdd } from '@/app/_hooks/use-add';
import { Table } from '@/app/_components/table'
import {Switch, Match} from '@/app/_components/switch'

const ElectionBasePage: NextPage = () => {  
  const {
    isError,
    isFetching,
    isSuccess,
    data,
    refetch,
    electoralEntitiesTable,
    electoralEntitiesColumnFilter,
    clearElectoralEntitiesFilters,
  } = useElectoralEntitiesTable();

  const { AddConfirmedVoter, AddPossibleVoter } = useAdd();
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
              <Match when={isFetching}>
                <FetchTable />
              </Match>
              <Match when={isSuccess && data?.data?.items.length === 0}>
                <EmptyTable retry={refetch}/>
              </Match>
              <Match when={isSuccess && data?.data?.items.length > 0}>
              <Table
              Filter={FilterConfirmedVoters}
              Add={AddConfirmedVoter}
              columnFilter={electoralEntitiesColumnFilter}
              clearFilter={clearElectoralEntitiesFilters}
              table={ electoralEntitiesTable } />
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
              <Match when={isSuccess && data?.data?.items.length === 0}>
                <EmptyTable retry={refetch}/>
              </Match>
              <Match when={isSuccess && data?.data?.items.length > 0}>
              <Table
              Filter={FilterConfirmedVoters}
              Add={AddConfirmedVoter}
              columnFilter={electoralEntitiesColumnFilter}
              clearFilter={clearElectoralEntitiesFilters}
              table={ electoralEntitiesTable } />
              </Match>
           </Switch>
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default ElectionBasePage;
