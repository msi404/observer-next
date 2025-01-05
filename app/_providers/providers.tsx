"use client";
import { type ReactNode, type FC } from "react"
import {dir} from "i18next"

import { TranslationsProvider } from "@/app/_providers/translations-provider"
import { DirectionProvider } from "@radix-ui/react-direction"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
const queryClient = new QueryClient()

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
				<QueryClientProvider client={queryClient}>
				{ children }
				</QueryClientProvider>
			</DirectionProvider>
		</TranslationsProvider>
		</Provider>
	);
};
