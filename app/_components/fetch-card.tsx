import { type FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/app/_components/ui/card';
import { RefreshCcw } from 'lucide-react';
import {cn} from '@/app/_lib/utils'

export const FetchCard: FC<{className?: string}> = ({className='h-[1000px]'}) => {
  return (
    <Card className={cn(className,"flex items-center")}>
      <motion.div
        animate={{
          rotate: -360,
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
    </Card>
  );
};
