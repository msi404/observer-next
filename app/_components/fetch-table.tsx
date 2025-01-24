import { type FC } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/app/_components/container';
import {
  Card,
  CardContent,
} from '@/app/_components/ui/card';
import {RefreshCcw } from 'lucide-react';

export const FetchTable: FC = () => {
  return (
    <Container>
      <Card className="p-4 h-96">
        <CardContent className="text-primary h-96 flex justify-center items-center">
		  <motion.div
        animate={{
          rotate: 360,
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            damping: 0,
            ease: 'linear',
            duration: 1
          }
        }}
        className="flex justify-center items-center h-full w-full text-gray-400"
      >
        <RefreshCcw size="40px" className="my-auto" />
      </motion.div>
        </CardContent>
      </Card>
    </Container>
  );
};
