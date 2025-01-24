'use client';
import {motion} from 'motion/react'
import {
  SidebarMenu,
  SidebarMenuItem,
} from '@/app/_components/ui/sidebar';
import {RefreshCcw} from 'lucide-react'


export const FetchUser = () =>
{
  return (
    <SidebarMenu>
		  <SidebarMenuItem className='flex flex-col gap-3 p-2 h-16'>
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
        <RefreshCcw size="25px" className="my-auto" />
      </motion.div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
