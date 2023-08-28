import React, { FC } from 'react';
import { AiOutlineFile } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

interface IFile {
  uploadedFile: File;
  deleteUploadedFile: (fileName: string) => void;
}

const FileComponent: FC<IFile> = ({ uploadedFile, deleteUploadedFile }) => {
  const supportedImageTypes = /^image\//;
  const supportedVideoTypes = /^video\//;
  
  const isImage = supportedImageTypes.test(uploadedFile.type);
  const isVideo = supportedVideoTypes.test(uploadedFile.type);

  return (
    <div
      className='relative mx-2'
      style={{ width: '320px', height: '176px'}}
    >
      {isImage 
        ? <img 
            className='w-full h-full rounded-lg' 
            src={URL.createObjectURL(uploadedFile)} 
            alt={uploadedFile.name}
          /> 
        : isVideo 
          ? (
              <video className='w-full h-full rounded-lg' controls>
                <source 
                  src={URL.createObjectURL(uploadedFile)} 
                  type={uploadedFile.type}
                />
              </video>
          ) 
          : (
            <div className='flex items-center rounded-lg justify-center bg-sky-600 p-14'>
              <AiOutlineFile size={'50px'}/>
              <span className='text-xl'>
                {uploadedFile.name.length > 20 
                  ? uploadedFile.name.substring(0, 20) + '...' 
                  : uploadedFile.name}
              </span>
            </div>
          )
      }
      <div className='absolute top-0 right-0 p-0.5 m-1 rounded-lg hover:bg-sky-500 text-white bg-sky-400'>
        <RxCross2 
          className='cursor-pointer'
          size={'30px'} 
          onClick={() => deleteUploadedFile(uploadedFile.name)}
        />
      </div>
    </div>
  );
}

export default FileComponent;
