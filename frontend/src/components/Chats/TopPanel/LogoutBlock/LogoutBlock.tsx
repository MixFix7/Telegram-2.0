import React, { useContext } from 'react';
import { BiSolidExit } from 'react-icons/bi';
import { AuthContext } from '../../../Authorization/AuthContext';
import { AuthContextType } from '../../../Authorization/types';
import { useNavigate } from 'react-router-dom';

const LogoutBlock = () => {
  const {logoutUser} = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  const logoutOnClick = () => {
    logoutUser()
    navigate('auth/log-in/')
  }

  return (
    <div
      className='overflow-hidden mb-2'
    >
      <div
        className='
            flex justify-start items-center px-8 py-3 w-full 
            border-y-2 border-black
            hover:bg-gray-700 cursor-pointer logout-block
        '
        onClick={logoutOnClick}
      >
        <div
          className='
              flex items-center justify-center 
              p-1 bg-sky-500 rounded-full mr-2 
              hover:bg-sky-600
          '
        >
          <BiSolidExit size={'15px'} />
        </div>

        <span className='text-xl font-medium'>Log out</span>
      </div>
    </div>
  );
};

export { LogoutBlock };


