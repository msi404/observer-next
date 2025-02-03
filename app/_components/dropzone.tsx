'use client';
import Image from 'next/image';
import { FC, useMemo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
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

const focusedStyle = { borderColor: '#2196f3' };
const acceptStyle = { borderColor: '#00e676' };
const rejectStyle = { borderColor: '#ff1744' };

type DropzoneProps = {
  label: string;
  setFile: (file: File | null) => void;
  error?: FieldError;
  defaultImage?: string; // ✅ Add defaultImage prop
};

export const Dropzone: FC<DropzoneProps> = ({ label, setFile, error, defaultImage }) => {
  const [files, setFiles] = useState<{ preview: string }[]>([]);

  // ✅ Set the default image on mount
  useEffect(() => {
    if (defaultImage) {
      setFiles([{ preview: defaultImage }]);
    }
  }, [defaultImage]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setFiles(updatedFiles);
      setFile(acceptedFiles[0]); // ✅ Set the file for form submission
    }
  });

  const style: React.CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(error ? { borderColor: '#ff1744' } : {})
    }),
    [isFocused, isDragAccept, isDragReject, error]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {!files.length && <p>{label}</p>}
        {files.length > 0 && (
          <Image src={files[0].preview} width={350} height={350} alt="Preview" />
        )}
      </div>
    </div>
  );
};
