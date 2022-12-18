import React from 'react';
import { Circles } from 'react-loader-spinner';
const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Circles  
        color='#de5555'
        width={200}
        height={50}
        className='m-5'
      />
      <p className='text-lg text-center py-2'>{ message }</p>
    </div>
  )
}

export default Spinner