'use client';
import { motion } from 'motion/react';

import { Container } from '@/app/_components/container';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/_components/ui/tabs';

import { ConfirmedVotersWidget } from '@/app/_widgets/confirmed-voters-widget'
import { PossibleVotersWidget } from '@/app/_widgets/possible-voters-widget'
import {type NextPage } from 'next';

const VotersPage: NextPage = () =>
{
  
  return (
    <Container>
      <Tabs defaultValue="political-entities">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger className="w-full" value="political-entities">
          الناخبين المؤكدين
          </TabsTrigger>
          <TabsTrigger value="electoral-distribution">
          الناخبين المحتملين
          </TabsTrigger>
        </TabsList>
        <TabsContent value="political-entities">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <ConfirmedVotersWidget /> 
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <PossibleVotersWidget />
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default VotersPage;