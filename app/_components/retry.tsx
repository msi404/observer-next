'use client';
import { type FC } from 'react'
import {motion} from 'motion/react'
import { RefreshCcw } from 'lucide-react';
export const Retry: FC<{ refetch: VoidFunction; }> = ({refetch}) =>
{
	return (
		<motion.button
                onClick={refetch}
                whileHover={{
                  scale: 1.1,
                  transition: {
                    damping: 0,
                    ease: 'linear',
                    duration: 0.2
                  }
                }}
                className="bg-slate-200 p-4 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
              >
                <RefreshCcw size='35px'/>
              </motion.button>
	)
}