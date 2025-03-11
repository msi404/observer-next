'use client';
import { type FC, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import { Switch, Match } from '@/app/_components/utils/switch';
import PlaceholderBackground from '@/app/_assets/images/placeholderBackground.jpg';
import { useChangeCurrentUserBackground } from '@/app/_hooks/actions/use-change-current-user-background';
import { BackgroundDropzone } from '@/app/_components/custom/backgroundDropzone';
import { cn } from '@/app/_lib/utils';

export const Background: FC<{ className?: string; background?: string }> = ({
  className,
  background
}) => {
  const user = useSelector( selectUser );
  const { fileRef, onUpload } = useChangeCurrentUserBackground();
  const [preview, setPreview] = useState<string>(user.coverImg!); // Default image
  const handleFileChange = (file: File | null) => {
    if (file) {
      fileRef.current = file;
      setPreview(URL.createObjectURL(file)); // Update preview immediately
      onUpload(); // Upload file
    }
  };
  return (
    <div className={cn(className, 'h-44 w-full')}>
      <Switch>
        <Match when={user.role === 102}>
          <BackgroundDropzone
            label="اضغط لتغيير الخلفية"
            defaultImage={preview}
            setFile={handleFileChange}
          />
        </Match>
        <Match when={user.role !== 102}>
          <Image
            alt="Background"
            width={300}
            height={300}
            objectFit="cover"
            className={cn(className, 'h-44 w-full object-cover')}
            src={background !== null ? background! : PlaceholderBackground.src}
          />
        </Match>
      </Switch>
    </div>
  );
};
