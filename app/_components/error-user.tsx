'use client';
import {motion} from 'motion/react'
import {
  SidebarMenu,
  SidebarMenuItem,
} from '@/app/_components/ui/sidebar';
import {CloudAlert, RefreshCcw} from 'lucide-react'


export const ErrorUser = ({
  retry
}: {
  retry: () => void
  } ) =>
{
  return (
    <SidebarMenu>
      <SidebarMenuItem className='flex flex-col justify-center text-center gap-3'>
        <div className='flex justify-between items-center'>
          <CloudAlert color='red' size='25px'/>
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
				  className="bg-slate-200 p-1 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
					>
						<RefreshCcw />
				</motion.button>
       </div>
        <span className='text-sm'>خطأ في تحميل الملف الشخصي</span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
