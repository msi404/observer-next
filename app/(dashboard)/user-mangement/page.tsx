'use client';
import {useSelector} from 'react-redux'
import {selectUser} from '@/app/_lib/features/authSlice'
import { type NextPage } from 'next';
import { motion } from 'motion/react';
import { hasPermission } from '@/app/_auth/auth-rbac'
import {Show} from '@/app/_components/utils/show'
import { Container } from '@/app/_components/containers/container';
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
const UserMangementPage: NextPage = () =>
{
  const user = useSelector(selectUser)
 const defaultValue = hasPermission(user, "view:default-tab-gov") ? "data-entries" : hasPermission(user, "view:default-tab-province") ? "province-admins": ""
  return (
    <Container>
      <Tabs defaultValue={defaultValue}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <Show when={hasPermission(user, 'view:province-admins-tab')}>
          <TabsTrigger className="w-full" value="province-admins">
             مدراء المحافظات
          </TabsTrigger>
        </Show>
          <Show when={hasPermission(user, 'view:parties-representers-tab')}>
          <TabsTrigger value="parties-representers">
            ممثلين الكيان
          </TabsTrigger>
          </Show>
          <Show when={hasPermission(user, 'view:candidate-tab')}>
          <TabsTrigger value="candidates">
            المرشحين
          </TabsTrigger>
         </Show>
          <Show when={hasPermission(user, 'view:data-entries-tab')}>
          <TabsTrigger value="data-entries">
            مدخلين البيانات
          </TabsTrigger>
          </Show>
          <Show when={hasPermission(user, 'view:observers-tab')}>
          <TabsTrigger value="observers">
            المراقبين
          </TabsTrigger>
          </Show>
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
