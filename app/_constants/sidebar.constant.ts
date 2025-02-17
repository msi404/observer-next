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
  HandHeart,
  ChartBarBig,
  Bell,
  Inbox,
  Landmark,
  Codesandbox,
  Component
} from 'lucide-react';

type SidebarItem = {
  persmission: Permission;
  title: string;
  url: string;
  icon: React.ElementType;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    persmission: 'view:home',
    title: 'common:sidebar.home',
    url: '/',
    icon: Landmark
	},
  {
    persmission: 'view:electoralEntities',
    title: 'common:sidebar.electoralEntities',
    url: '/electoral-entities',
    icon: Component
  },
  {
    persmission: 'view:parties-representers',
    title: 'ممثلين الكيان',
    url: '/parties-representers',
    icon: Codesandbox
  },
  {
    persmission: 'view:polling-management',
    title: 'common:sidebar.pollingManagement',
    url: '/polling-management',
    icon: Archive
  },
  {
    persmission: 'view:data-entries',
    title: 'common:sidebar.dataEntries',
    url: '/data-entries',
    icon: Feather
  },
  {
    persmission: 'view:observers',
    title: 'common:sidebar.observers',
    url: '/observers',
    icon: Eye
  },
  {
    persmission: 'view:profile',
    title: 'common:sidebar.profile',
    url: '/profile',
    icon: CircleUserRound
  },
  {
    persmission: 'view:candidates',
    title: 'common:sidebar.candidates',
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
    title: 'common:sidebar.userManagement',
    url: '/user-mangement',
    icon: UsersRound
  },
  {
    persmission: 'view:election-base',
    title: 'common:sidebar.electionBase',
    url: '/election-base',
    icon: HandHeart
  },
  {
    persmission: 'view:election-results',
    title: 'common:sidebar.electionResults',
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
    title: 'common:sidebar.notifications',
    url: '/notifications',
    icon: Bell
  },
  {
    persmission: 'view:issues',
    title: 'common:sidebar.issues',
    url: '/issues',
    icon: Inbox
  }
];
