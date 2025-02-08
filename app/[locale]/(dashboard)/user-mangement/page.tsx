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
import {ProvinceAdminsWidget} from '@/app/_widgets/province-admins-widget'
import { CandidatesWidget } from '@/app/_widgets/candidates-widget'
import { DataEntriesWidget } from '@/app/_widgets/data-entries-widget'
import { ObserversWidget } from '@/app/_widgets/observers-widget'
import { PartiesRepresentersWidget } from '@/app/_widgets/parties-representers-widget'
const UserMangementPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Tabs defaultValue="province-admins">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger className="w-full" value="province-admins">
             مدراء المحافظات
          </TabsTrigger>
          <TabsTrigger value="parties-representers">
            ممثلين الكيان
          </TabsTrigger>
          <TabsTrigger value="candidates">
            المرشحين
          </TabsTrigger>
          <TabsTrigger value="data-entries">
            مدخلين البيانات
          </TabsTrigger>
          <TabsTrigger value="observers">
            المراقبين
          </TabsTrigger>
        </TabsList>
        <TabsContent value="province-admins">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <ProvinceAdminsWidget />
          </motion.div>
        </TabsContent>
        <TabsContent value="parties-representers">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <PartiesRepresentersWidget />
          </motion.div>
        </TabsContent>
        <TabsContent value="candidates">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <CandidatesWidget />
          </motion.div>
        </TabsContent>
        <TabsContent value="data-entries">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <DataEntriesWidget />
          </motion.div>
        </TabsContent>
        <TabsContent value="observers">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <ObserversWidget />
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default UserMangementPage;
