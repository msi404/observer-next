"use client";
import { type ReactNode, type FC } from "react"
import {dir} from "i18next"
import { TranslationsProvider } from "@/app/_providers/translations-provider"
import { DirectionProvider } from "@radix-ui/react-direction"
import { Provider } from 'react-redux'
import {store} from '@/app/_lib/store'

type ProvidersType = {
	children: ReactNode;
	locale: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	namespaces: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	resources: any;
};

export const Providers: FC<ProvidersType> = ({
	children,
	locale,
	namespaces,
	resources,
}) => {
	return (
		<Provider store={store}>
			<TranslationsProvider
			locale={locale}
			namespaces={namespaces}
			resources={resources}
		>
			<DirectionProvider dir={ dir( locale ) }>
					{ children }
			</DirectionProvider>
		</TranslationsProvider>
		</Provider>
	);
};
