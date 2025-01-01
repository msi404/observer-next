'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import
	{
		House,
		Archive,
		UserRoundCog,
		Pencil,
		TrendingUpDown,
		Eye,
		SquareUserRound,
		UsersRound,
		HeartHandshake,
		Bell,
		LifeBuoy,
		User
	} from 'lucide-react'

import
	{
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/app/_components/ui/sidebar"
 
// Menu items.

type SidebarItem = {
	title: string
	url: string
	icon: React.ElementType
}

const items: SidebarItem[] = [
	{
		title: "الصفحة الرئيسية",
		url: "/",
		icon: House,
	},
	{
		title: "ادارة الاقتراع",
		url: "/polling-management",
		icon: Archive,
	},
	{
		title: "مدراء المحافظات",
		url: "/state-mangers",
		icon: UserRoundCog,
	},
	{
		title: "النتائج الانتخابية",
		url: "/election-results",
		icon: TrendingUpDown,
	},
	{
		title: "مدخلين البيانات",
		url: "/data-entries",
		icon: Pencil,
	},
	{
		title: "المراقبين",
		url: "/observers",
		icon: Eye,
	},
	{
		title: "المرشحين",
		url: "/logout",
		icon: SquareUserRound,
	},
	{
		title: "ادارة المستخدمين",
		url: "/logout",
		icon: UsersRound,
	},
	{
		title: "القاعدة الانتخابية",
		url: "/election-base",
		icon: HeartHandshake,
	},
	{
		title: "الاشعارات",
		url: "/logout",
		icon: Bell,
	},
	{
		title: "ادارة الشكاوى",
		url: "/logout",
		icon: LifeBuoy,
	},
]
 
export const AppSidebar = () =>
{
	const pathname = usePathname()
	
	return (
	  <Sidebar collapsible='icon' side='right'>
		 <SidebarHeader />
		 <SidebarContent>
			<SidebarGroup>
					<SidebarGroupLabel>Main</SidebarGroupLabel>
					<SidebarContent>
						<SidebarMenu>
							{ items.map( ( item, index ) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuButton asChild>
										<Link className={`${pathname === item.url ? 'bg-slate-400/20' : ''} hover:bg-slate-200/20`} href={ item.url }>
											<item.icon color='blue' />
											<span>{ item.title }</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarContent>
			</SidebarGroup>
		 </SidebarContent>
			<SidebarFooter>
					<User/>
		 </SidebarFooter>
	  </Sidebar>
	)
 }
 