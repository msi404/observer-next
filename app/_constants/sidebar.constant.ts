import { type Permission } from '@/app/_auth/auth-rbac';

import {
  Archive,
  Feather,
  Eye,
  ContactRound,
  TrendingUp,
  UsersRound,
  CalendarFold,
  CircleUserRound,
  HeartHandshake,
  ChartBarBig,
  Bell,
  Inbox,
  Landmark,
  Codesandbox,
  Monitor,
  Component
} from 'lucide-react';

type SidebarItem = {
  persmission: Permission;
  title: string;
  url: string;
  icon: React.ElementType;
  isNotes?: boolean; 
  isFullscreen?: boolean;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    persmission: 'view:home',
    title: 'الرئيسية',
    url: '/',
    icon: Landmark
	},
  {
    persmission: 'view:electoralEntities',
    title: 'الكيانات السياسية',
    url: '/electoral-entities',
    icon: Component
  },
  {
    persmission: 'view:reports',
    title: 'شاشة العرض',
    url: '/fullscreen',
    icon: Monitor,
    isFullscreen: true
  },
  {
    // @ts-ignore
    persmission: 'view:parties-representers',
    title: 'ممثلين الكيان',
    url: '/parties-representers',
    icon: Codesandbox
  },
  {
    persmission: 'view:polling-management',
    title: 'ادارة الاقتراع',
    url: '/polling-management',
    icon: Archive,
  },
  {
    persmission: 'view:data-entries',
    title: 'مدخلين البيانات',
    url: '/data-entries',
    icon: Feather
  },
  {
    persmission: 'view:observers',
    title: 'المراقبين',
    url: '/observers',
    icon: Eye
  },
  {
    persmission: 'view:profile',
    title: 'الملف الشخصي',
    url: '/profile',
    icon: CircleUserRound
  },
  {
    // @ts-ignore
    persmission: 'view:candidates',
    title: 'المرشحين',
    url: '/candidates',
    icon: ContactRound
  },
  {
    persmission: 'view:events',
    title: 'الفعاليات',
    url: '/events',
    icon: CalendarFold
  },
  {
    persmission: 'view:user-mangement',
    title: 'ادارة المستخدمين',
    url: '/user-mangement',
    icon: UsersRound
  },
  {
    persmission: 'view:election-base',
    title: 'القاعدة الانتخابية',
    url: '/election-base',
    icon: HeartHandshake
  },
  {
    persmission: 'view:election-results',
    title: 'النتائج الانتخابية',
    url: '/election-results',
    icon: TrendingUp
  },
  {
    persmission: 'view:reports',
    title: 'التقارير',
    url: '/reports',
    icon: ChartBarBig
  },
  {
    persmission: 'view:notifications',
    title: 'الاشعارات',
    url: '/notifications',
    icon: Bell,
    isNotes: true
  },
  {
    persmission: 'view:issues',
    title: 'الشكاوى',
    url: '/issues',
    icon: Inbox
  }
];
