'use client';
import Image from 'next/image'
import { type FC } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Placeholder from '@/app/_assets/images/placeholder.png'
import {cn} from '@/app/_lib/utils'

export const Zoom: FC<{ preview: string, className?: string }> = ({ preview, className }) => {
  return (
    <PhotoProvider maskOpacity={0.9} bannerVisible={false} photoClosable>
      <PhotoView src={preview}>
        <Image
          placeholder="blur"
          blurDataURL={Placeholder.blurDataURL}
          width={50}
          height={48}
          src={preview}
          alt="صورة البطاقة"
          className={cn(className, "h-12 cursor-pointer object-cover z-10")}
        />
      </PhotoView>
    </PhotoProvider>
  );
};
