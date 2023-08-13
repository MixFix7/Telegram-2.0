import React, { FC } from 'react'
import { IImageUIProps } from '../../types/typeGlobalUIComponents'
import { SERVER_URL } from '../Routing/Routing'

const Image: FC<IImageUIProps> = ({className, img, alt}) => {
  return (
    <img 
      className={className}
      src={SERVER_URL + '/media/' + img} 
      alt={alt}
    />
  )
}

export default Image
