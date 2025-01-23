'use client';
import { type NextPage } from 'next';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';

import { Container } from '@/app/_components/container';
import { Card, CardContent } from '@/app/_components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/_components/ui/tabs';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { DataTablePagination } from '@/app/_components/table-pagination';
import { Dynamic } from '@/app/_components/dynamic';
import { Show } from '@/app/_components/show';

import { useDynamicTable } from '@/app/_hooks/use-dynamic-table';
import { useFilter } from '@/app/_hooks/use-filter';
import { useAdd } from '@/app/_hooks/use-add';

const PartiesRepresentersPage: NextPage = () => {
  const user = useSelector( selectUser );
  
  const {
    confirmedVotersTable,
    possibleVotersTable,
    confirmedVotersColumnFilter,
    possibleVotersColumnFilter,
    clearConfirmedVotersFilters,
    clearPossibleVotersFilters
  } = useDynamicTable();

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
            <Card className="p-4">
              <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
                  <Input
                    value={
                      (confirmedVotersTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      confirmedVotersTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن ناخبين مؤكدين"
                  />
                  <Dynamic
                    component={FilterConfirmedVoters(confirmedVotersTable)}
                  />
                  <Show when={confirmedVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearConfirmedVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Show when={hasPermission(user, 'view:addConfirmedVoter')}>
                  <Dynamic component={AddConfirmedVoter} />
                </Show>
              </CardContent>
              <CardContent>
                <DynamicTable table={confirmedVotersTable} />
                <DataTablePagination
                  className="mt-12"
                  table={confirmedVotersTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Card className="p-4">
              <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
                  <Input
                    value={
                      (possibleVotersTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      possibleVotersTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن ناخبين محتملين"
                  />
                  <Dynamic
                    component={FilterPossibleVoters(possibleVotersTable)}
                  />
                  <Show when={possibleVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearPossibleVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Show when={hasPermission(user, 'view:addPossibleVoter')}>
                  <Dynamic component={AddPossibleVoter} />
                </Show>
              </CardContent>
              <CardContent>
                <DynamicTable table={possibleVotersTable} />
                <DataTablePagination
                  className="mt-12"
                  table={possibleVotersTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default PartiesRepresentersPage;
