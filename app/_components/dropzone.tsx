'use client'
import Image from 'next/image'
import { type FC ,useMemo, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FieldError } from 'react-hook-form';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const Dropzone: FC<{ label: string; setFile: (file: File) => void, error?: FieldError }> = ( { label, setFile, error } ) =>
{
 const [files, setFiles] = useState<{preview: ''}[]>([])
	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
    isDragReject,
  } = useDropzone( {
    accept: { 'image/*': [] }, maxFiles: 1, onDrop: acceptedFiles =>
    {
      // @ts-ignore
      setFiles( acceptedFiles.map( ( file => Object.assign( file, {
        preview: URL.createObjectURL( file )
      } ) ) ) )
      setFile(acceptedFiles[0])
  }});

  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...( isDragReject ? rejectStyle : {} ),
    ...( error ? { borderColor: '#ff1744' } : {} )
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ] );
  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {!files.length && <p>{ label }</p>}
        {files.length > 0 && <Image src={files[0].preview} width={350} height={350} alt='Photo'/>}
      </div>
    </div>
  );
}
