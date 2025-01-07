"use client";
import {useSelector} from 'react-redux'
import { useElectoralEntityAdminProfileQuery } from "@/app/_services/fetchApi";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {selectUser} from '@/app/_lib/features/auth/authSlice'
import { hasPermission } from '@/app/_auth/auth-rbac'
import { type Permission } from '@/app/_auth/auth-rbac'

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
	SidebarRail
} from "@/app/_components/ui/sidebar";

import { NavUser } from "@/app/_components/nav-user";
// Menu items.

type SidebarItem = {
	persmission: Permission;
	title: string;
	url: string;
	icon: React.ElementType;
};

const items: SidebarItem[] = [
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

export const AppSidebar = () => {
	// const { data, isLoading } = useProfileQuery("");
	const user = useSelector(selectUser)
	const { data, isLoading } = useElectoralEntityAdminProfileQuery("");
	const pathname = usePathname();
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;
	return (
		<Sidebar
			collapsible='icon'
			side={currentLanguage === "ar" ? "right" : "left"}
		>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main</SidebarGroupLabel>
					<SidebarContent>
						<SidebarMenu>
							{items.map((item, index) => (
								hasPermission( user, item.persmission ) && (
									<SidebarMenuItem key={index}>
									<SidebarMenuButton size='lg' asChild>
										<Link
											className={`${
												pathname === item.url
													? "bg-slate-400/20"
													: ""
											} hover:bg-slate-200/20`}
											href={item.url}
										>
												<item.icon className='mx-2' size={50} />
											<span>{t(item.title)}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
								)
							))}
						</SidebarMenu>
					</SidebarContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser isLoading={isLoading} user={data?.result} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
