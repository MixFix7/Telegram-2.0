import React, {FC} from 'react'
import File from './UI/FileComponent'

interface ISelectedFiles {
    uploadedFiles: FileList | null
    deleteUploadedFile: (fileName: string) => void
}

const UploadedFiles: FC<ISelectedFiles> = ({uploadedFiles, deleteUploadedFile}) => {
  return (
      <div className='flex w-full mt-5 items-center justify-start overflow-x-auto'>
          {Array.from(uploadedFiles!).map((file, index) => (
                <File key={index} uploadedFile={file} deleteUploadedFile={deleteUploadedFile}/>
          ))}
      </div>
  )
}

export default UploadedFiles
