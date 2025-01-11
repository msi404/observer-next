import { type Permission } from '@/app/_auth/auth-rbac'

import
	{
	House,
	Archive,
	ShieldCheck,
	Pencil,
	TrendingUpDown,
	Eye,
	SquareUserRound,
	UsersRound,
	HeartHandshake,
	Bell,
	LifeBuoy,
} from "lucide-react";

type SidebarItem = {
	persmission: Permission;
	title: string;
	url: string;
	icon: React.ElementType;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
	{
		persmission: "view:home",
		title: "common:sidebar.home",
		url: "/",
		icon: House
	},
	{
		persmission: "view:polling-management",
		title: "common:sidebar.pollingManagement",
		url: "/polling-management",
		icon: Archive,
	},
	{
		persmission: "view:state-mangement",
		title: "common:sidebar.stateManagment",
		url: "/state-mangers",
		icon: ShieldCheck,
	},
	{
		persmission: "view:election-results",
		title: "common:sidebar.electionResults",
		url: "/election-results",
		icon: TrendingUpDown,
	},
	{
		persmission: "view:data-entries",
		title: "common:sidebar.dataEntries",
		url: "/data-entries",
		icon: Pencil,
	},
	{
		persmission: "view:observers",
		title: "common:sidebar.observers",
		url: "/observers",
		icon: Eye,
	},
	{
		persmission: "view:candidates",
		title: "common:sidebar.candidates",
		url: "/candidates",
		icon: SquareUserRound,
	},
	{
		persmission: "view:user-mangement",
		title: "common:sidebar.userManagement",
		url: "/",
		icon: UsersRound,
	},
	{
		persmission: "view:election-base",
		title: "common:sidebar.electionBase",
		url: "/election-base",
		icon: HeartHandshake,
	},
	{
		persmission: "view:notifications",
		title: "common:sidebar.notifications",
		url: "/",
		icon: Bell,
	},
	{
		persmission: "view:issues",
		title: "common:sidebar.issues",
		url: "/",
		icon: LifeBuoy,
	},
];