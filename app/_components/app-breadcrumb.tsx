'use client'

import {usePathname} from 'next/navigation'

import
	{
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbList,
		BreadcrumbPage,
		BreadcrumbSeparator
} from '@/app/_components/ui/breadcrumb'

export const AppBreadcrumb = () =>
{
	const pathname = usePathname()
	const routeName = pathname.split('/')
	return (
		<Breadcrumb>
		<BreadcrumbList>
		  {/* <BreadcrumbItem className="hidden md:block">
			 <BreadcrumbLink href="#">
			 Building Your Application
			 </BreadcrumbLink>
		  </BreadcrumbItem> */}
		  <BreadcrumbSeparator className="hidden md:block" />
		  <BreadcrumbItem>
			 <BreadcrumbPage>{pathname === '/' ? 'Home' : routeName }</BreadcrumbPage>
			 </BreadcrumbItem>
		</BreadcrumbList>
	 </Breadcrumb>
	)
}