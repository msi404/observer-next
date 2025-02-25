'use client';
import { type ReactNode, type FC } from 'react';
import { DirectionProvider } from '@radix-ui/react-direction';
import { Provider } from 'react-redux';
import { store } from '@/app/_lib/store';

type ProvidersType = {
  children: ReactNode;
};

export const Providers: FC<ProvidersType> = ({
  children,
}) => {
  return (
    <Provider store={store}>
        <DirectionProvider dir='rtl'>{children}</DirectionProvider>
    </Provider>
  );
};
