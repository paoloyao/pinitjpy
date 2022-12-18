import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'
import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
import defaultImg from '../utils/defaultImg';

function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();
  useEffect(() => {
    let mounted = true;
    const query = userQuery(userInfo?.sub);
    client.fetch(query)
    .then((data) => {
      if(mounted) setUser(data[0]);
    });
    return () => {
      mounted = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0);
  }, [])
  
  

  return (
    <div className='flex bg-sky-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user ? user : undefined} closeToggle={setToggleSidebar} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='bg-gray-200 p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to={`user-profile/${user?.id}`}>
            <img src={user?.image} alt='user nav pic' className='w-14' onError={defaultImg}  />
          </Link>
        </div>
        {
          toggleSidebar ? (
            <div className='fixed md:w-1/3 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle fontSize={30} className='cursor-pointer text-white' onClick={() => setToggleSidebar(false)} />
              </div>
              <Sidebar user={user ? user : undefined} closeToggle={setToggleSidebar} />
            </div>
          )
          : null
        }
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user ? user : null} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home