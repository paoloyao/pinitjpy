import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import defaultImg from '../utils/defaultImg';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  if(!user) return null;
  return (
    <div className='flex gap-2 md:gap-5 w-fulll mt-5 pb-7 bg-sky-50'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-2 border-gray-200 focus-within:border-gray-400  outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input 
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Serach'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className='flex gap-3'>
        <Link 
          to={`user-profile/${user?._id}`}
          className='hidden md:block'        
        >
          <img src={user.image} alt='user' className='w-16 h-12 rounded-lg' onError={defaultImg} />
        </Link>
        <Link 
          to={`create-pin`}
          className='bg-gray-700 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'      
        >
          <IoMdAdd/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar