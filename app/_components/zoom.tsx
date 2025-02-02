'use client';
import Image from 'next/image'
import { type FC } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Placeholder from '@/app/_assets/images/placeholder.png'

export const Zoom: FC<{ preview: string }> = ({ preview }) => {
  return (
    <PhotoProvider maskOpacity={0.9} bannerVisible={false} photoClosable>
      <PhotoView src={preview}>
        <Image
          placeholder="blur"
          blurDataURL={Placeholder.blurDataURL}
          width={48}
          height={48}
          src={preview}
          alt="صورة البطاقة"
          className="w-12 h-12 cursor-pointer z-10 rounded-lg"
        />
      </PhotoView>
    </PhotoProvider>
  );
};
