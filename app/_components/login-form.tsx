"use client";
import { type FC, type ComponentPropsWithoutRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "@/app/_services/authApi";
import { useToast } from "@/app/_hooks/use-toast";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { loginSchema } from "@/app/_validation/login";
import { Spinner } from "@/app/_components/spinner";

export const LoginForm: FC<ComponentPropsWithoutRef<"div">> = ({
	className,
	...props
}) => {
	const [login, { isLoading, isError }] = useLoginMutation();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			usernameOrPhone: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		try {
			const response = await login( values ).unwrap();
			if (response) return window.location.replace("/");
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch ( error: any )
		{
			toast({
				title: "Error",
				description: error.data,
				variant: "destructive",
			});
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-2xl font-bold">تسجيل الدخول</h1>
						<p className="text-balance text-sm text-muted-foreground">
							ادخل اسم المستخدم لتسجيل الدخول
						</p>
					</div>
					<div className="grid gap-6">
						<FormField
							control={form.control}
							name="usernameOrPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>اسم المستخدم</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="اسم المستخدم"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>كلمة السر</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											type="password"
											placeholder="******"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={isLoading}
						type="submit"
						className="w-full flex justify-center items-center"
					>
						تسجيل الدخول
						{isLoading && <div className=" scale-125">
								<Spinner />
						</div> }
					</Button>
				</form>
			</Form>
		</div>
	);
};
