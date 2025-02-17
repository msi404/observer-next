'use client';
import { type FC, type ReactElement } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/app/_components/ui/card';

export const Post: FC<{
  Header: ReactElement;
  Footer: ReactElement;
  Content: ReactElement;
}> = ({ Header, Content, Footer }) => {
  return (
    <Card>
      <CardHeader>{Header}</CardHeader>
      <CardContent>{Content}</CardContent>
      <CardFooter>{Footer}</CardFooter>
    </Card>
  );
};
