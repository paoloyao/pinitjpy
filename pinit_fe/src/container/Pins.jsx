import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, Search, PinDetails, CreatePin } from '../components';

function Pins({ user }) {
  const [searchTerm, setsearchTerm] = useState('');
  const setSearchTermHandler = (data) => setsearchTerm(data);
  return (
    <div className='px-2 md:px-5 bg-sky-50'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTermHandler} user={user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route path='/pin-detail/:pinId' element={<PinDetails user={user} />} />
          <Route path='/create-pin' element={<CreatePin user={user} />} />
          <Route path='/search' element={<Search searchTerm={searchTerm} setsearchTerm={setSearchTermHandler}  />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins