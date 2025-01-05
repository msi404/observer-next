"use client";

import { usePathname } from "next/navigation";
import {useTranslation} from 'react-i18next'
import Link from "next/link";

import {
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

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/app/_components/ui/sidebar";

import { NavUser } from '@/app/_components/nav-user'
// import {TransitionLink} from '@/app/_components/transition-link'

// Menu items.

type SidebarItem = {
	title: string;
	url: string;
	icon: React.ElementType;
};

const items: SidebarItem[] = [
	{
		title: "common:sidebar.home",
		url: "/",
		icon: House,
	},
	{
		title: "common:sidebar.pollingManagement",
		url: "/polling-management",
		icon: Archive,
	},
	{
		title: "common:sidebar.stateManagment",
		url: "/state-mangers",
		icon: ShieldCheck,
	},
	{
		title: "common:sidebar.electionResults",
		url: "/election-results",
		icon: TrendingUpDown,
	},
	{
		title: "common:sidebar.dataEntries",
		url: "/data-entries",
		icon: Pencil,
	},
	{
		title: "common:sidebar.observers",
		url: "/observers",
		icon: Eye,
	},
	{
		title: "common:sidebar.candidates",
		url: "/candidates",
		icon: SquareUserRound,
	},
	{
		title: "common:sidebar.userManagement",
		url: "/logout",
		icon: UsersRound,
	},
	{
		title: "common:sidebar.electionBase",
		url: "/election-base",
		icon: HeartHandshake,
	},
	{
		title: "common:sidebar.notifications",
		url: "/logout",
		icon: Bell,
	},
	{
		title: "common:sidebar.issues",
		url: "/logout",
		icon: LifeBuoy,
	},
];

export const AppSidebar = () => {
	const pathname = usePathname();
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const user = {
		name: 'ممثل كيان جديد',
		email: '07827131748',
		avatar: 'test'
	}
	return (
		<Sidebar collapsible="icon" side={currentLanguage === "ar" ? "right" : "left"}>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main</SidebarGroupLabel>
					<SidebarContent>
						<SidebarMenu>
							{items.map((item, index) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuButton asChild>
										<Link
											className={`${
												pathname === item.url
													? "bg-slate-400/20"
													: ""
											} hover:bg-slate-200/20`}
											href={item.url}
										>
											<item.icon color="blue" />
											<span>{t(item.title)}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
};
