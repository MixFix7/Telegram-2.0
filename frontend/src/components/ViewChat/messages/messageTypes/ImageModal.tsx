import React, {FC, useState, useEffect} from 'react'

interface IImageModal {
  imgUrl: string
  closeModal: () => void
}


const ImageModal: FC<IImageModal> = ({imgUrl, closeModal}) => {


  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className='modal-background justify-center' onClick={handleBackgroundClick}>
      <div className='model-content flex justify-center items-center' onClick={handleBackgroundClick}>
          <img 
            src={imgUrl} 
            alt="img" 
            className={`w-9/12`}
          />
      </div>
    </div>
  )
}

export default ImageModal
