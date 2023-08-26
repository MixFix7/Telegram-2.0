import React, {useState} from 'react'
import {FaBars} from 'react-icons/fa'
import Options from './Options'

const OptionsShowButton = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <>
        <div className='flex items-center justify-center mr-5'> 
            <FaBars
                className='text-gray-500 hover:text-gray-200 cursor-pointer'
                size={'20px'}
                onClick={() => setShowOptions(!showOptions)}
            />
        </div>  

        {showOptions && 

        <Options
            hideOptions={() => setShowOptions(false)}
          />

        }
    </>
  )
}

export default OptionsShowButton
