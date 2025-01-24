'use client';
import {motion} from 'motion/react'
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from '@/app/_components/ui/sidebar';
import { CloudAlert, RefreshCcw } from 'lucide-react'
import {cn} from '@/app/_lib/utils'


export const ErrorUser = ({
  retry
}: {
  retry: () => void
  } ) =>
{
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem className='flex flex-col justify-center text-center gap-3'>
        <div className='justify-between items-center hidden lg:flex'>
          <CloudAlert className={open ? 'block' : 'hidden'} color='red' size='25px'/>
          <motion.button
						onClick={retry}
				  whileHover={{
					 scale: 1.1,
					 transition: {
						damping: 0,
						ease: 'linear',
						duration: 0.2
					 }
				  }}
				  className={cn("bg-slate-200 p-1 cursor-pointer border rounded-full text-gray-500 hover:text-primary", open ? 'mx-4': 'mx-0')}
					>
						<RefreshCcw />
				</motion.button>
       </div>
        <span className={cn('text-sm', open ? 'block' : 'hidden')}>خطأ في تحميل الملف الشخصي</span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
