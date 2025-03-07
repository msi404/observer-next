'use client';
import { type FC, type ReactElement } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/app/_components/ui/card';
import { Dynamic } from '@/app/_components/utils/dynamic';

export const ItemCard: FC<{
  Content: ReactElement;
  Header: ReactElement;
  Footer: ReactElement;
}> = ({ Content, Header, Footer }) => {
  return (
    <Card>
      <CardHeader className="flex justify-center items-center">
        <Dynamic component={Header} />
      </CardHeader>
      <CardContent>
        <Dynamic component={Content} />
      </CardContent>
      <CardFooter>
        <Dynamic component={Footer} />
      </CardFooter>
    </Card>
  );
};
