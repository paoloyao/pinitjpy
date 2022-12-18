import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import logo from '../assets/logo.png';
import { categories } from '../utils/data';

function Sidebar({ user, closeToggle }) {
  const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black trnasition-all duration-200 ease-in-out capitalize';
  const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black trnasition-all duration-200 ease-in-out capitalize';
  const handleCloseSidebar = () => {
    if(closeToggle === undefined) return null;
    closeToggle(false);
  };
  return (
    <div className='flex flex-col justify-between bg-gray-800 h-full overflow-y-scroll min-w-210 hide-scrollbar pb-6'>
      <div className='flex flex-col '>
        <Link
          to='/'
          className='flex p-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={ ({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill color='#fff' />
            <span className='text-gray-300'>Home</span>
          </NavLink>
          <h3 className='mt-1 px-5 text-lg 2xl:text-xl text-gray-300'>Categories</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`category/${category.name}`}
              className={ ({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img 
                className='w-8 h-8 rounded-full border-gray-600 border-4'
                src={category.image}
                alt='category pic'
              />
              <span className='text-gray-300'>{category.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {/* { user 
        ? (
          <Link
            to={`user-profile/${user._id}`}
            className='flex my-5 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg mx-3'
            onClick={handleCloseSidebar}
          >
            <img src={user.image} className='w-10 rounded-full' alt='user profile' onError={defaultImg} />
            <p>{user.userName}</p>
          </Link>
        )
        : null 
      } */}
    </div>
  )
}

export default Sidebar