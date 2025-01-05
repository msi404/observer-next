"use client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useToast } from "@/app/_hooks/use-toast";
import { i18nConfig } from "@/app/_config/i18nConfig";
import { Label } from "@/app/_components/ui/label";
import { Switch } from "@/app/_components/ui/switch";

export const LanguageSwitcher: FC = () => {
	const { toast } = useToast();
	const [isLanguage, setIsLanguage] = useState<boolean>(false);
	const { i18n } = useTranslation();
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = () => {
		let newLocale;
		if (isLanguage) {
			setIsLanguage(true);
			newLocale = "ar";
			setTimeout( () =>
			{
				toast({ title: "لقد قمت بتغيير اللغة الى العربية." });
			}, 400)
		} else {
			setIsLanguage(false);
			newLocale = "en";
			setTimeout( () =>
			{
				toast({ title: "You have changed the language to English." });
			}, 400)
		}
		// set cookie for next-i18n-router
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = date.toUTCString();
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

		// redirect to the new locale path
		if (currentLocale === i18nConfig.defaultLocale) {
			router.push("/" + newLocale + currentPathname);
		} else {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
			);
		}

		router.refresh();
	};
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		currentLocale === "ar" ? setIsLanguage(false) : setIsLanguage(true);
	}, [currentLocale]);
	return (
		<div className="w-1/2 flex items-center gap-2">
			<Label htmlFor="language" className="cursor-pointer">
			 EN
			</Label>
			<Switch
				id="language"
				onChange={handleChange}
				onClick={handleChange}
				checked={isLanguage}
			/>
		</div>
	);
};