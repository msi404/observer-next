'use client';
import { type FC, type ComponentPropsWithoutRef } from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {cn} from '@/app/_lib/utils'
import { Button } from '@/app/_components/ui/button'
import
	{
		Form,
		FormControl,
		FormField,
		FormItem,
		FormLabel,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { loginSchema } from '@/app/schema/login'

export const LoginForm:FC<ComponentPropsWithoutRef<'div'>> = ({className, ...props}) =>
{
	const form = useForm<z.infer<typeof loginSchema>>( {
		resolver: zodResolver( loginSchema ),
		defaultValues: {
			UserNameOrPhoneNumber: "",
			password: ""
		}
	} )
	
	const onSubmit = (values: z.infer<typeof loginSchema>) =>
	{

		console.log(values);
	}

	return (
		<div className={ cn( 'flex flex-col gap-6', className ) } { ...props }>
			<Form {...form}>
				<form onSubmit={ form.handleSubmit( onSubmit )} className='space-y-8'>
				<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>تسجيل الدخول</h1>
				<p className='text-balance text-sm text-muted-foreground'>ادخل اسم المستخدم لتسجيل الدخول</p>
			</div>
				<div className='grid gap-6'>
					<FormField
					control={ form.control }
					name='UserNameOrPhoneNumber'
					render={ ( { field } ) => (
						<FormItem>
							<FormLabel>اسم المستخدم</FormLabel>
							<FormControl>
								<Input placeholder='اسم المستخدم' {...field} />
							</FormControl>
						</FormItem>
					) } />
					<FormField
					control={ form.control }
					name='password'
					render={ ( { field } ) => (
						<FormItem>
							<FormLabel>كلمة السر</FormLabel>
							<FormControl>
								<Input type='password' placeholder='******' {...field} />
							</FormControl>
						</FormItem>
					) } />
				</div>
				<Button type='submit' className='w-full'>تقديم</Button>
			</form>
		</Form>
		</div>
	)
}
